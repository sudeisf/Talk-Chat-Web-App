
from celery import shared_task
import google.generativeai as genai
from django.conf import settings
from .models import User

genai.configure(api_key=settings.GOOGLE_API_KEY)

@shared_task
def update_user_embedding(user_id):
    try:
        user = User.objects.get(id=user_id)
        
        # Combine distinct fields to create a rich profile context
        # Improvisation: Add 'profession' and 'tags' to the text
        tags_str = ", ".join([t.name for t in user.user_tags.all()])
        profile_text = f"{user.profession}. Skills: {tags_str}. Bio: {user.bio}"
        
        if not profile_text.strip(): return

        # Generate 768-dim vector using Gemini
        result = genai.embed_content(
            model="models/text-embedding-004",
            content=profile_text,
            task_type="retrieval_document" # Important: Use 'document' for the knowledge base
        )
        
        user.profile_embedding = result['embedding']
        user.save()
        print(f"Updated vector for user: {user.username}")
        
    except Exception as e:
        print(f"Error embedding profile: {e}")