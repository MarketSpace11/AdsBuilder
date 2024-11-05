document.addEventListener("DOMContentLoaded", function() {
    // Inicializa EmailJS con tu API Key
    emailjs.init("xPw6PF0ef-Di5oFKO"); // Reemplaza con tu API Key

    // Función para enviar el correo
    function sendMail() {
        const params = {
            user_name: document.querySelector('input[name="user_name"]').value,
            user_email: document.querySelector('input[name="user_email"]').value,
            user_phone: document.querySelector('input[name="user_phone"]').value,
            message: document.querySelector('textarea[name="message"]').value
        };

        const serviceID = "service_pyrjqj8";
        const templateID = "template_badfkxg";

        emailjs.send(serviceID, templateID, params)
            .then((response) => {
                alert("Message sent successfully!");
                console.log("SUCCESS!", response.status, response.text);
                document.getElementById("contactForm").reset();
            }, (error) => {
                alert("Failed to send message. Please try again.");
                console.log("FAILED...", error);
            });
    }

    // Asigna la función al evento submit del formulario
    document.getElementById("contactForm").onsubmit = function(event) {
        event.preventDefault();
        sendMail();
    };
});
