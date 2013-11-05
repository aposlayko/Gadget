function Model_time() {
    var display_seconds = false,
        display_date = false;

    this.changeTimeFormat = function() {
        display_seconds = !display_seconds;
    };

    this.toogleDate = function() {
        display_date = !display_date;
    };

    this.getTime = function() {
        var time = new Date(),
            result = '';

        if(display_seconds && display_date) {
            result = time.format("HH:MM:ss<br/>yyyy mmmm dd");
        } else if(display_seconds && !display_date) {
            result = time.format("HH:MM:ss");
        } else if(!display_seconds && display_date){
            result = time.format("HH:MM<br/>yyyy mmmm dd");
        } else {
            result = time.format("HH:MM");
        }

        return result;
    };

    return this;
}