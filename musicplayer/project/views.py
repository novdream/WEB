# Create your views here.

from django.shortcuts import render, redirect
from .forms import LoginForm
from .forms import MusicForm
# User 自定义
from .models import User
from .models import Song
from django.urls import reverse
from django.contrib.auth.views import LoginView


def login_view(request):
    username = ''  # 默认为空
    password = ''  # 默认为空
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():

            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            try:
                user = User.objects.get(username=username)

                if user.password == password:
                    request.session['is_admin'] = user.is_admin
                    if user.is_admin:
                        return redirect('/admin/')
                    return redirect('music')
                else:
                    if user is None:
                        form.add_error(None, '用户名未注册')
                    elif password is None:
                        form.add_error(None, '密码为空')
                    else:
                        form.add_error(None, '密码不正确')
            except User.DoesNotExist:
                form.add_error(None, '用户名未注册')
        else:
            # 用户名长度或者密码长度超过
            form.add_error(None, '用户名或密码错误')
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form, 'username': username, 'password': password})


def signup(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        # 输入账号密码合法
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            is_admin = 'is_admin' in request.POST
            # 保存用户到数据库
            try:
                User.objects.get(username=username)
                form.add_error(None, '用户已被注册')
            except User.DoesNotExist:
                user = User.objects.create(username=username, password=password, is_admin=is_admin)
                user.save()
                return redirect(reverse('login'))
    # 账号密码有错误/GET注册界面
    else:
        form = LoginForm()
    return render(request, 'signup.html', {'form': form})


BASE_ROOT = '/static/'


def music(request):
    form = MusicForm()
    if request.method == 'POST':
        form = MusicForm(request.POST, request.FILES)

        if form.is_valid():
            name = form.cleaned_data['name']
            author = form.cleaned_data['author']
            mp3_file = request.FILES.get('mp3')

            # 检测是否已经有这首歌曲了
            try:
                song = Song.objects.get(name=name, author=author)
                form.add_error(None, '歌曲已在列表')

            except Song.DoesNotExist:
                user = Song.objects.create(name=name, author=author, time='04:10', src=mp3_file, pic='bg.jpg')

                return redirect('music')
        else:
            form.add_error(None, '输入有误')

    musicData = []  # 从数据库获得歌曲所有信息
    songItems = Song.objects.all()
    for song in songItems:
        song_data = {
            "name": song.name,
            "time": song.time,
            "src": "/static" + song.src.url,
            "author": song.author,
            "pic": "/static" + song.pic.url,
        }
        musicData.append(song_data)
    is_admin = request.session.get('is_admin', False)
    return render(request, 'index.html', {'data': musicData, 'is_admin': is_admin, 'form': form})

