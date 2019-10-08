window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    //Получение разных кнопок и запуск разных функций
    const getButtons = () => {

    // Вывод дефолтного значения в калькулятор
    let total = document.getElementById('calc-result');
    total.value = 11000;

        //Отключение второго блока селекторов по умолчанию
        const accordion = document.getElementById('accordion'),
            selectBoxes = accordion.querySelectorAll('.select-box'),
            titleTextes = accordion.querySelectorAll('.title-text');

            selectBoxes[2].style.display = 'none';
            selectBoxes[3].style.display = 'none';
            titleTextes[1].style.display = 'none';

        const body = document.querySelector('body');
        body.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;

            console.log(target);

            // Условие для выбора ссылок, управляющих аккордеонами - заменяем span на а
            if (target.closest('a')) {
                target = target.closest('a');
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
                case ((target.getAttribute('role') == 'button')):
                    accordeonMoving(target);
                    break;
                case ((target.className.indexOf('panel-heading') != -1)|| (target.className.indexOf('panel-title') != -1)):
                    target = target.querySelector('a');
                    accordeonMoving(target);
                    break;
                //Вызов управления переключателями
                case ((target.className.indexOf('onoffswitch-inner') != -1)||(target.className.indexOf('onoffswitch-switch') != -1)): 
                    switchMoving(target);
                    break;
                //Вызов управления кнопками "Следующий шаг"
                case(target.className.indexOf('construct-btn') != -1):
                    nextStepButtons(target);
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

    //Калькулятор
        //Управление переключателями, влияние их положения на сумму
    const switchMoving = (target) => {
        const parentBlock = target.closest('div[role]'),
            switcher = parentBlock.querySelector('.onoffswitch-checkbox'),
            switchOne = document.getElementById('myonoffswitch'),
            switchTwo = document.getElementById('myonoffswitch-two'),
            total = document.getElementById('calc-result');


        switcher.toggleAttribute('checked');

        if (switchOne.checked == true) {
            total.value = 10000;
            if (switchTwo.checked == true) {
                total.value = +total.value + 1000;
            }
        } else {
            total.value = 15000;
            if (switchTwo.checked == true) {
                total.value = +total.value + 2000;
            }
        }

        allSelects();
    };
        //Перемещение по кнопкам Следующий блок
    const nextStepButtons = (target) => {
        const parentBlock = document.querySelector(target.getAttribute('data-parent')),
            accordion = document.getElementById('accordion'),
            allSelectors = accordion.querySelectorAll('select'),
            allSwitches = parentBlock.querySelectorAll('.onoffswitch-checkbox'),
            selectBoxes = parentBlock.querySelectorAll('.select-box'),
            titleTextes = parentBlock.querySelectorAll('.title-text'),
            allLinks = parentBlock.querySelectorAll('a');
            
            //Отключение селектов второго колодца
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

            //Хождение по кнопкам Следующий блок
        switch(true) {
            case (target.getAttribute('href') == '#collapseTwo'):
                accordeonMoving(allLinks[2]);
                break;
            case (target.getAttribute('href') == '#collapseThree'):
                accordeonMoving(allLinks[4]);
                break;
            case (target.getAttribute('href') == '#collapseFour'):
                accordeonMoving(allLinks[6]);
                break;
        }
  
    };

    //Управление селектами диаметра и количества колец, влияние их на сумму
    const allSelects = () => {
        const parentBlock = document.getElementById('collapseTwo'),
            allSelectors = parentBlock.querySelectorAll('select'),
            total = document.getElementById('calc-result'),
            totalValue = total.value,
            multipliers = [],
            realMultipliers = [[1, 1.2],[1, 1.3, 1.5],[1, 1.2],[1, 1.3, 1.5]];

        allSelectors.forEach((item,i) => {
            item.addEventListener('change', () => {
                total.value = totalValue;
                if (multipliers[i] != item.selectedIndex) {
                    total.value = +total.value * realMultipliers[i][item.selectedIndex];
                }
                multipliers[i] = item.selectedIndex;
                console.log(realMultipliers[i][item.selectedIndex]);
            });
        });
           
        
    };

    allSelects();

});