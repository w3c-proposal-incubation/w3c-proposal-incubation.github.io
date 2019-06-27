const list = document.querySelector('danmaku-list');
const video = document.querySelector('video');
list.danmakuplaystate = 'paused';

// generate danmakus
const duration = 269;
const danmakus = [];
for (let i = 0; i < duration * 5; i++) {
    danmakus.push({
        text: '0123456789'.slice(parseInt(Math.random() * 10)),
        time: Math.random() * 269,
        mode: 'scroll',
    });
}
for (let i = 0; i < duration * 1; i++) {
    danmakus.push({
        text: '0123456789'.slice(parseInt(Math.random() * 10)),
        time: Math.random() * 269,
        mode: 'top',
    });
}
for (let i = 0; i < duration * 1; i++) {
    danmakus.push({
        text: '0123456789'.slice(parseInt(Math.random() * 10)),
        time: Math.random() * 269,
        mode: 'bottom',
    });
}
danmakus.sort((a, b) => a.time - b.time);

window.addDanmaku = (text, mode, fontSize, duration, delay) => {
    const danmaku = document.createElement('danmaku-item');
    danmaku.innerHTML = text;
    danmaku.mode = mode;
    if (duration) {
        danmaku.danmakuduration = parseInt(duration);
    }
    if (delay) {
        danmaku.danmakudelay = parseInt(delay);
    }
    if (fontSize) {
        danmaku.style.fontSize = fontSize + 'px';
    }
    list.appendChild(danmaku);
}

let index = 0;
function nextFrame () {
    const nowTime = video.currentTime;
    while (danmakus[index] && danmakus[index].time <= nowTime) {
        window.addDanmaku(danmakus[index].text, danmakus[index].mode);
        index++;
    }

    if (video.paused) {
        return;
    } else {
        window.requestAnimationFrame(() => {
            nextFrame();
        });
    }
}

video.addEventListener('play', () => {
    list.danmakuplaystate = 'running';
    window.requestAnimationFrame(() => {
        nextFrame();
    });
});
video.addEventListener('pause', () => {
    list.danmakuplaystate = 'paused';
});
video.addEventListener('seeking', () => {
    list.innerHTML = '';
    for (let i = 0; i < danmakus.length; i++) {
        if (danmakus[i].time > video.currentTime) {
            index = i;
            break;
        }
    }
});