from django import forms


# 登录表单
class LoginForm(forms.Form):
    username = forms.CharField(max_length=20,
                               widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': '用户名'}))
    password = forms.CharField(max_length=15,
                               widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': '密码'}))


class MusicForm(forms.Form):
    name = forms.CharField(max_length=20,
                           widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': '歌名'}))
    author = forms.CharField(max_length=15,
                             widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': '歌手'}))
    mp3 = forms.FileField()
