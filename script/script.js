window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // Выбор кнопок для попапа, второго аккордеона и кнопки больше
    const getPopupButtons = () => {
        const body = document.querySelector('body');
        body.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;

            // Условие для выбора ссылок, управляющих аккордеонами - заменяем span на а
            if (target.closest('a')) {
                target = target.closest('a');
            }
            //Вызов универсального попапа
            if ((target.className.indexOf('call-btn') != -1) || (target.className.indexOf('check-btn') != -1) || (target.className.indexOf('discount-btn') != -1)||
            (target.className.indexOf('consultation-btn') != -1)) {
                togglePopup(target);
            }
            //Вызов добавления блоков по кнопке Больше
            if (target.className.indexOf('add-sentence-btn') != -1) {
                addSentense(target);
            }
            // Управление аккордеоном 2 
            if ((target.getAttribute('role') == 'button')  && (target.closest('#accordion-two'))) {
                accordeonMoving(target);
            }

        });
    };

    getPopupButtons();

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
        return;        
        
    };

    //Калькулятор
    const calc = () => {
        const accordion = document.getElementById('accordion'),
            allSelectors = accordion.querySelectorAll('select'),
            allSwitches = accordion.querySelectorAll('.onoffswitch-checkbox'),
            selectBoxes = accordion.querySelectorAll('.select-box'),
            titleTextes = accordion.querySelectorAll('.title-text'),
            allLinks = accordion.querySelectorAll('a'),
            total = document.getElementById('calc-result');
        let totalMultiplier = {val: 1},
            bottom = {val: 0},
            base = {val: 0};
        
        //включение-выключение второго блока селектов
        const switcher = () => {
            
            if (allSwitches[0].checked) {
                selectBoxes[2].style.display = 'none';
                selectBoxes[3].style.display = 'none';
                titleTextes[1].style.display = 'none';
                allSelectors[2].selectedIndex = 0;
                allSelectors[3].selectedIndex = 0;
            } else {
                selectBoxes[2].style.display = 'inline-block';
                selectBoxes[3].style.display = 'inline-block';
                titleTextes[1].style.display = 'block';
            }


            return;
        };

        //Управление переключателями
        const switchMoving = (target) => {
            const parentBlock = target.closest('div[role]'),
                theSwitcher = parentBlock.querySelector('.onoffswitch-checkbox'),
                theSwitcherName = parentBlock.querySelector('input');
                console.log(theSwitcherName);
    
            theSwitcher.toggleAttribute('checked'); 
            switcher();
            allSelects();
             
        };


        switcher();

        //Управление аккордеоном калькулятора
        accordion.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;

            //Управление панелями с помощью заголовков
            if (target.closest('a')) {
                target = target.closest('a');
            }
            if (target.getAttribute('role') == 'button') {
                switcher();
                accordeonMoving(target);
            }

            //Управление панелями с помощью кнопки Следующий шаг
            switch(true) {
                case (target.getAttribute('href') == '#collapseTwo'):
                    accordeonMoving(allLinks[2]);
                    switcher();
                    break;
                case (target.getAttribute('href') == '#collapseThree'):
                    accordeonMoving(allLinks[4]);
                    switcher();
                    break;
                case (target.getAttribute('href') == '#collapseFour'):
                    accordeonMoving(allLinks[6]);
                    switcher();
                    break;
            }

            //Вызов управления переключателями
            if ((target.className.indexOf('onoffswitch-inner') != -1)||(target.className.indexOf('onoffswitch-switch') != -1)) {
                switchMoving(target);
                switcher();
                
            } 
        });

        //Вычисление множителя диаметров колец и общей суммы
        const allSelects = () => {
            const multipliers = [],
                realMultipliers = [[1, 1.2],[1, 1.3, 1.5],[1, 1.2],[1, 1.3, 1.5]];
            let thisMultiplier = 1;

            //Здесь вычисляется множитель
            const localAllSelectors = accordion.querySelectorAll('select');    
            localAllSelectors.forEach((item,i) => {
                if (multipliers[i] != item.selectedIndex) {
                    thisMultiplier = thisMultiplier * realMultipliers[i][item.selectedIndex];
                }
                multipliers[i] = item.selectedIndex;
                
            });

            //Здесь вычисляются параметры суммы
            if (allSwitches[0].checked) {
                
                base.val = 10000;
            } 

            if (!allSwitches[0].checked) {
                base.val = 15000;
            }

            if ((allSwitches[0].checked)&&(allSwitches[1].checked)) {
                bottom.val = 1000;
            }

            if ((!allSwitches[0].checked)&&(allSwitches[1].checked)) {
                bottom.val = 2000;
            }

            if (!allSwitches[1].checked) {
                bottom.val = 0;
            }
    
            totalMultiplier.val = thisMultiplier;
            //Вывод суммы в input 'calc-result'
            total.value = Math.ceil((base.val + bottom.val) * totalMultiplier.val);
        
        return;
        };

        allSelects();
 
        //Вызов вычисления множителя
        allSelectors.forEach((item,i) => {
            item.addEventListener('change', () => {
                allSelects();
                
            });
        });
    };
    
    calc();

});