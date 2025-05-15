from rest_framework import serializers

from user_tasks.models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["text", "completed", "id"]


class AddTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["text", "user", "id"]


class UpdateTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["completed", "text"]
