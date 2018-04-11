 (function() {
        const body = document.querySelector('body');
        const menu = document.querySelector('.navigation__toggle');
        menu.addEventListener('click', () => {
            if(body.classList.contains('navigation--active')) body.classList.remove('navigation--active');
            else body.classList.add('navigation--active');
        });


        const links = document.querySelectorAll('.navigation__link[href^="#"]');
        const speed = 500;
        const movingFreq = 15;
       
        links.forEach(link => link.addEventListener('click', function(e) {
            e.preventDefault();
            let href;
            if(this.getAttribute('href').length>1)
            {
                href = this.getAttribute('href').toString();
            } else {
                return;
            }
            const targetElement = document.getElementById(href.slice(1));
            const documentScroll = window.scrollY;
            const targetElementOffset = targetElement.offsetTop;
            const stepCount = Math.floor(speed/movingFreq);
            const stepCountGap = (targetElementOffset - documentScroll)/stepCount;
          
            for (var i = 1; i <= stepCount; i++)
            {
                (function()
                {
                    let stepPosition = stepCountGap * i;
                    setTimeout(() => window.scrollTo(0, stepPosition + documentScroll), movingFreq * i);
                })();
            }
        }));
 })();