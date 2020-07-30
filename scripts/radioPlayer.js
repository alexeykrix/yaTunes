export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio'),
        radioCoverImg = document.querySelector('.radio-cover__img'),
        radioNavigation = document.querySelector('.radio-navigation'),
        radioHeaderBig = document.querySelector('.radio-header__big'),
        radioItem = document.querySelectorAll('.radio-item'),
        radioStop = document.querySelector('.radio-stop');
    
    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop')
        } else {
            radio.classList.add('play');
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop')
        }
    }

    radioPlayerInit.pause = () => {
        radio.classList.remove('play');
        radioStop.classList.add('fa-play');
        radioStop.classList.remove('fa-stop')
        audio.pause();
    }

    radioNavigation.addEventListener('change', e => {
        radioStop.disabled = false;
        audio.src = e.target.dataset.radioStantion;
        audio.play();
        changeIconPlay();

        const parrent = e.target.closest('.radio-item');

        if (radioNavigation.querySelector('.select')) radioNavigation
                .querySelector('.select').classList.remove('select');
        parrent.classList.add('select');

        const imgSrc = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = imgSrc;

        const title = parrent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;
    })

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    })
}