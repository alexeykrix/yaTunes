import {addZero} from './supScripts.js';
export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio'),
     audioImg = document.querySelector('.audio-img'),
     audioHeader = document.querySelector('.audio-header'),
     audioPlayer = document.querySelector('.audio-player'),
     audioNavigation = document.querySelector('.audio-navigation'),
     audioButtonPlay = document.querySelector('.audio-button__play'),
     audioProgress = document.querySelector('.audio-progress'),
     audioProgressTiming = document.querySelector('.audio-progress__timing'),
     audioTimePassed = document.querySelector('.audio-time__passed'),
     audioTimeTotal = document.querySelector('.audio-time__total');

    const playlist = ['hello', 'flow', 'speed'];
    let trackIndex = 0;

    musicPlayerInit.pause = () => {
        audio.classList.remove('play');
        audioButtonPlay.classList.add('fa-play');
        audioButtonPlay.classList.remove('fa-pause');
        audioPlayer.pause(); 
    };

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playlist[trackIndex];
        
        audioHeader.textContent = track.toUpperCase();
        audioImg.src = `./audio/${track}.jpg`;
        audioPlayer.src = `./audio/${track}.mp3`;
        isPlayed? audioPlayer.pause(): audioPlayer.play();
    };

    const prevTrack = () => {
        if (trackIndex !== 0) trackIndex--;
            else trackIndex = playlist.length-1;
            loadTrack();
    }

    const nextTrack = () => {
        if (trackIndex === playlist.length-1) trackIndex = 0;
            else trackIndex++;
            loadTrack();
    }

    audioNavigation.addEventListener('click', e => {
        const t = e.target;
        if (t.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            audioPlayer.paused? audioPlayer.play() : audioPlayer.pause();
            
            const track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        }

        if (t.classList.contains('audio-button__prev')) prevTrack();
        if (t.classList.contains('audio-button__next')) nextTrack();
    })

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = currentTime/duration*100;

        audioProgressTiming.style.width = progress+'%';    
        
        const minutesPassed = Math.floor(currentTime / 60) || 0;
        const secondsPassed = Math.floor(currentTime % 60) || 0;
        const minutesTotal = Math.floor(duration/60) || 0;
        const secondsTotal = Math.floor(duration/60) || 0;

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    });

    audioProgress.addEventListener('click', e => {
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = (x/allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    })
};