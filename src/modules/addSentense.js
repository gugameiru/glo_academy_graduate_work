const addSentense = (target) => {
    const actionBlocks = document.querySelector('.text-center>.row').children;

    Array.from(actionBlocks).forEach(function(element) {
            element.className = 'col-xs-12 col-sm-6 col-md-4';
    });

    target.style.display = 'none';

    return;
};

export default addSentense;