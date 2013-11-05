function Model_tools() {
    var self = this;
    this.preventDefault = function(event) {

        if (event.preventDefault) { //Для всех человеческих браузеров
            event.preventDefault();
        } else { //для IE<9
            event.returnValue = false;
        }
    };

    this.bind = function(domNode, eventName, handler) {
        //обертка для переданной ф-ции, которая добавляет в контекст вызова ф-ции кроссбраузерное событие
        var handlerWrapper = function(event) { //
            event = self.fixEvent(event);
            return handler.call(domNode, event);
        };

        //кроссбраузерное навешивание события
        if (domNode.addEventListener) {
            domNode.addEventListener(eventName, handlerWrapper, false);
        } else if (domNode.attachEvent) {
            domNode.attachEvent('on' + eventName, handlerWrapper);
        }
        return handlerWrapper;
    };

    this.fixEvent = function(e) {
        var html = document.documentElement,
            body = document.body;

        e = e || window.event;

        //добавление стандартных свойств: target, pageX/pageY, which
        if (!e.target) e.target = e.srcElement;

        if (e.pageX == null && e.clientX != null ) { // если нет pageX..


            e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0);
            e.pageX -= html.clientLeft || 0;

            e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0);
            e.pageY -= html.clientTop || 0;
        }

        if (!e.which && e.button) {
            e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) )
        }

        return e;
    };

    this.opasity = function(element, param_obj) {
        if(param_obj.start > 1 && param_obj.end > 1) {
            param_obj.start /= 100;
            param_obj.end /= 100;
        }
        var appear_disappear = (param_obj.end > param_obj.start),
            curent_opasity = param_obj.start,
            delta_opasity = 0.01,
            delta_time = Math.abs(Math.round(param_obj.time / ((param_obj.end - param_obj.start) / delta_opasity))),
            timer_handler;

        element.style.opacity = param_obj.start;
        element.style.filter='alpha(opacity='+param_obj.start*100+')';
        timer_handler = setInterval(function() {

            curent_opasity = appear_disappear ? curent_opasity + delta_opasity : curent_opasity - delta_opasity;
            element.style.opacity = curent_opasity;
            element.style.filter='alpha(opacity='+curent_opasity*100+')';

            if(appear_disappear) {
                if(curent_opasity >= param_obj.end) {
                    clearInterval(timer_handler);
                }
            } else {
                if(curent_opasity <= param_obj.end) {
                    clearInterval(timer_handler);
                }
            }
        }, delta_time);
    };

    return this;
}