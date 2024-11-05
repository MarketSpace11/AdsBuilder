// Inicializa EmailJS con tu User ID
emailjs.init("xPw6PF0ef-Di5oFKO");  // Reemplaza con tu propio User ID

// Agrega un evento 'submit' al formulario
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene la recarga de la página

    // Envía el formulario usando EmailJS
    emailjs.sendForm('service_xbrsts6', 'template_eht2dzq', this)  // Reemplaza con tus IDs de servicio y plantilla
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Message sent successfully');
        }, function(error) {
            console.log('FAILED...', error);
            alert('Error sending message');
        });
});
