(function(){

    'use strict';

    var currentHash = '';

    function checkHash(){
        var hash = document.location.hash;

        if (hash.length > 0 && hash.substr(1) != currentHash){
            currentHash = hash.substr(1);

            $.publish('hash-change', [currentHash]);
        }
    }

    setInterval(checkHash, 100);

}());
