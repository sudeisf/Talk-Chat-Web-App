from celery import shared_task
import google.generativeai as genai
from django.conf import settings
from .models import Question, QuestionInvite, SolutionSummary
from users.models import User
from chat.models import ChatSession, ChatMessage
from pgvector.django import L2Distance
import json

# Configure the SDK once
genai.configure(api_key=settings.GOOGLE_API_KEY)


@shared_task
def vectorize_question(question_id):
    
    try:
        question = Question.objects.get(id=question_id)
        text_to_embed = f"{question.title} {question.description}"
        
        results = genai.embed_content(
              model = "models/text-embedding-004",
              content=text_to_embed,
              task_type='retrieval_query'
        )
        
        question.embedding = results['embedding']
        question.save()
        
    except Exception as e:
        print(f"Error vectorizing question {question_id}: {str(e)}")
        
@shared_task 
def find_and_invite_experts(question_id):
    try:
        question = Question.objects.get(id=question_id)
        
        if not question.embedding:
            print(f"Question {question_id} does not have an embedding. Skipping expert search.")
            return
        
        matched_experts = User.objects.exclude(id=question.asked_by.id).annotate(
                distance=L2Distance('profile_embedding', question.embedding)
            ).order_by('distance')[:5]

        
        for expert in matched_experts:
            QuestionInvite.objects.create(question=question, expert=expert)
            
    except Exception as e:
        print(f"Error finding/inviting experts for question {question_id}: {str(e)}")
        
        
@shared_task
def summarize_chat_session(chat_session_id):
   
    session = ChatSession.objects.get(id=chat_session_id)
    messages = ChatMessage.objects.filter(chat_session=session).order_by('created_at')
    
    chat_log = "\n".join([f"{msg.sender.username}: {msg.message_content}" for msg in messages])
    
    # Configure Gemini 1.5 Flash (Fast & Free Tier available)
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    prompt = f"""
    You are a technical documentation expert. Analyze this chat log.
    
    CHAT LOG:
    {chat_log}
    
    OUTPUT JSON ONLY:
    {{
        "root_cause": "Brief explanation of the error",
        "solution_steps": "Markdown list of steps to fix it",
        "code_snippet": "The final working code block (if any)"
    }}
    """
    
    try:
        response = model.generate_content(prompt)
        clean_text = response.text.replace('```json', '').replace('```', '')
        data = json.loads(clean_text)
        
        SolutionSummary.objects.create(
            question=session.question,
            problem_root_cause=data.get('root_cause', 'No cause found'),
            solution_steps=data.get('solution_steps', 'No steps found'),
            final_code_snippet=data.get('code_snippet', '')
        )
        
    except Exception as e:
        print(f"Error summarizing: {e}")