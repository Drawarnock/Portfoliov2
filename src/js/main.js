// (function() {

//     const links = document.querySelectorAll('a[href^="#"]');
//     const form = document.querySelector('.form');
//     const modal = document.querySelector('.modal');
//     const body = document.querySelector('body');
//     const formMessages = document.querySelector('.modal__messages');
//     const input = document.querySelector('.form__input');
//     const hexagons = document.querySelectorAll('.about__hexagon');

//     document.addEventListener('DOMContentLoaded', function() {
//         // titles.forEach(title => title.classList.add('heading-2--hidden'));
//         // document.querySelectorAll('.gallery__item').forEach(item => item.classList.add('gallery__item--hidden'));
//         // contactForm.classList.add('form--hidden');
//         // contactText.classList.add('contact__container--hidden');
//         // aboutWho.classList.add('about__who--hidden');
//         // hexagons.forEach(hexagon => hexagon.classList.add('about__hexagon--hidden'));
//     });

//     window.addEventListener('load', function() {
//         window.addEventListener('scroll', function() {
//             const galleryCoords =  offset(gallery);
//             const formCoords =  offset(contactForm);
//             const skillsCoords =  offset(skills);
//             const contactTextCoords =  offset(contactText);
//             const aboutWhoCoords =  offset(aboutWho);
            
//             if(window.pageYOffset > galleryCoords.top - window.innerHeight) {
//                 document.querySelectorAll('.gallery__item').forEach(item => item.classList.remove('gallery__item--hidden'));
//             }
//             if(window.pageYOffset > formCoords.top - window.innerHeight) {
//                 contactForm.classList.remove('form--hidden');
//                 contactForm.classList.add('form--animate');
//             }

//             if(window.pageYOffset > skillsCoords.top - window.innerHeight) {
//                 hexagons.forEach(hexagon => {
//                     hexagon.classList.add('about__hexagon--animate')
//                 });
//             }
            
//             titles.forEach(title => {
//                 const titlesCoord = offset(title);
//                 if(window.pageYOffset > titlesCoord.top - window.innerHeight) {
//                     title.classList.remove('heading-2--hidden');
//                 }
//             });
    
//             if(window.pageYOffset > contactTextCoords.top - window.innerHeight) {
//                 contactText.classList.remove('contact__container--hidden');
//             }
    
//             if(window.pageYOffset > aboutWhoCoords.top - window.innerHeight) {
//                 aboutWho.classList.remove('about__who--hidden');
//             }
//         });

//     });

//     links.forEach(link => link.addEventListener('click', function(e) {
//         smoothScroll(e);
//     }));

//     function smoothScroll(e) {
//         e.preventDefault();
//         let href;
//         let anchorEl = e.target
//         if(!anchorEl.hasAttribute('href')) anchorEl=e.target.parentNode;

//         if(anchorEl.getAttribute('href').length<2 && anchorEl.indexOf.href('#') === -1 ) return;
//         else href = anchorEl.getAttribute('href')
        
//         const targetElement = document.querySelector(href);
//         const targetElementOffset = targetElement.offsetTop;
//         const documentPosition = window.pageYOffset;
//         const distanceToScroll = targetElementOffset - documentPosition;
//         const duration = 1000;
        
//         let start = null;
        
//             function scrollAnimate(timestamp) {
//                         if(start === null) start=timestamp;
//                         let timeElapsed = timestamp - start;
//                         const easing = easeInOutCubic(timeElapsed, documentPosition, distanceToScroll, duration);
//                         window.scrollTo(0, easing);
//                         if(timeElapsed < duration) window.requestAnimationFrame(scrollAnimate);
//             }
//         window.requestAnimationFrame(scrollAnimate);
//     }

//     function easeInOutCubic(t, b, c, d) {
//         t /= d/2;
//         if (t < 1) return c/2*t*t*t + b;
//         t -= 2;
//         return c/2*(t*t*t + 2) + b;
//     };

//     function modalDim() {
//         modal.style.height = form.offsetHeight + 'px';
//         modal.style.width = input.offsetWidth + 'px';
//         modal.style.top = form.offsetTop + 'px';
//         modal.style.left = (window.innerWidth/2 - input.offsetWidth/2)  + 'px'
//     }

//     modalDim();
//     window.addEventListener('resize', modalDim);

//     form.addEventListener('submit', function(e) {
//         e.preventDefault();
//         const formData = new FormData();
//         const data = new URLSearchParams(new FormData(form));

//         fetch('./contact.php', {
//             method: "post",
//             header: {
//                 "Content-Type": "application/x-www-form-urlencoded"
//             },
//             body: data
//         })
//         .then(res => {
//             if(res.status === 200) {
//                 formMessages.classList.remove('modal__messages--error');
//                 formMessages.classList.add('modal__messages--success');
//                 form.reset();
//             } else {
//                 formMessages.classList.remove('modal__messages--success');
//                 formMessages.classList.add('modal__messages--error');
//             }
//             return res.text();
//         })
//         .then(data => {
            
//             formMessages.innerHTML = data;
//             modal.classList.add('modal--active');
//             modal.addEventListener('animationend', function() {
//                     this.classList.remove('modal--active');
//                 }); 
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     });
   
//     // animations
//     const gallery = document.querySelector('.gallery');
//     const contactForm = document.querySelector('.form');
//     const skills = document.querySelector('.about__skills');
//     const titles = document.querySelectorAll('.heading-2');
//     const contactText = document.querySelector('.contact__container');
//     const aboutWho = document.querySelector('.about__who');

//     function offset(el) {
//         const rect = el.getBoundingClientRect();
//         const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
//         const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//         return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
//     }

// })();