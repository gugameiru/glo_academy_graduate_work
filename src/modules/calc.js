import accordeonMoving from './accordeonMoving.js';


const calc = () => {
    const accordion = document.getElementById('accordion'),
        allSelectors = accordion.querySelectorAll('select'),
        allSwitches = accordion.querySelectorAll('.onoffswitch-checkbox'),
        selectBoxes = accordion.querySelectorAll('.select-box'),
        titleTextes = accordion.querySelectorAll('.title-text'),
        allLinks = accordion.querySelectorAll('a'),
        distance = accordion.querySelectorAll('input')[2],
        total = document.getElementById('calc-result'),
        submitParentDiv = document.getElementById('collapseFour'),
        submitButton = submitParentDiv.querySelector('button.construct-btn');
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
            sizesAndNumbers[i] = realSizesAndNumbers[i][item.selectedIndex];
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
    distance.addEventListener('input', () => {
        if (distance.value != '') {
            calcData.distance = distance.value;
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
        allSelects();
    });

};

export default calc;