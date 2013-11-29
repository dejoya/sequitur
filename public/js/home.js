(function($){




    $(function(){

        var $sections = $('section');
        var $header = $('#site-header');
        var $body = $('body');

        $.subscribe('hash-change', function(e, hash){

            var $target = $sections.filter(function(){
                return $(this).data('id') ==  hash
            });

            if ($target.length == 1){
                console.log($header.outerHeight(true))
                $.smoothScroll({
                    scrollTarget: $target,
                    offset: -parseInt($body.css('paddingTop'))
                })
            }
        });

        $("#hero .owl-carousel").owlCarousel({
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem:true,
            pagination: true

        });

    });

}(jQuery));
