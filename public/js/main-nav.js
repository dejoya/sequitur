(function ($) {

    'use strict';

    var MainNav = function () {

        var $nav, $header,
            isOpen = false,
            locked = false,
            lockTimeout = null,
            eventName = Modernizr.touch ? 'touchstart' : 'click';



        return {
            init: init,
            close: close,
            open: open
        }

        function init() {
            $nav = $('#main-nav');
            $header = $('#site-header');

            var headroom = new Headroom($header.get(0),
              {
                "tolerance": 5,
                "offset": 50,
                "classes": {
                "initial": "animated",
                  "pinned": "slide-down",
                  "unpinned": "slide-up"
                }
            });

            headroom.init();

            $header.on(eventName, '.main-nav-toggle', function () {
                if (isOpen) {
                    close();
                }
                else {
                    open();
                }
            });

            $nav.on(eventName, 'a', function (e) {
                close();
                var $this = $(this);
                if (!$this.hasClass('active')){
                    $nav.find('.active').removeClass('active');
                    $this.addClass('active');
                }
                
            });

//            $('li', $nav).each(function (i) {
//                $(this).css('webkitTransitionDelay', (100 + 15 * i) + 'ms')
//            });
        }

        function close() {
            if (isOpen) {
                lock();
                isOpen = false;
                $header.removeClass('nav-open');
                $nav.removeClass('open');
                unlock();
            }
        }

        function open() {
            if (!isOpen) {
                lock();
                isOpen = true;
                $header.addClass('nav-open');
                $nav.addClass('open');
                unlock();
            }
        }

        function lock(){
            locked = true;
        }

        function unlock(){
            clearTimeout(lockTimeout);

            lockTimeout = setTimeout(function(){
                locked = false;
            }, 200);
        }
    };

    App.MainNav = new MainNav();

    $(function () {
        App.MainNav.init();
    });

}(jQuery));
