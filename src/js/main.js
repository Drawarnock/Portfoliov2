 (function() {
    const navigationCheckbox = document.querySelector('.navigation__checkbox');
    const links = document.querySelectorAll('.linkForScroll');
    const backdrop = document.querySelector('.backdrop');
    const modal = document.querySelector('.modal');
    const form = document.querySelector('.form');
    const formMessages = document.querySelector('.modal__messages');
    const cardLeft = document.querySelector('.big-card__left-part');
    const cardRight = document.querySelector('.big-card__right-part');
    const gallery = document.querySelector('.gallery');
    const galleryItems = document.querySelectorAll('.gallery__item');
    const featureCard = document.querySelectorAll('.feature-card');
    const header = document.querySelector('.header');
    const secondaryTitles = document.querySelectorAll('.heading-2');

    links.forEach(link => link.addEventListener('click', function(e) {
        navigationCheckbox.checked = false;
        smoothScroll(e);
    }));

    backdrop.addEventListener('click', function(e) {

        if(e.target === backdrop) { 
            modal.classList.remove('modal--active');
            backdrop.classList.remove('backdrop--active');
        }
        else { return; }

    }, true);
   
    document.addEventListener('DOMContentLoaded', function() {
        header.classList.add('header--hidden');
        secondaryTitles.forEach(title => title.classList.add('heading-2--hidden'));
        form.classList.add('form--hidden');
        cardLeft.classList.add('big-card__left-part--hidden');
        cardRight.classList.add('big-card__right-part--hidden');
        galleryItems.forEach(item => item.classList.add('gallery__item--hidden'));
        featureCard.forEach((item, index) => item.classList.add(`feature-card--${index+1}--hidden`));
        form.classList.add('form--hidden');
    });

    window.addEventListener('load', function() {

        header.classList.remove('header--hidden');

        window.addEventListener('scroll', function() {

            transitionElementOnScroll([
                { element: secondaryTitles },
                { element: cardLeft },
                { element: cardRight },
                { element: featureCard}]);
            
            if(window.pageYOffset > getElementPosition(gallery).top - window.innerHeight) {
                galleryItems.forEach(item => item.classList.remove('gallery__item--hidden'));
            }

            if(window.pageYOffset > getElementPosition(form).top - window.innerHeight) {
                form.classList.remove('form--hidden');
                form.classList.add('form--animate');
            }
        });
    });

    function smoothScroll(e) {
        e.preventDefault();
        let href;
        let anchorEl = e.target
        if(!anchorEl.hasAttribute('href')) anchorEl=e.target.parentNode;

        if(anchorEl.getAttribute('href').length<2 && anchorEl.indexOf.href('#') === -1 ) return;
        else href = anchorEl.getAttribute('href')
        
        const targetElement = document.querySelector(href);
        const targetElementOffset = targetElement.offsetTop;
        const documentPosition = window.pageYOffset;
        const distanceToScroll = targetElementOffset - documentPosition;
        const duration = 1000;
        let start = null;

        function easeInOutCubic(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t + b;
            t -= 2;
            return c/2*(t*t*t + 2) + b;
        };
        
        function scrollAnimate(timestamp) {
            if(start === null) start=timestamp;
            let timeElapsed = timestamp - start;
            const easing = easeInOutCubic(timeElapsed, documentPosition, distanceToScroll, duration);
            window.scrollTo(0, easing);
            if(timeElapsed < duration) window.requestAnimationFrame(scrollAnimate);
        }
        window.requestAnimationFrame(scrollAnimate);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData();
        const data = new URLSearchParams(new FormData(form));

        fetch('./contact.php', {
            method: "post",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: data
        })
        .then(res => {
            backdrop.classList.add('backdrop--active');

            if(res.status === 200) {
                formMessages.classList.remove('modal__messages--error');
                formMessages.classList.add('modal__messages--success');
                form.reset();
            } else {
                formMessages.classList.remove('modal__messages--success');
                formMessages.classList.add('modal__messages--error');
            }
            return res.text();
        })
        .then(data => {
            formMessages.innerHTML = data;
            modal.classList.add('modal--active');
        })
        .catch(err => {
            console.log(err);
        })
    });

    function getElementPosition(el) {
        const rect = el.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        return { 
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft 
        }
    }

    function isNodeList(nodes) {
        const result = Object.prototype.toString.call(nodes);
   
        if (result === '[object HTMLCollection]' || result === '[object NodeList]') {
            return true;
        }
    }

    function transitionElementOnScroll(objArr) {

        objArr.forEach( (item, i) => {

            if(isNodeList(item.element)) {
                item.element.forEach( el => {
                 
                    if(window.pageYOffset > getElementPosition(el).top - window.innerHeight*0.95) {
                        el.classList.forEach( className => {
                            if(className.includes('hidden')) {
                                el.classList.remove(className);
                            }
                        });
                    }
                })

            } else {
                if(window.pageYOffset > getElementPosition(item.element).top - window.innerHeight*0.95) {
                    item.element.classList.forEach( className => {
                        if(className.includes('hidden')) {
                            item.element.classList.remove(className);
                        }
                    });
                }
            }
        })
    }

 })();