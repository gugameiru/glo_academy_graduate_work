window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    //Получение разных кнопок и запуск разных функций
    const getButtons = () => {
        const body = document.querySelector('body');
        body.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;
            
            switch (true) {
                //Вызов универсального попапа
                case ((target.className.indexOf('call-btn') != -1) || (target.className.indexOf('check-btn') != -1) || (target.className.indexOf('discount-btn') != -1)):
                    togglePopup(target);
                    break;
                //Вызов добавления блоков по кнопке Больше
                case (target.className.indexOf('add-sentence-btn') != -1):
                    addSentense(target);
                    break;
                // Следующие 2 кейса - работа с FAQ аккордеоном
                case (target.getAttribute('role') == 'button'):
                    accordeonMoving(target);
                    break;
                case ((target.className.indexOf('panel-heading') != -1)|| (target.className.indexOf('panel-title') != -1)):
                    target = target.querySelector('a');
                    accordeonMoving(target);
                    break;
                
            }
        });
    };

    getButtons();


    //Универсальный попап
    const togglePopup = (target) => {
        const popupCall = document.querySelector('.popup-call'),
            popupCheck = document.querySelector('.popup-check'),
            popupDiscount = document.querySelector('.popup-discount');
        let popup;

        if (target.className.indexOf('call-btn') != -1) {
            popup = popupCall;
        } else if (target.className.indexOf('check-btn') != -1) {
            popup = popupCheck;
        } else if (target.className.indexOf('discount-btn') != -1) {
            popup = popupDiscount;
        } else {
            return;
        }

        setOpacity(popup);
        
        popup.addEventListener('click', (event) => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                }
            }
        });
        
    };

    // Анимация - плавное изменение прозрачности
    const setOpacity = (elem) => {
        let opacity = 0;
        elem.style.display = 'block';
        elem.style.opacity = opacity;
        setTimeout(function change() {
            if (opacity > 1) {
                elem.style.opacity = 1;
                return;
            }
            elem.style.opacity = opacity;
            opacity += 0.01;
            setTimeout(change, 0.1);
        }, 60);
    };

    // Добавление блоков по кнопке "Больше"
    const addSentense = (target) => {
        const actionBlocks = document.querySelector('.text-center>.row').children;

        Array.from(actionBlocks).forEach(function(element) {
                element.className = 'col-xs-12 col-sm-6 col-md-4';
        });

        target.style.display = 'none';
    };

    //FAQ Аккордеон
    const accordeonMoving = (target) => {
        const panelClass = target.getAttribute('aria-controls'),
            accordion = document.getElementById('accordion-two'),
            allPanels = accordion.querySelectorAll('.panel-collapse');
        const thisPanel = document.getElementById(panelClass);

        allPanels.forEach(elem => {
            if (elem.id != thisPanel) {
                elem.classList.remove('in');
            }
        });
        
        thisPanel.classList.toggle('in');        
        
    };

});