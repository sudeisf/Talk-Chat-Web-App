from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import User, UserTag
from .tasks import update_user_embedding


@receiver(post_save, sender=User)
def user_updated(sender, instance, created, **kwargs):
    # Only trigger if bio or profession is present
    if instance.bio or instance.profession:
        update_user_embedding.delay(instance.id)
        
@receiver(post_save, sender=UserTag)
def user_tag_added(sender, instance, created, **kwargs):
    if created:
        update_user_embedding.delay(instance.user_id)


@receiver(post_delete, sender=UserTag)
def user_tag_removed(sender, instance, **kwargs):
    update_user_embedding.delay(instance.user_id)