/* jshint esversion: 6 */

document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item =>{
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target  == item){
                    hideTabContent();
                    showTabContent(i);
                } 
            });
        }
    });


    const deadline = '2022-03-20';

    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t/ (1000  * 60)) % 60),
              seconds = Math.floor((t/ 1000) % 60);

        return {
          'total': t,
          'days': days,
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds  
        };
    }

    function getZero(num) {
        if(num >= 0 && num < 10){
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setTime(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),  
              timeInterval = setInterval(updateTime, 1000);

        updateTime();

        function updateTime() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes); 
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }

    setTime('.timer', deadline);

    //Carousel 

    const next = document.querySelector('.arrow__next'),
      prev = document.querySelector('.arrow__prev'),
      carousel = document.querySelector('.carousel'),
      slideContent = document.querySelector('.offer__slide-wrapper');

    let direction;

    next.addEventListener('click', function() {
        direction = -1;
        
        carousel.style.justifyContent = 'flex-start';
        slideContent.style.transform = 'translateX(-25%)';  
    });

    prev.addEventListener('click', () => {
    if (direction === -1) {
        direction = 1;
        slideContent.appendChild(slideContent.firstElementChild);
    }
    
    carousel.style.justifyContent = 'flex-end';    
    slideContent.style.transform = 'translateX(25%)';  
    
    });

    slider.addEventListener('transitionend', () => {
    
    if (direction === 1) {
        slideContent.prepend(slideContent.lastElementChild);
    } else {
        slideContent.appendChild(slideContent.firstElementChild);
    }
    
    slideContent.style.transition = 'none';
    slideContent.style.transform = 'translateX(0)';

    setTimeout(() => {
        slideContent.style.transition = 'all 0.5s';
    });

    }, false);
    
    //Modal
    
    const modalbtn = document.querySelectorAll('[data-modal]'),
          modalWindow = document.querySelector('.modal'),
          modalClose = document.querySelector('[data-close]');

    modalbtn.forEach(btn => {
        btn.addEventListener('click',() => {
            modalWindow.classList.add('show');
            modalWindow.classList.remove('hide');
            document.body.style.overflow = "hidden";
    
        });
    });

    function closeModal() {
        modalWindow.classList.remove('show');
        modalWindow.classList.add('hide');
        document.body.style.overflow = "";
    }

    modalClose.addEventListener('click', closeModal);

    modalWindow.addEventListener('click', (e) => {
        if(e.target === modalWindow){
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === "Escape" && modalWindow.classList.contains('show')){
            closeModal();
        }
    });

    // Audio

    const play = document.querySelector('.play'),
          pause = document.querySelector('.stop');
    
    let audio = document.createElement('/Users/aldiyarbolegenov/Desktop/udemy/Food_dist/sounds/deti-online.com_-_groza.mp3');

    let count = 0;

    play.addEventListener('click', playSound);
    pause.addEventListener('click', stopSound);

    function playSound(){
        if (count === 0) {
            count = 1;
            audio.play();
            play.innerHTML = "Pause";
        } else {
            count = 0;
            audio.pause();
            play.innerHTML = "Play";
        }
    }
    function stopSound(){
        playSound();
        audio.pause();
        count = 1;
        audio.currentTime = 0;
    }
   
});

    //Equipment

    const actv = document.querySelectorAll('[data-activity]'),
          genderbtn = document.querySelectorAll('[data-gender]');

    genderbtn.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("calculating__choose-gender_active");
        });
    });

    actv.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("calculating__choose-actv_active");
        });
    });


