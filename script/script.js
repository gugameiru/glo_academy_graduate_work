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

            //Вызов отправки данных
            if ((target.type == 'submit') && (target.name == 'submit') && (target.tagName == 'BUTTON') && (target.className.indexOf('director-btn') == -1)) {
                target = target.closest('form');
                sendForm(target);  
            }

        }, true);
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

        const form = popup.querySelector('form'),
            subminButton = form.querySelector('button.capture-form-btn');
        clearForm(form);
        subminButton.disabled = true;

        //Валидация - только цифры в телефоне, только кириллица и пробелы в имени
        const userName = form.querySelector('input[name="user_name"]'),
        userPhone = form.querySelector('input[name="user_phone"]');

        if (userName) {
            userName.addEventListener('change', () => {
                if (!(userName.value.match(/[а-яёА-ЯЁ\s]/g))) {
                    userName.value = '';
                    userName.placeholder = 'Ошибка ввода';
                    subminButton.disabled = true;
                } else {
                    subminButton.disabled = false;
                }
            });
        }
        

        if (userPhone) {
            userPhone.addEventListener('change', () => {
            if (!(userPhone.value.match(/[0-9]/g))) {
                userPhone.value = '';
                userPhone.placeholder = 'Ошибка ввода';
                subminButton.disabled = true;
                } else {
                    subminButton.disabled = false;
                }
            });
        }
            

        
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
        return;    
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

        return;
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
        
        thisPanel.classList.add('in');
        
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
            distance = accordion.querySelectorAll('input')[2],
            total = document.getElementById('calc-result'),
            submitButton = accordion.querySelector('button');
        let totalMultiplier = {val: 1},
            bottom = {val: 0},
            base = {val: 0},
            calcData = {
                body: {},
                type: 1,
                diameter1: 1.4,
                ringNumber1: 1,
                diameter2: 0,
                ringNumber2: 0,
                bottom: true,
                sum: 0                
            };

            submitButton.disabled = true;
            distance.placeholder = 'Введите расстояние';

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
                theSwitcher = parentBlock.querySelector('.onoffswitch-checkbox');
    
            theSwitcher.toggleAttribute('checked'); 
            switcher();
            allSelects();

            return;             
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
                realMultipliers = [[1, 1.2],[1, 1.3, 1.5],[1, 1.2],[1, 1.3, 1.5]],
                sizesAndNumbers = [],
                realSizesAndNumbers = [[1.4, 2.0], [1, 2, 3], [1.4, 2.0], [1, 2, 3]];
            let thisMultiplier = 1;

            //Здесь вычисляется множитель  
            allSelectors.forEach((item,i) => {
                if (multipliers[i] != item.selectedIndex) {
                    thisMultiplier = thisMultiplier * realMultipliers[i][item.selectedIndex];
                }
                multipliers[i] = item.selectedIndex;
                sizesAndNumbers[i] = realSizesAndNumbers[i][item.selectedIndex]
            });

            //Здесь вычисляются параметры суммы
            if (allSwitches[0].checked) {
                
                base.val = 10000;
                calcData.type = 1;
                calcData.diameter1 = sizesAndNumbers[0];
                calcData.ringNumber1 = sizesAndNumbers[1];
                calcData.diameter2 = 0;
                calcData.ringNumber2 = 0;
            } 

            if (!allSwitches[0].checked) {
                base.val = 15000;
                calcData.type = 2;
                calcData.diameter1 = sizesAndNumbers[0];
                calcData.ringNumber1 = sizesAndNumbers[1];
                calcData.diameter2 = sizesAndNumbers[2];
                calcData.ringNumber2 = sizesAndNumbers[3];
            }

            if ((allSwitches[0].checked)&&(allSwitches[1].checked)) {
                bottom.val = 1000;
                calcData.bottom = true;
            }

            if ((!allSwitches[0].checked)&&(allSwitches[1].checked)) {
                bottom.val = 2000;
                calcData.bottom = true;
            }

            if (!allSwitches[1].checked) {
                bottom.val = 0;
                calcData.bottom = false;
            }
    
            totalMultiplier.val = thisMultiplier;

            //Вывод суммы в input 'calc-result'
            total.value = Math.ceil((base.val + bottom.val) * totalMultiplier.val);
            calcData.sum = +total.value;

            if (distance.value != '') {
                calcData.distance = +distance.value;
                submitButton.disabled = false;
            }

            //Хранение объекта с данными калькулятора в LocalStorage
            localStorage.setItem("calcData", JSON.stringify(calcData));

        
        return;
        };

        allSelects();
 
        //Вызов вычисления множителя
        allSelectors.forEach((item,i) => {
            item.addEventListener('change', () => {
                allSelects();
                
            });
        });

        //Добавление расстояния до дома
        distance.addEventListener('change', () => {
            calcData.distance = distance.textContent;
            allSelects();
        });
   
    };

    calc();
    
    
    // Send-ajax-form

    const sendForm = (form) => {
        const errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Ожидайте звонка нашего менеджера',
            inputErrorMessage = 'Ошибка ввода',
            userQuestion = document.getElementsByName('user_quest'),
            userName = form.querySelector('input[name="user_name"]'),
            userPhone = form.querySelector('input[name="user_phone"]'),
            url = './server.php';

        const statusMessage = document.createElement('div');
        statusMessage.className = 'status';
        statusMessage.style.cssText = 'font-size: 2rem;';   
         
        //Создание ТОЛЬКО ОДНОГО поля со статусом
        if (!form.querySelector('.status')) {
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            setTimeout(() => {
                form.removeChild(statusMessage);
            }, 4000);
        }
        
        //Получение объекта с данными калькулятора из LocalStorage, добавление в объект данных формы
        const formData = new FormData(form);
        let thisBody = {},
        mainBody = JSON.parse(localStorage.getItem("calcData"));


        let body = {};

        formData.forEach((val, key) => {
            thisBody[key] = val;
        });

        mainBody.body = thisBody;
        if (userQuestion[0].value != '') {
            mainBody.userQuestion = userQuestion[0].value;
        }
        body = mainBody;   
        userQuestion[0].value = '';

        statusMessage.textContent = loadMessage;

        //Отправка данных
        const outputData = (response) => {
            if (response.status != 200) {
                throw new Error('network status is not 200');
            }
            console.log(response);
            statusMessage.textContent = successMessage;
        };

        const errorData = (error) => {
            statusMessage.textContent = errorMessage;
            console.error(error);
        };

        const postData = (body, url) => {
            
            return fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 
                'application/json'},
                body: JSON.stringify(body)
            });
        };

        postData(body, url)
            .then(outputData)
            .catch(errorData)
            .finally(clearForm(form));

    };
    
    //Очистка формы
    const clearForm = (form) => {
        let elementsForm = [...form.elements].filter(item => { 
            return item.tagName.toLowerCase() !== 'button' && item.type != 'button';
        });

        elementsForm.forEach(elem => {
            elem.value = '';
            
        });
        return;
    };


    



});