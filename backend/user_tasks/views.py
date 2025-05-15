from django.contrib.auth.models import User
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from django_crypto_auth.authentication import TokenAuthentication
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from user_tasks.models import Task

from .serializer import AddTaskSerializer, TaskSerializer, UpdateTaskSerializer

# Create your views here.


# region ToDo


class GetAllTasksView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = TaskSerializer

    def get(self, request):
        # TODO add pagination to improve performance
        return Response(
            TaskSerializer(Task.objects.filter(user=request.user), many=True).data,
            status=status.HTTP_200_OK,
        )


class AddTaskView(generics.CreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = AddTaskSerializer

    def get_serializer(self, *args, **kwargs):
        data = kwargs.pop("data", None)

        if data:
            data["user"] = self.request.user.pk

            kwargs["data"] = data

        return super().get_serializer(*args, **kwargs)


class UpdateTaskView(generics.UpdateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateTaskSerializer

    def get_object(self):
        task = self.kwargs.get("task_id")

        return get_object_or_404(Task, pk=task)


class DeleteTaskView(generics.DestroyAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        task = self.kwargs.get("task_id")
        return get_object_or_404(Task, pk=task)


# endregion


class RegisterView(APIView):
    def post(self, request):
        user = request.data.get("username")
        password = request.data.get("password")
        confirm_password = request.data.get("confirm_password")

        if not user or not password or not confirm_password:
            return Response(
                {"detail": "Necesitas completar todos los campos"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if password != confirm_password:
            return Response(
                {"detail": "Las contraseñas no coinciden"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            User.objects.create_user(username=user, password=password)
        except IntegrityError:
            return Response(
                {"detail": "Usuario ya existente"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {"detail": "Usuario creado correctamente"}, status=status.HTTP_201_CREATED
        )
