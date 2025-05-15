from django.contrib import admin

from .models import Task

# Register your models here.


class TaskAdmin(admin.ModelAdmin):
    list_display = ("id", "text", "completed", "user")
    list_filter = ("completed", "user")
    search_fields = ("text", "user__username")
    ordering = ("-id",)


admin.site.register(Task, TaskAdmin)
