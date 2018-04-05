 (function() {
        const body = document.querySelector('body');
        const menu = document.querySelector('.navigation__toggle');
        menu.addEventListener('click', () => {
            if(body.classList.contains('navigation--active')) body.classList.remove('navigation--active');
            else body.classList.add('navigation--active');
        });
 })();