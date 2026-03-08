
from celery import shared_task
from google import genai
from django.conf import settings
from .models import User

GENAI_CLIENT = (
    genai.Client(api_key=settings.GOOGLE_API_KEY)
    if getattr(settings, 'GOOGLE_API_KEY', None)
    else None
)


def _extract_embedding_vector(result):
    embeddings = getattr(result, 'embeddings', None)
    if embeddings:
        first = embeddings[0]
        values = getattr(first, 'values', None)
        if values:
            return values

    single_embedding = getattr(result, 'embedding', None)
    if single_embedding:
        values = getattr(single_embedding, 'values', None)
        if values:
            return values

    if isinstance(result, dict):
        if isinstance(result.get('embedding'), list):
            return result['embedding']
        dict_embeddings = result.get('embeddings')
        if dict_embeddings and isinstance(dict_embeddings[0], dict):
            return dict_embeddings[0].get('values')

    return None

@shared_task
def update_user_embedding(user_id):
    try:
        if not GENAI_CLIENT:
            return

        user = User.objects.get(id=user_id)

        tags_str = ", ".join(
            [user_tag.tag.name for user_tag in user.user_tags.select_related('tag').all()]
        )

        profile_text = " ".join(
            part
            for part in [
                user.profession or "",
                f"Skills: {tags_str}" if tags_str else "",
                f"Bio: {user.bio}" if user.bio else "",
            ]
            if part
        ).strip()

        if not profile_text:
            return

        result = GENAI_CLIENT.models.embed_content(
            model='text-embedding-004',
            contents=profile_text,
            config={'task_type': 'RETRIEVAL_DOCUMENT'},
        )

        embedding_vector = _extract_embedding_vector(result)
        if not embedding_vector:
            return

        user.profile_embedding = embedding_vector
        user.save(update_fields=['profile_embedding'])
        print(f"Updated vector for user: {user.username}")
        
    except Exception as e:
        print(f"Error embedding profile: {e}")