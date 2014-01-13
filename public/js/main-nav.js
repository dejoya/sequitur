(function ($) {

    'use strict';

    var MainNav = function () {

        var $nav, $header,
            isOpen = false,
            locked = false,
            lockTimeout = null,
            eventName = Modernizr.touch ? 'touchstart' : 'click',
            headroom;



        return {
            init: init,
            close: close,
            open: open
        }

        function init() {
            $nav = $('#main-nav');
            $header = $('#site-header');

            headroom = new Headroom($header.get(0),
              {
                tolerance: 1,
                offset: 50,
                classes: {
                initial: "animated",
                  pinned: "slide-down",
                  unpinned: "slide-up"
                }
            });

            headroom.init();

            $header.on(eventName, '.main-nav-toggle', function (e) {
                if (isOpen) {
                    close();
                }
                else {
                    e.stopPropagation();
                    open();
                }
            });

            $nav.on(eventName, 'a', function (e) {
                close();
                var $this = $(this);
                if (!$this.hasClass('active')){
                    $nav.find('.active').removeClass('active');
                    $this.addClass('active');
                    // added in for touchstart
                    window.location = $this.attr('href');
                }
                
            });

            $(document).on('click touchstart', function(){
                if ($(window).scrollTop() > $header.height()){
                    headroom.unpin();
                }
            })
        }

        function close() {
            if (isOpen) {
                lock();
                isOpen = false;
                $('html').removeClass('no-scroll');
                $header.removeClass('nav-open');
                $nav.removeClass('open two-col');
                
                unlock();
            }
        }

        function open() {
            if (!isOpen) {
                lock();
                isOpen = true;
                $('html').addClass('no-scroll');

                if ($(window).height() < $nav.find('ul').outerHeight() + $header.outerHeight()){
                    $nav.addClass('two-col');
                }

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
