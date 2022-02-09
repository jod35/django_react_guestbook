from django.shortcuts import render
from .models import Post
from .serializers import PostSerializer
from rest_framework.viewsets import ModelViewSet

# Create your views here.


class PostView(ModelViewSet):
    serializer_class=PostSerializer
    queryset=Post.objects.all()