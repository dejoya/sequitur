(function($){




    $(function(){

        var 
            $sections = $('section'),
            $header = $('#site-header'),
            $body = $('body'),
            $window = $(window),
            $studioVideo = $('#studio-video');

        resizeVideo();
        playVideo();

        $.subscribe('hash-change', function(e, hash){

            var $target = $sections.filter(function(){
                return $(this).data('id') ==  hash
            });

            if ($target.length == 1){
                
                $.smoothScroll({
                    scrollTarget: $target,
                    offset: -parseInt($body.css('paddingTop'))
                })
            }
        });

        $.subscribe('delayed-resize', resizeVideo);
        $window.on('scroll', playVideo);

        function playVideo(){
            // check to see if it is in view
            var scrollTop = $window.scrollTop();
            var videoTop = $studioVideo.offset().top;
            var winHeight = $window.height();
            var videoHeight = $studioVideo.height();
            
            if (scrollTop + winHeight >= videoTop && scrollTop <= videoTop + videoHeight){
                $studioVideo.get(0).play();
            }
            else {
                $studioVideo.get(0).pause();
            }

        }

        function resizeVideo(){
            $studioVideo.width($window.width());
        }

        // carousel setups

        $('#hero .owl-carousel').owlCarousel({
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem:true,
            pagination: true
        });

        $('#how-were-different .owl-carousel').owlCarousel({
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem:true,
            pagination: false,
            navigation: true,
            navigationText: false,
            rewindNav: false
        });

        

    });

}(jQuery));
