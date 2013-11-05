function ControllerTime() {
    var model_tools = new Model_tools(),
        model_time = new Model_time(),
//        model_drag = new Model_drag(),
        div_time,
        div_container;

    this.init = function() {
        div_time = document.getElementById("time");
        div_container = document.getElementById("container");

        model_tools.bind(div_container, 'contextmenu', function(e) {
            model_tools.preventDefault(e);
        });

        model_tools.bind(div_time, 'click', function() {
            model_time.changeTimeFormat();
            displayTime();
        });
        model_tools.bind(div_time, 'contextmenu', function() {
            model_time.toogleDate();
            displayTime();
        });

        displayTime();
        setInterval(displayTime, 1000);
    };

    function displayTime() {
        div_time.innerHTML = model_time.getTime();
    }

    return this;
}