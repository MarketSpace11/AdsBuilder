// Inicializa EmailJS con tu User ID
emailjs.init("xPw6PF0ef-Di5oFKO"); // Este es tu User ID

// Asegúrate de que el código se ejecute solo después de que el DOM esté listo
document.addEventListener("DOMContentLoaded", function() {
    // Agrega el evento 'submit' al formulario
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Previene la recarga de la página

            // Envía el formulario usando EmailJS
            emailjs.sendForm('service_pyrjqj8', 'template_badfkxg', this) // 'template_badfkxg' es tu Template ID
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Message sent successfully');
                    form.reset(); // Opcional: resetea el formulario tras enviarlo
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Error sending message, try again');
                });
        });
    } else {
        console.error("Formulario con ID 'contactForm' not found");
    }
});
