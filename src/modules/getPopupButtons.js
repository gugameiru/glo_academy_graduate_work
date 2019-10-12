import togglePopup from './togglePopup.js';
import addSentense from './addSentense.js';
import accordeonMoving from './accordeonMoving.js';
import sendForm from './sendForm.js';


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

        // Вызов отправки данных
        if ((target.type == 'submit') && (target.name == 'submit') && (target.tagName == 'BUTTON') && (target.className.indexOf('director-btn') == -1)) {
            target = target.closest('form');
            sendForm(target);    
        }

    });
};
export default getPopupButtons;