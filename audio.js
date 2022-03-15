var audioSound = document.getElementById('audioPlayer');
var progress = document.getElementById('playProgress');
var audioTime = document.getElementById('audioTime');
var playTime = document.getElementById('playingTime');
var vBar = document.getElementById('volumeBar');

// time set 
var toHHMMSS = function ( totalsecs ) {
    var sec_num = parseInt(totalsecs, 10);
    //var hours   = Math.floor(sec_num / 3600);
    //var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var minutes = Math.floor(sec_num / 60);
    //var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var seconds = sec_num - (minutes * 60);
    //if (hours   < 10) {hours   = "0"+hours; }
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    //var time = hours+':'+minutes+':'+seconds;
    var time = minutes+':'+seconds;
    return time;
}

//audio update time 
audioSound.addEventListener("timeupdate",function(){
    // time active
    playTime.textContent = toHHMMSS(audioSound.currentTime);
    // progress active
    progress.value = audioSound.currentTime;
    // audio play finish event
    if(progress.value == audioSound.duration){
        document.querySelector(".play-stop.on").classList.remove("on");
        progress.value = 0;
        playTime.textContent = "00:00";
    }
});

//audio load
audioSound.addEventListener('canplay', function(){
    //audio progress bar max 
    progress.max = audioSound.duration;
    //audio sound time
    audioTime.textContent = toHHMMSS(audioSound.duration);
});

//audio progress change event
progress.addEventListener('click', function(e){
    audioSound.currentTime = Math.floor(audioSound.duration) * (e.offsetX / e.target.offsetWidth);
}, false);

//audio volume 
vBar.addEventListener("change", function(e) {
    audioSound.volume = parseInt(e.target.value) / 10;
    if( audioSound.volume == 0 ){
        document.querySelector('.volume-cs > .icon').classList.add('mute');
    }else{
        document.querySelector('.volume-cs > .icon').classList.remove('mute');
    }
});

//audio play
function audioPlay(e){
    e.parentNode.classList.add('on');   
    //audioSound.load();
    audioSound.play();
}
//audio stop
function audioPause(e){
    e.parentNode.classList.remove('on');
    audioSound.pause();
}

//audio speed
var speedVal = document.querySelector('.spd_txt');
function playSpeed(e){
    if(e == "minus"){
        speedVal.stepDown();
    }else if(e == "plus"){
        speedVal.stepUp();
    }else if(e == "key"){
        if ( speedVal.value < 0.1 ){
            alert('최소 0.1배속 까지 가능합니다.');
            return false;
        }
        if( speedVal.value > 4 ){
            alert('최대 4배속 까지 가능합니다.');
            return false;
        }
    } 
    audioSound.playbackRate = speedVal.value;
}

//audio time jump
function timeJump(e){
    audioSound.currentTime += e;
}

// audio volume mute
function muteVolumeOff(e){
    e.parentNode.classList.add('mute');
    audioSound.volume = 0;
    vBar.value = 0;
}
function muteVolumeOn(e){
    e.parentNode.classList.remove('mute');
    audioSound.volume = 1;
    vBar.value = 10;
}


//keyboard event
function keyEventPlay(tag,key){
    if(event.keyCode == '32'){
        if (key == 'play'){
            if(tag.className == "play-stop on"){
                audioPause(document.querySelector('.fa-pause'));
            }else if(tag.className == "play-stop"){
                audioPlay(document.querySelector('.fa-play'));
            };
        }
    }
}


// teb
$(document).ready(function(){
    var tabTotCount = document.querySelectorAll('[tabindex]');
    for(i=21; i<=tabTotCount.length+22; i++){
        tabTotCount[i].tabIndex = i+1;
    }
});

