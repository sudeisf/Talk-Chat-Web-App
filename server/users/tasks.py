
from celery import shared_task
import google.generativeai as genai
from django.conf import settings
from .models import User

genai.configure(api_key=settings.GOOGLE_API_KEY)

@shared_task
def update_user_embedding(user_id):
    try:
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

        # Generate 768-dim vector using Gemini
        result = genai.embed_content(
            model="models/text-embedding-004",
            content=profile_text,
            task_type="retrieval_document" # Important: Use 'document' for the knowledge base
        )
        
        user.profile_embedding = result['embedding']
        user.save(update_fields=['profile_embedding'])
        print(f"Updated vector for user: {user.username}")
        
    except Exception as e:
        print(f"Error embedding profile: {e}")