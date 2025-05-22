document.addEventListener('DOMContentLoaded', () => {
      const hamburger = document.getElementById('hamburger-menu');
      const mobileMenu = document.getElementById('mobile-menu');
      const navbar = document.getElementById('navbar');

      hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });

      // Fecha o menu ao clicar em um link no mobile
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });

      // Mantém o navbar fixo e ajusta sombra ao rolar
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          document.querySelector('header').classList.add('bg-opacity-95', 'shadow-lg');
        } else {
          document.querySelector('header').classList.remove('bg-opacity-95', 'shadow-lg');
        }
      });
    });