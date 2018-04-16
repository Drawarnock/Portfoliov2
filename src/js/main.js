//  (function() {
//         const body = document.querySelector('body');
//         const menu = document.querySelector('.navigation__toggle');
//         menu.addEventListener('click', () => {
//             if(body.classList.contains('navigation--active')) body.classList.remove('navigation--active');
//             else body.classList.add('navigation--active');
//         });


//         const links = document.querySelectorAll('.navigation__link[href^="#"]');
//         const speed = 500;
//         const movingFreq = 15;
       
//         links.forEach(link => link.addEventListener('click', function(e) {
//             e.preventDefault();
//             let href;
//             if(this.getAttribute('href').length>1)
//             {
//                 href = this.getAttribute('href').toString();
//             } else {
//                 return;
//             }
//             const targetElement = document.getElementById(href.slice(1));
//             const documentScroll = window.scrollY;
//             const targetElementOffset = targetElement.offsetTop;
//             const stepCount = Math.floor(speed/movingFreq);
//             const stepCountGap = (targetElementOffset - documentScroll)/stepCount;
          
//             for (var i = 1; i <= stepCount; i++)
//             {
//                 (function()
//                 {
//                     let stepPosition = stepCountGap * i;
//                     setTimeout(() => window.scrollTo(0, stepPosition + documentScroll), movingFreq * i);
//                 })();
//             }
//         }));
//  })();

(function($) {
    
    const $nav = $('.navigation');
    const $navOffsetY = $nav.offset().top;
    const $innerAnchors = $('a[href^="#"]');
    
    $(document).ready(function() {
        particlesJS.load('particles-js', 'particles.json');
        let stickyNav = function() {
            let $scrolled = $(window).scrollTop();
            if ($scrolled > $navOffsetY) $nav.addClass('navigation--sticky');
            else $nav.removeClass('navigation--sticky');
        }
       
        if ($innerAnchors.length > 0) {
                $innerAnchors.on('click', function(e) {
                e.preventDefault();
                const href= $(this).attr('href');
                const $targetElement = $(href); 
                const targetToScroll = $targetElement.offset().top ;
                $('html, body').animate({
                    scrollTop:targetToScroll
                }, 1000);
            });
        }
        stickyNav();
        $(window).scroll(function() {
            stickyNav();
        });
    });
    
    
})(jQuery);