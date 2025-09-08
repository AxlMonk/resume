export function setNavBorder() {
  const mainNavList = document.getElementById('mainNavList');
  const mainNavItems = mainNavList.querySelectorAll('li');
  mainNavItems.forEach(item => {
    item.addEventListener('click', function() {
      mainNavItems.forEach(li => li.classList.remove('activated'));
      this.classList.add('activated');
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
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY; // Позиция цели
        const distance = targetPosition - startPosition; // Общая дистанция для прокрутки
        const duration = 600; // Длительность анимации в миллисекундах
        let startTime = null;

        function animation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1); // Прогресс анимации от 0 до 1

          // Вычисляем текущую позицию прокрутки с использованием easing-функции
          window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

          if (progress < 1) {
            requestAnimationFrame(animation); // Запланировать следующий кадр
          }
        }
        // Простая easing-функция (например, easeInOutQuad)
        function easeInOutQuad(t) {
          return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        }
        requestAnimationFrame(animation); // Начать анимацию
      }
    });
  });
}