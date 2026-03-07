import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

app = Celery('config', include=['questions.tasks', 'users.tasks'])

# Load Celery settings through Django settings so installed apps are available.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Make task registration robust across worker restarts and Windows environments.
app.conf.imports = ('questions.tasks', 'users.tasks')
app.autodiscover_tasks()

@app.task(bind=True, ignore_result=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
