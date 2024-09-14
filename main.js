// Навигация и плавная прокрутка
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list li a');
    const btnScroll = document.querySelector('.btn');

    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Плавная прокрутка
    const smoothScroll = function(targetEl, duration) {
        const headerElHeight = document.querySelector('.navbar').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;

        const ease = function(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animation = function(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition - startPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);
    };

    const scrollTo = function() {
        const links = document.querySelectorAll('.nav-list li a, .btn');
        links.forEach(each => {
            each.addEventListener('click', function(e) {
                e.preventDefault();
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 800);
            });
        });
    };
    scrollTo();
});
