window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    //Получение разных кнопок и запуск разных функций
    const getButtons = () => {
        const body = document.querySelector('body');
        body.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;

            // Условие для выбора ссылок, управляющих аккордеоном
            if (target.closest('a')) {
                const targetForAcc = target.closest('a');
                if (targetForAcc.getAttribute('role') == 'button') {
                    target = targetForAcc;
                } 
            }
            
            switch (true) {
                //Вызов универсального попапа
                case ((target.className.indexOf('call-btn') != -1) || (target.className.indexOf('check-btn') != -1) || (target.className.indexOf('discount-btn') != -1)||
                (target.className.indexOf('consultation-btn') != -1)):
                    togglePopup(target);
                    break;
                //Вызов добавления блоков по кнопке Больше
                case (target.className.indexOf('add-sentence-btn') != -1):
                    addSentense(target);
                    break;
                // Вызов универсального аккордеона - клики по ссылке в заголовке и по панелям заголовка
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
            popupDiscount = document.querySelector('.popup-discount'),
            popupConsultation = document.querySelector('.popup-consultation');
        let popup;

        switch (true) {
            case (target.className.indexOf('call-btn') != -1):
                popup = popupCall;
                break;
            case (target.className.indexOf('check-btn') != -1):
                popup = popupCheck;
                break;
            case (target.className.indexOf('discount-btn') != -1):
                popup = popupDiscount;
                break;
            case (target.className.indexOf('consultation-btn') != -1):
                popup = popupConsultation;
                break;
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

    //Универсальный аккордеон
    const accordeonMoving = (target) => {
        const panelClass = target.getAttribute('aria-controls'),
            parentId = target.getAttribute('data-parent'),
            accordion = document.querySelector(parentId),
            allPanels = accordion.querySelectorAll('.panel-collapse');
        const thisPanel = document.getElementById(panelClass);

        allPanels.forEach(elem => {
            if (elem.id != thisPanel) {
                elem.classList.remove('in');
            }
        });
        
        thisPanel.classList.toggle('in');        
        
    };

    //Аккордеон-калькулятор
    const accordeonCalc = (target) => {

    };

});