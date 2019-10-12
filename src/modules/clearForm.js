const clearForm = (form) => {
    let elementsForm = [...form.elements].filter(item => { 
        return item.tagName.toLowerCase() !== 'button' && item.type != 'button';
    });

    elementsForm.forEach(elem => {
        elem.value = '';
        
    });
    return;
};

export default clearForm;