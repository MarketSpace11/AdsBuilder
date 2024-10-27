// Seleccionar todas las pantallas
const screens = document.querySelectorAll('.screen');

// Añadir evento de clic a los botones de categoría
document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', () => {
        const targetScreen = document.querySelector(button.dataset.target);
        changeScreen(targetScreen);
    });
});

// Añadir evento de clic a los botones de regresar
document.querySelectorAll('.back-button').forEach(button => {
    button.addEventListener('click', () => {
        const mainScreen = document.querySelector('#main-screen');
        changeScreen(mainScreen);
    });
});

// Función para cambiar de pantalla
function changeScreen(targetScreen) {
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    targetScreen.classList.add('active');
}

// Botón de enlace externo
document.getElementById('external-link-button').addEventListener('click', () => {
    window.location.href = 'https://marketspace11.itch.io/adsbuilder';
});
