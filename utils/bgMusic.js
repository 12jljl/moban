var innerAudioContext = uni.createInnerAudioContext();
function music() {
        innerAudioContext.autoplay = true; //自动播放
        innerAudioContext.loop = true; //循环播放
        //音乐播放
        innerAudioContext.play()
        //音乐地址
        innerAudioContext.src =
                'https://openbox-1318697772.cos.na-siliconvalley.myqcloud.com/wisdomSaint/images/46350216879263340871195004127141346021231.mp320230628/46350216879263340871195004127141346021231.mp3';
}
music()

function playMusic() {
        innerAudioContext.play()
}

function stopMusic() {
        innerAudioContext.pause()
}
module.exports = {
        music,
        playMusic,
        stopMusic
}