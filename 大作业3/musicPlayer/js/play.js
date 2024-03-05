
// 播放列表显示按钮·
const playListButton = document.getElementById('play-list');
const playlist = document.getElementById('playlist');

playListButton.addEventListener('click',function(){
    
    if (playlist.style.display === 'flex' || playlist.style.display === '') {
        playlist.style.display = 'none'
        // playlist.style.opacity = '0';
        playlist.classList.remove('slide-in');
        playlist.classList.add('slide-out');
    } else {
        playlist.style.display = 'flex'
        // playlist.style.opacity = '1';
        playlist.classList.add('slide-in');
        playlist.classList.remove('slide-out');
        
    }
})


//进度条
document.addEventListener('DOMContentLoaded', function() {
    const processContainer = document.querySelector('.process-container');
    const progressBar = document.querySelector('.progress-bar');
    let isDragging = false; // 标志位，用于判断是否正在拖动

    // 更新进度条
    function updateProgressBar() {
        
        const percentage = (MyAudio.currentTime / MyAudio.duration) * 100;
        progressBar.style.width = percentage + '%';
    }

    // 设置音频进度
    function setAudioProgress(e) {
        const clickX = e.offsetX; // 获取点击或拖动的位置
        const duration = MyAudio.duration;
        MyAudio.currentTime = (clickX / processContainer.offsetWidth) * duration;
    }

    // 鼠标按下事件
    processContainer.addEventListener('mousedown', function(e) {
        isDragging = true; // 标记为正在拖动
        setAudioProgress(e);
    });

    // 鼠标移动事件
    window.addEventListener('mousemove', function(e) {
        if (isDragging) { // 只有在拖动时才响应
            const clickX = e.pageX - processContainer.offsetLeft; // 计算相对于进度条的位置
            const duration = MyAudio.duration;
            const newTime = (clickX / processContainer.offsetWidth) * duration;
            if (newTime >= 0 && newTime <= duration) {
                MyAudio.currentTime = newTime;
            }
            
        }
    });

    // 鼠标松开事件
    window.addEventListener('mouseup', function() {
        isDragging = false; // 标记为结束拖动
        updateProgressBar();
    });

    // 监听音频播放进度变化来更新进度条
    MyAudio.addEventListener('timeupdate', updateProgressBar);
});


//更新歌曲数量
function updateSongNumber() {
    var songItems = document.querySelectorAll('.song-item');
    var songNumber = document.querySelector('.song-number');
    var playlist =document.querySelector('.play-list');
    if (songNumber) {
        songNumber.textContent = songItems.length + '首歌曲'; // 更新显示的歌曲数量
        playlist.textContent = '\ue66e' + songItems.length;
    }
}


//喜欢歌曲
const likesButton = document.getElementById('likes');
likesButton.addEventListener('click',function(){
    likesButton.classList.toggle('turn-red');
    likesButton.classList.toggle('turn-color');
})

// 计算音量模块宽度
document.addEventListener('DOMContentLoaded',function(){

    var voiceButton = document.getElementById('voice');
    var voiceColumnButton = document.getElementById('voice-column');
    var voiceColumnButtonRect = voiceColumnButton.getBoundingClientRect();
   

    var offsetLeft = voiceButton.offsetLeft;
   

    voiceColumnButton.style.top =  '-' + voiceColumnButtonRect.height + 'px';
    voiceColumnButton.style.left = offsetLeft + 'px';
});

//音量显示
var voice = document.getElementById('voice');
var voiceColumnButton = document.getElementById('voice-column');
voice.addEventListener('click',function(){
    if (voiceColumnButton.style.opacity === '1' || voiceColumnButton.style.opacity === '') {
        voiceColumnButton.style.opacity = '0';
    } else {
        voiceColumnButton.style.opacity = '1';
    }
})

//唱片机显示
var coverButton = document.getElementById('cover');
var lyricsShow = document.getElementById('lyrics-container');
coverButton.addEventListener('click',function(){

    if (lyricsShow.style.opacity === '1' || lyricsShow.style.opacity === '') {
        lyricsShow.style.opacity = '0';
        lyricsShow.classList.add('slide-down');
        lyricsShow.classList.remove('slide-up');
    } else {
        lyricsShow.style.opacity = '1';
        lyricsShow.classList.add('slide-up');
        lyricsShow.classList.remove('slide-down');
    }
})

// 获取.cover元素
const cover = document.getElementById('cover');
let isOriginalState = false;
// 点击.cover时执行的函数
cover.addEventListener('click', function() {
    
    if (isOriginalState) {
         // 动态修改::after的content属性需要用到CSS变量

        this.style.setProperty('--after-content', '"\ue669"'); // 注意双引号内的单引号
        // 修改.cover的title属性
        this.setAttribute('title', '收起歌曲详细页');
    }
    else{
        this.style.setProperty('--after-content', '"\ue66f"'); // 注意双引号内的单引号
        // 修改.cover的title属性
        this.setAttribute('title', '展开歌曲详细页');
    }
    isOriginalState=!isOriginalState;
});


//关闭音频上传窗口
function closeUpload() {
    document.getElementById('uploadContainer').style.display = 'none';
}