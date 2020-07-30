import {videoPlayerInit} from './videoPlayer.js';
import {musicPlayerInit} from './musicPlayer.js';
import {radioPlayerInit} from './radioPlayer.js';

const playerBtn = document.querySelectorAll('.player-btn'),
      playerBlock = document.querySelectorAll('.player-block'),
      temp = document.querySelector('.temp');

const deactivationPlayer = () => {
    musicPlayerInit.pause();
    videoPlayerInit.pause();
    radioPlayerInit.pause();
    temp.style.display = 'none';
    playerBtn.forEach( item => item.classList.remove('active'));
    playerBlock.forEach( item => item.classList.remove('active'));
}

playerBtn.forEach( (btn, i) => btn.addEventListener('click', e => {
        if (!btn.classList.contains('active')) {
            deactivationPlayer();
            btn.classList.add('active');
            playerBlock[i].classList.add('active');    
        }
    })
);

videoPlayerInit();
musicPlayerInit();
radioPlayerInit();