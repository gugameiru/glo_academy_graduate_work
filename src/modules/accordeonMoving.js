

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

export default accordeonMoving;