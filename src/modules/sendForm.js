import clearForm from './clearForm.js';

const sendForm = (form) => {
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        inputErrorMessage = 'Ошибка ввода',
        userName = form.querySelector('input[name="user_name"]'),
        userPhone = form.querySelector('input[name="user_phone"]'),
        successMessage = 'Спасибо! Ожидайте звонка нашего менеджера',
        userQuestion = document.getElementsByName('user_quest'),
        url = './server.php';

    const statusMessage = document.createElement('div');
    statusMessage.className = 'status';
    statusMessage.style.cssText = 'font-size: 2rem;';  
    
    
     
    //Создание ТОЛЬКО ОДНОГО поля со статусом
    if (!form.querySelector('.status')) {
        form.appendChild(statusMessage);
        // statusMessage.textContent = loadMessage;
        setTimeout(() => {
            form.removeChild(statusMessage);
        }, 4000);
    }

    //Валидация ввода имени и номера телефона
    if (userName) {
        if (!(userName.value.match(/[а-яёА-ЯЁ\s]/g))){
            statusMessage.textContent = inputErrorMessage;
            return;
        }
    }

    if (userPhone) {
        if (!(userPhone.value.match(/[0-9]/g))) {
            statusMessage.textContent = inputErrorMessage;
            return;
        }
    }

    statusMessage.textContent = loadMessage;
    
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

export default sendForm;