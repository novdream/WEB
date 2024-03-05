from django.db import models


# Create your models here.
class Song(models.Model):
    name = models.CharField(max_length=20)  # 歌曲名
    time = models.CharField(max_length=8)  # 歌曲时间
    src = models.FileField(upload_to='mp3/')  # 歌曲存储位置
    author = models.CharField(max_length=10)  # 歌手名
    pic = models.ImageField(upload_to='img/')  # 歌曲图片位置

    def __str__(self):
        return self.name


class User(models.Model):
    username = models.CharField(max_length=20)  # 用户名
    password = models.CharField(max_length=15)  # 密码
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.username