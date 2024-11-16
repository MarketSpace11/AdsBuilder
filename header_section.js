// script.js

document.addEventListener("DOMContentLoaded", () => {
    const headerSection = document.querySelector(".header_section"); // Cambié .navbar a .header_section
    let lastScrollTop = 0; // Última posición del scroll

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            // Usuario hace scroll hacia abajo: ocultar el menú
            headerSection.classList.add("hidden");
        } else {
            // Usuario hace scroll hacia arriba: mostrar el menú
            headerSection.classList.remove("hidden");
        }

        // Actualizar última posición de scroll
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Evitar valores negativos
    });
});
