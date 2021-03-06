(function($){

    /*! Tiny Pub/Sub - v0.7.0 - 2013-01-29
     * https://github.com/cowboy/jquery-tiny-pubsub
     * Copyright (c) 2013 "Cowboy" Ben Alman; Licensed MIT */
    (function(n){var u=n({});n.subscribe=function(){u.on.apply(u,arguments)},n.unsubscribe=function(){u.off.apply(u,arguments)},n.publish=function(){u.trigger.apply(u,arguments)}})(jQuery);

    var App = window.App || {};
    var resizeTimeout = null;

    function verticalCenter(){
        $('.vertical-center').each(function(){
            var $this = $(this);
            var $parent = $this.parent();
            var pos = $this.css('position');

            $this.css({
                position: pos == 'static' ? 'relative' : pos
                , top: $parent.height() / 2 - $this.height() / 2
            })
        });
    }

    $.subscribe('delayed-resize', verticalCenter);

    $(window)
        .on('load', function(){
             verticalCenter();
        })
        .on('resize', function(){
            clearTimeout(resizeTimeout);

            resizeTimeout = setTimeout(function(){
                $.publish('delayed-resize')
            }, 100);
        });

    $(function(){
      $('.view-all').one('click', function(){
        var $this = $(this);
        var $reveal = $this.parents('.box-grid').find('.slide-down');
        $reveal.slideDown(300);
        $this.fadeOut(300);
      });

    });


    // config videojs
    videojs.options.flash.swf = "/flash/video-js.swf";



    window.App = App;

}(jQuery));