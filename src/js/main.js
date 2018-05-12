(function($) {
    
    const $nav = $('.navigation');
    const $navOffsetY = $nav.offset().top;
    const $innerAnchors = $('a[href^="#"]');
    var form = $('.form');
    var formMessages = $('.contact__messages');
    
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
                $('body').removeClass('navigation--active');
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

        function modalDim() {
            $('.contact__modal').css({
                height: form.innerHeight() + 'px',
                width: $('.form__input').innerWidth() + 'px',
                top: document.querySelector('.form').offsetTop,
                left: (($(window).width() - $('.form__input').outerWidth()) / 2) + 'px'
            });
        }
        modalDim();
        $(window).on('resize', modalDim);
        // ajax form
        form.submit(function(e) {
            e.preventDefault();
            var formData = $(form).serialize();
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            }).done(function(response) {
                console.log('done callback');
                $(formMessages).removeClass('contact__messages--error');
                $(formMessages).addClass('contact__messages--success');
                $(formMessages).html(response);
                $('.contact__modal')
                    .addClass('contact__modal--active')
                    .on('animationend', function() {
                        $(this).removeClass('contact__modal--active');
                        $('.form__input').val('');
                        $('.form__message').val('');
                    }); 
               
            }).fail(function(data) {
                console.log('something');
                $(formMessages).removeClass('contact__messages--success');
                $(formMessages).addClass('contact__messages--error');
                $('.contact__modal')
                    .addClass('contact__modal--active')                  
                    .on('animationend', function() {
                        $(this).removeClass('contact__modal--active');
                    });
                if (data.responseText !== '') {
                    $(formMessages).html("<i class='icon-cancel-circled'></i>" + data.responseText);
                } else {
                    $(formMessages).html('Oops! An error occured and your message could not be sent.');
                }
            });
        });

         // open mobile nav
    const body = document.querySelector('body');
    const menu = document.querySelector('.navigation__toggle');
    menu.addEventListener('click', () => {
        if(body.classList.contains('navigation--active')) body.classList.remove('navigation--active');
        else body.classList.add('navigation--active');
    });

// animations
const gallery = document.querySelector('.gallery');
const contactForm = document.querySelector('.form');
const skills = document.querySelector('.about__skills');
const titles = document.querySelectorAll('.section__title');
const contactText = document.querySelector('.contact__container');
const aboutWho = document.querySelector('.about__who');
window.addEventListener('scroll', function(e) {
    const galleryCoords =  offset(gallery);
    const formCoords =  offset(contactForm);
    const skillsCoords =  offset(skills);
    const contactTextCoords =  offset(contactText);
    const aboutWhoCoords =  offset(aboutWho);
    if(window.scrollY > galleryCoords.top - window.innerHeight) {
        document.querySelectorAll('.gallery__item').forEach(item => item.classList.add('gallery__item--active'));
    }
    if(window.scrollY > formCoords.top - window.innerHeight) contactForm.classList.add('form--active');
    if(window.scrollY > skillsCoords.top - window.innerHeight) {
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
    });
})(jQuery);