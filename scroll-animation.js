// scroll-animation.js

document.addEventListener("DOMContentLoaded", () => {
    // Obtener todos los elementos con la clase 'animate-on-scroll'
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    // Función para verificar si un elemento está en la vista
    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return rect.top <= window.innerHeight && rect.bottom >= 0;
    };

    // Función para añadir la clase 'visible' cuando el elemento entra en la vista
    const handleScroll = () => {
        elementsToAnimate.forEach((el) => {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });
    };

    // Llamar a handleScroll cuando el usuario hace scroll
    window.addEventListener('scroll', handleScroll);

    // Ejecutar la función para animar los elementos al cargar la página
    handleScroll();
});
