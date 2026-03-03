from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver
from .models import User
from .tasks import update_user_embedding


@receiver(post_save, sender=User)
def user_updated(sender, instance, created, **kwargs):
    # Only trigger if bio or profession is present
    if instance.bio or instance.profession:
        update_user_embedding.delay(instance.id)
        
@receiver(m2m_changed, sender=User.user_tags.through)
def tags_changed(sender, instance, action, **kwargs):
    if action in ["post_add", "post_remove"]:
        update_user_embedding.delay(instance.id)    