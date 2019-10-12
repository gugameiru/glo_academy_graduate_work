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

export default setOpacity;