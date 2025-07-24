from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Otp

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    model = User
    list_display = ("email", "username", "firstName", "lastName", "is_active", "is_staff", "is_superuser")
    list_filter = ("is_staff", "is_superuser", "is_active", "groups")
    search_fields = ("email", "username", "firstName", "lastName")
    ordering = ("-created_at",)

    fieldsets = (
        (None, {"fields": ("email", "username", "password")}),
        ("Personal Info", {"fields": ("firstName", "lastName", "phone_number", "birth_date", "gender", "profile_image")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Timestamps", {"fields": ("last_login", "created_at", "updated_at")}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "username", "password1", "password2", "firstName", "lastName", "is_active", "is_staff"),
        }),
    )


@admin.register(Otp)
class OtpAdmin(admin.ModelAdmin):
    list_display = ("email", "code", "is_used", "is_expired", "expires_at", "created_at")
    search_fields = ("email",)
    list_filter = ("is_used", "is_expired")
    readonly_fields = ("created_at", "expires_at")
