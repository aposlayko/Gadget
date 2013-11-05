"use strict";
var controller_time = new ControllerTime(),
    controller_drag = new ControllerDrag();
document.onreadystatechange = function() {
    if(this.readyState === "complete") {
        //runner
        controller_time.init();
        controller_drag.init();
    }
};