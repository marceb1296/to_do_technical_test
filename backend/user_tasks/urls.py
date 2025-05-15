from django.urls import path

from user_tasks import views

urlpatterns = [
    path("", views.GetAllTasksView.as_view()),
    path("add", views.AddTaskView.as_view()),
    path("update/<int:task_id>", views.UpdateTaskView.as_view()),
    path("delete/<int:task_id>", views.DeleteTaskView.as_view()),
]
