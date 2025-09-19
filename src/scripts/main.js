export function setNavBorder() {
  const mainNavList = document.getElementById('mainNavList');
  const mainNavItems = mainNavList.querySelectorAll('.main-header__item--link');
  mainNavItems.forEach(item => {
    item.addEventListener('click', function() {
      const selectedItemId = item.id;
      localStorage.setItem('activeMenuItem', selectedItemId);
      mainNavItems.forEach(li => li.classList.remove('activated'));
      this.classList.add('activated');
    });
  });
}

export function setNavItems() {
  window.addEventListener('load', () => {
    const activeMenuItemId = localStorage.getItem('activeMenuItem');
    if (activeMenuItemId) {
      const activeItem = document.getElementById(activeMenuItemId);
      if (activeItem) {
        activeItem.classList.add('activated');
      }
    }
  });
}

export function setNavLinks() {
  window.addEventListener('scroll', () => {
    document.querySelectorAll('section').forEach((sec) => {
      let menuLink = document.querySelector(`.main-header__item--link[href="#${sec.id}"]`);
      if (window.scrollY >= sec.offsetTop && window.scrollY < sec.offsetTop + sec.offsetHeight) {
        menuLink.classList.add('activated');
      } else {
        menuLink.classList.remove('activated');
      }
    });
  });
}

export function setSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const startPosition = window.scrollY; // Начальная позиция скролла
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 600;
        let startTime = null;

        function animation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1); // Прогресс анимации от 0 до 1

          window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

          if (progress < 1) {
            requestAnimationFrame(animation); // Запланировать следующий кадр
          }
        }

        function easeInOutQuad(t) {
          return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        }
        requestAnimationFrame(animation);
      }
    });
  });
}
