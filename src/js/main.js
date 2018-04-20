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
        document.querySelector('.home').classList.add('home--active');
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

    const body = document.querySelector('body');
        const menu = document.querySelector('.navigation__toggle');
        menu.addEventListener('click', () => {
            if(body.classList.contains('navigation--active')) body.classList.remove('navigation--active');
            else body.classList.add('navigation--active');
        });

    // animations
    const gallery = document.querySelector('.gallery');
    const form = document.querySelector('.form');
    const skills = document.querySelector('.about__skills');
    const titles = document.querySelectorAll('.section__title');
    const contactText = document.querySelector('.contact__container');
    const aboutWho = document.querySelector('.about__who');
     window.addEventListener('scroll', function(e) {
        const galleryCoords =  offset(gallery);
        const formCoords =  offset(form);
        const skillsCoords =  offset(skills);
        const contactTextCoords =  offset(contactText);
        const aboutWhoCoords =  offset(aboutWho);
        if(window.scrollY > galleryCoords.top - window.innerHeight*1) {
            document.querySelectorAll('.gallery__item').forEach(item => item.classList.add('gallery__item--active'));
        }
        if(window.scrollY> formCoords.top - window.innerHeight) form.classList.add('form--active');
        if(window.scrollY> skillsCoords.top - window.innerHeight) {
            document.querySelectorAll('.about__hexagon').forEach(hexagon => hexagon.classList.add('about__hexagon--active'));
        }
        
        titles.forEach(title => {
            const titlesCoord = offset(title);
            if(window.scrollY > titlesCoord.top - window.innerHeight) {
                title.classList.add('section__title--active');
            }
        });

        if(window.scrollY > contactTextCoords.top - window.innerHeight) {
            contactText.classList.add('contact__container--active');
        }

        if(window.scrollY > aboutWhoCoords.top - window.innerHeight) {
            aboutWho.classList.add('about__who--active');
        }
     });
    
    function offset(el) {
        const rect = el.getBoundingClientRect()
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    
})(jQuery);