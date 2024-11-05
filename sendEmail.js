document.addEventListener("DOMContentLoaded", function() {
    emailjs.init("xPw6PF0ef-Di5oFKO"); // Inicializa EmailJS con tu clave pública

    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Evita la recarga de la página

        // Enviar el formulario usando EmailJS
        emailjs.sendForm('service_pyrjqj8', 'template_badfkxg', this)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert("Mensaje enviado con éxito.");
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                alert("Hubo un problema al enviar el mensaje. Por favor, intenta de nuevo.");
            });
    });
});
