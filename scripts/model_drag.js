function Model_drag() {
    this.getCoords = function(elem) {
        var box = elem.getBoundingClientRect(),
            body = document.body,
            docElem = document.documentElement,
        //прокрутка страницы
            scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
            scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
        //в IE документ может быть смещен относительно левого верхнего угла
            clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,
        //координаты + прокрутка - смещение
            top  = box.top +  scrollTop - clientTop,
            left = box.left + scrollLeft - clientLeft;

        return { top: Math.round(top), left: Math.round(left) };
    };
}
