
let currentSongIndex = 0; // 当前歌曲索引
let lastSongIndex = 0;
// 来自数据库的音乐数据
let musicData = eval(document.getElementById('data').getAttribute('data-json'));

let MyAudio = new Audio();
let playButton = document.getElementById('playButton');

// 为播放按钮添加点击事件监听器
playButton.addEventListener('click', function() {
    // 检查音频是否正在播放
    if(MyAudio.paused){
        playButton.innerHTML = '&#xe626'; // 更改按钮标签为"Pause"
        playButton.title='暂停';
        playButton.classList.add('pause-button'); // 更改按钮的ID为"pause-button"
        playButton.classList.remove('play-button');

        MyAudio.play()
            .then(() => {
            })
        // state=true;

    }
    else{
        playButton.innerHTML = '&#xe61c'; // 更改按钮标签为"Pause"
        playButton.title='播放';
        playButton.classList.remove('pause-button'); // 更改按钮的ID为"pause-button"
        playButton.classList.add('play-button');
        MyAudio.pause();
        // state=false;
    }
});

  
//上一首
let PrevButton = document.getElementById('prevButton');
PrevButton.addEventListener('click', function(){
    lastSongIndex = currentSongIndex;
    currentSongIndex = (currentSongIndex - 1 + musicData.length) % musicData.length;
    
    initPlayer(currentSongIndex);
    MyAudio.play()
    .then(() => {
            });
    playButton.innerHTML = '&#xe626'; // 更改按钮标签为"Pause"
    playButton.title='暂停';
    playButton.classList.add('pause-button'); // 更改按钮的ID为"pause-button"
    playButton.classList.remove('play-button');

    correctCoverRotate();
    $('.song-needle').classList.add('play');
    $('.song-img').classList.add('play');
    $('.play-btn').classList.add('play');

    // console.log(currentSongIndex);
});


//下一首
let AfterButton = document.getElementById('afterButton');
AfterButton.addEventListener('click', function(){
    lastSongIndex = currentSongIndex;
    currentSongIndex = (currentSongIndex + 1 + musicData.length) % musicData.length;
    initPlayer(currentSongIndex);
    MyAudio.play().then();
    playButton.innerHTML = '&#xe626'; // 更改按钮标签为"Pause"
    playButton.title='暂停';
    playButton.classList.add('pause-button'); // 更改按钮的ID为"pause-button"
    playButton.classList.remove('play-button');
    // console.log(currentSongIndex);

    correctCoverRotate();
    $('.song-needle').classList.add('play');
    $('.song-img').classList.add('play');
    $('.play-btn').classList.add('play');
});


//自动滚动歌曲名和歌手名
function autoScroll() {
    const container = document.getElementById('name');
    let scrollAmount = 0; // 滚动量
    const speed = 0.5;
    function step() {
        container.scrollLeft += speed; // 每次向右滚动1px
        scrollAmount += speed;
        if (scrollAmount < container.scrollWidth - container.clientWidth) {
            requestAnimationFrame(step); // 继续滚动
        } else {
            container.scrollLeft = 0; // 滚动到末尾后重置为0
            scrollAmount = 0; // 重置滚动量
            requestAnimationFrame(step); // 重新开始滚动
        }
    }

    requestAnimationFrame(step); // 开始滚动
}

autoScroll(); // 调用函数


//初始化播放器
function initPlayer(index) {
    MyAudio.src = musicData[index].src; // 设置音乐文件源
    //更新名字
    let nameShow = document.getElementById('name');
    nameShow.textContent = musicData[index].name + ' -      ' + musicData[index].author;
    //更新歌曲时间
    let time = document.getElementById('time');
    time.textContent = '00:00/' + musicData[index].time ;
    

    //更新图片#TODO

    //进度条重置#TODO

    //唱片机角度重置#TODO

    //更新列表显示active
    let songItems = document.querySelectorAll('.song-item');
    let itemAtIndex = songItems[index];
    if (itemAtIndex) { // 检查元素是否存在
        itemAtIndex.classList.add('active'); // 举例：添加一个类
    }
    let itemLastIndex = songItems[lastSongIndex];
    if(itemLastIndex && (lastSongIndex !== currentSongIndex)) {
        itemLastIndex.classList.remove('active'); // 举例：添加一个类
        
    }
   



}
initPlayer(currentSongIndex);
console.log(currentSongIndex)

//更新进度条时间
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60); // 获取分钟数
    seconds = Math.floor(seconds % 60); // 获取秒数
    minutes = (minutes < 10) ? "0" + minutes : minutes; // 格式化分钟
    seconds = (seconds < 10) ? "0" + seconds : seconds; // 格式化秒数
    return minutes + ":" + seconds; // 返回格式化后的时间
}
MyAudio.addEventListener('timeupdate', function() {
    let timeDiv = document.getElementById('time');
    let currentTime = formatTime(MyAudio.currentTime); // 使用当前播放时间（秒）调用formatTime函数
    timeDiv.textContent = currentTime + '/' + musicData[currentSongIndex].time; // 更新显示时间的元素
});

//加载播放列表以及删除列播放表歌曲功能
document.addEventListener('DOMContentLoaded', function() {
    let admin = document.getElementById('admin').getAttribute('data-json') === 'True'
    console.log(admin)

    updateSongNumber();

    //点击换歌曲
    let song_items = document.querySelectorAll('.song-item');
    song_items.forEach(function(button){
    
        button.addEventListener('click',function(){
            let songItem = this.closest('.song-item');
            let index = Array.from(song_items).indexOf(songItem);
            lastSongIndex = currentSongIndex;
            currentSongIndex = index ;
            initPlayer(currentSongIndex);
            MyAudio.play().then();
            playButton.innerHTML = '&#xe626'; // 更改按钮标签为"Pause"
            playButton.title='暂停';
            playButton.classList.add('pause-button'); // 更改按钮的ID为"pause-button"
            playButton.classList.remove('play-button');
            
        
            correctCoverRotate();
            $('.song-needle').classList.add('play');
            $('.song-img').classList.add('play');
            $('.play-btn').classList.add('play');
        })
    });

    //删除歌曲
    let deleteButtons = document.querySelectorAll('.delete-button');
    
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // 找到并删除这个按钮的父级 .song-item
            let songItem = this.closest('.song-item');
            let index = Array.from(song_items).indexOf(songItem);
            //删除musicData的数据以及数据库的数据

            if (songItem) {
                songItem.remove();
                musicData.splice(index, 1);
                console.log(musicData)
                // 更新歌曲数量
                updateSongNumber();
            }
        });
    });
    
});

//调节音量
document.addEventListener('DOMContentLoaded', function() {
    MyAudio.volume = 0.5;
    let volumeControl = document.getElementById('volume'); // 获取<input type="range">元素

    // 监听<input>元素的input事件来实时更新<audio>元素的音量
    volumeControl.addEventListener('input', function() {
        MyAudio.volume = 1-this.value/100; // 设置<audio>的音量等于<input>的当前值

        let volumeValue = document.getElementById('volume-value');
        volumeValue.textContent = ((1-this.value/100) * 100).toFixed(0) + '%';
    });
});
   
// 歌词轮播

const lyricsArray = [
    { time: 0, text: "海浪无声将夜幕深深淹没" },
    { time: 10, text: "漫过天空尽头的角落" },
    { time: 20, text: "大鱼在梦境的缝隙里游过" },
    { time: 30, text: "凝望你沉睡的轮廓" },
    { time: 40, text: "看海天一色 听风起雨落" },
    { time: 50, text: "执子手吹散苍茫茫烟波" },
    { time: 60, text: "大鱼的翅膀 已经太辽阔" },
    { time: 70, text: "第二行歌词" },
    { time: 80, text: "第二行歌词" },
    { time: 90, text: "第二行歌词" },
    { time: 100, text: "第二行歌词" },
    { time: 110, text: "第二行歌词" },
    { time: 120, text: "第二行歌词" },
    { time: 130, text: "第二行歌词" },
    


];

const lyricsContent = document.getElementById('lyrics-content');

// 根据歌词数据创建歌词段落
lyricsArray.forEach(lyric => {
    let p = document.createElement('p');
    p.textContent = lyric.text;
    p.dataset.time = lyric.time;
    lyricsContent.appendChild(p);
});

let activeLyric = null;
// 更新歌词显示的函数
function updateLyrics() {
    let currentTime = MyAudio.currentTime;
    
    // 遍历所有歌词段落，找到当前应该显示的歌词
    document.querySelectorAll('#lyrics-content p').forEach((p, index) => {
         // 如果当前歌词是最后一行，则停止遍历
         if (index === lyricsArray.length - 1 && currentTime >= p.dataset.time) {
            activeLyric.classList.add('active');
        }
        else if ( currentTime >= lyricsArray[index].time && currentTime < lyricsArray[index+1].time) {
           
            if (activeLyric) {
                activeLyric.classList.remove('active');
            }
            activeLyric = p;
            activeLyric.classList.add('active');
            
        }
       
    });

    // 滚动歌词容器使当前播放的歌词行居中
    if (activeLyric) {
        lyricsContent.scrollTop = activeLyric.offsetTop - lyricsContent.offsetHeight / 2 + activeLyric.offsetHeight / 2;
    }
}

// 监听音频播放进度变化来更新歌词
MyAudio.addEventListener('timeupdate', updateLyrics);


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


