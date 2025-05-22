document.addEventListener('DOMContentLoaded', () => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      const animatedButtons = document.querySelectorAll('.animated-btn');

      function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;

        animatedElements.forEach(element => {
          const elementHeight = element.offsetHeight;
          const elementTopPosition = element.offsetTop;
          const elementBottomPosition = elementTopPosition + elementHeight;

          if (elementBottomPosition >= windowTopPosition && elementTopPosition <= windowBottomPosition) {
            element.classList.add('visible');
          } else {
            element.classList.remove('visible');
          }
        });
      }

      animatedButtons.forEach(btn => {
        btn.addEventListener('mouseover', () => btn.classList.add('scale-105'));
        btn.addEventListener('mouseout', () => btn.classList.remove('scale-105'));
      });

      window.addEventListener('scroll', checkIfInView);
      window.addEventListener('resize', checkIfInView);
      checkIfInView();
    });