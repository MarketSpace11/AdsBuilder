// Inicializa EmailJS con tu User ID
emailjs.init("xPw6PF0ef-Di5oFKO"); // Este es tu User ID

// Asegúrate de que el código se ejecute solo después de que el DOM esté listo
document.addEventListener("DOMContentLoaded", function() {
    // Agrega el evento 'submit' al formulario
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Previene la recarga de la página

            // Envía el formulario usando EmailJS
            emailjs.sendForm('service_pyrjqj8', 'template_badfkxg', this) // 'template_eht2dzq' es tu Template ID
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Mensaje enviado con éxito');
                    form.reset(); // Opcional: resetea el formulario tras enviarlo
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Error al enviar el mensaje');
                });
        });
    } else {
        console.error("Formulario con ID 'contact-form' no encontrado");
    }
});
