function ControllerDrag() {
    var model_tools = new Model_tools(),
        model_drag = new Model_drag(),
        div_time,
        div_container;

    this.init = function() {
        div_time = document.getElementById("time");
        div_container = document.getElementById("container");

        model_tools.bind(div_container, 'contextmenu', function(e) {
            model_tools.preventDefault(e);
        });

        model_tools.bind(div_container, 'mousedown', drag);

    }

    function drag(event) {
        var self = this,
        //нормализированный объект события
            e = model_tools.fixEvent(event),
        //координаты элемента
            coords = model_drag.getCoords(this),
        //позиционирование мышки на элементе
            shiftX = e.pageX - coords.left,
            shiftY = e.pageY - coords.top;

        model_tools.opasity(this, {start: 1, end: 0.6, time: 100});
        //перерисовка элемента в абсолютных координатах
        this.style.position = 'absolute';
        document.body.appendChild(this);
        moveAt(e);

        this.style.zIndex = 1000;

        function moveAt(e) {
            self.style.left = e.pageX - shiftX + 'px';
            self.style.top = e.pageY - shiftY+ 'px';
        }

        document.onmousemove = function(e) {
            e = model_tools.fixEvent(e);
            moveAt(e);
        };

        //drop
        this.onmouseup = function() {
            model_tools.opasity(this, {start: 0.6, end: 1, time: 100});
            document.onmousemove = self.onmouseup = null;
        };
    }
}