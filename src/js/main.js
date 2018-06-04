(function($) {

    $(document).ready(function() {
        var $nav = $('.navigation');
        var $navOffsetY = $nav.offset().top;
        var $innerAnchors = $('a[href^="#"]');
        var $form = $('.form');
        var $formMessages = $('.contact__messages');
        var $body = $('body');
        var $navigationToggle = $('.navigation__toggle');

        document.querySelector('.home').classList.add('home--active');
        particlesJS.load('particles-js', 'particles.json');
        var stickyNav = function() {
            var $scrolled = $(window).scrollTop();
            if ($scrolled > $navOffsetY) $nav.addClass('navigation--sticky');
            else $nav.removeClass('navigation--sticky');
        }
       
        if ($innerAnchors.length > 0) {
                $innerAnchors.on('click', function(e) {
                e.preventDefault();
                $body.removeClass('navigation--active');
                var href= $(this).attr('href');
                var $targetElement = $(href); 
                var targetToScroll = $targetElement.offset().top ;
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
                height: $form.innerHeight() + 'px',
                width: $('.form__input').innerWidth() + 'px',
                top: document.querySelector('.form').offsetTop, // need realtive offset parent
                left: (($(window).width() - $('.form__input').outerWidth()) / 2) + 'px'
            });
        }
        modalDim();
        $(window).on('resize', modalDim);
        $form.submit(function(e) {
            e.preventDefault();
            var formData = $form.serialize();
            $.ajax({
                async: true,
                type: 'POST',
                url: $form.attr('action'),
                data: formData
            }).done(function(response) {
                $formMessages.removeClass('contact__messages--error');
                $formMessages.addClass('contact__messages--success');
                $formMessages.html(response);
                $('.contact__modal')
                    .addClass('contact__modal--active')
                    .on('animationend', function() {
                        $(this).removeClass('contact__modal--active');
                        $('.form__input').val('');
                        $('.form__message').val('');
                    }); 
               
            }).fail(function(data) {
                $formMessages.removeClass('contact__messages--success');
                $formMessages.addClass('contact__messages--error');
                $('.contact__modal')
                    .addClass('contact__modal--active')                  
                    .on('animationend', function() {
                        $(this).removeClass('contact__modal--active');
                    });
                if (data.responseText !== '') {
                    $formMessages.html("<i class='icon-cancel-circled'></i>" + data.responseText);
                } else {
                    $formMessages.html('Przepraszam! Wystąpił błąd nie można wysłać twojej wiadomości');
                }
            });
        });

    $navigationToggle.on('click', function() {
        if($body.hasClass('navigation--active')) $body.removeClass('navigation--active');
        else $body.addClass('navigation--active');
    });

// animations
const gallery = document.querySelector('.gallery');
const contactForm = document.querySelector('.form');
const skills = document.querySelector('.about__skills');
const titles = document.querySelectorAll('.section__title');
const contactText = document.querySelector('.contact__container');
const aboutWho = document.querySelector('.about__who');

function offset(el) {
    const rect = el.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

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
    });
})(jQuery);