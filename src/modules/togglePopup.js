import clearForm from './clearForm.js';
import setOpacity from './setOpacity.js';

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

    const form = popup.querySelector('form');

    clearForm(form);

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
    return;    
};

export default togglePopup;