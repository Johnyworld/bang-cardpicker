window.onload = function() {
    ( function bangPickCard() {

        var shapesArr = [ 'heart', 'club', 'spade', 'diamond' ];
        var numberArr = [ 'A', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K' ];
        
        var canClick = true;
        
        var shape = document.getElementById('shape');
        var number = document.getElementById('number');
        var loading = document.getElementById('loading');
        var loadings = loading.children;
        var bangBtn = document.getElementById('bang-roll-button');
        var startCover = document.getElementById('cover');
        var startBtn = document.getElementById('bang-start-button');
        

        function rollCard() {
            var resultShape = Math.floor( Math.random()*shapesArr.length );
            var resultNumber = Math.floor( Math.random()*numberArr.length );
            shape.className = ' ';
            shape.classList.add(shapesArr[resultShape]);
            number.innerHTML = numberArr[resultNumber];
        }
        
        function fadeOut(ele, ms) {
            var opacity = 1;
            var time = 10 / ms;
            var animate = setInterval ( frame, 10 );
            function frame() {
                if ( opacity <= 0 ) {
                    clearInterval(animate);
                } else {
                    opacity = opacity - time;
                    ele.style.opacity = opacity;
                }
            }
        }
        
        function fadeIn(ele, ms) {
            var opacity = 0;
            var time = 10 / ms;
            var animate = setInterval ( frame, 10 );
            function frame() {
                if ( opacity >= 1 ) {
                    clearInterval(animate);
                } else {
                    opacity = opacity + time;
                    ele.style.opacity = opacity;
                }
            }
        }

        function loadingAnimate(ele) {
            for ( var i=0; i<ele.length; i++ ) {
                (function(x) {
                    var delayIn = 500 * x;
                    var delayOut = 1300 + x * 200;
                    setTimeout( function() {
                        fadeIn(ele[x], 500);
                    }, delayIn);
                    setTimeout( function() {
                        fadeOut(ele[x], 500);
                    }, delayOut);
                })(i);
            }
        }
        
        function rollAnimation(isStart) {
            if ( isStart != 'start' ) {
                setTimeout( function() { fadeOut(shape, 500); }, 0);
                setTimeout( function() { fadeOut(number, 500); }, 0);
            }
            setTimeout( function() { rollCard(); }, 1000);
            setTimeout( function() { loadingAnimate(loadings); }, 500 );
            setTimeout( function() { fadeIn(shape, 500); }, 2500);
            setTimeout( function() { fadeIn(number, 500); }, 2500);
            setTimeout( function() { canClick = true; }, 3000);
        }
        
        function reDraw() {
            if ( canClick === true ) {
                canClick = false;
                rollAnimation();
            }
        }
        
        function startDraw() {
            if ( canClick === true ) {
                canClick = false;
                fadeOut( startCover, 700 );
                setTimeout( function(){ startCover.style.display = 'none'; }, 700 );
                rollAnimation('start');
            }
        }
        
        startBtn.addEventListener( 'click', startDraw );
        bangBtn.addEventListener( 'click', reDraw );
        
    }()); 
};