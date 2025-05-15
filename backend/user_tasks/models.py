from django.contrib.auth.models import User
from django.db import models

# Create your models here.

# An abstract user model can be useful for implementing advanced authentication features.
# However, the default user model is sufficient for the current requirements.


class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_tasks")
    text = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
