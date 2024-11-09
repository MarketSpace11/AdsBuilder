// Inicializa EmailJS con tu User ID
emailjs.init("xPw6PF0ef-Di5oFKO");

// Asegúrate de que el código se ejecute solo después de que el DOM esté listo
document.addEventListener("DOMContentLoaded", function() {
    
    // Función para manejar el envío de formularios de EmailJS
    function sendEmail(serviceId, templateId, form, templateParams) {
        emailjs.send(serviceId, templateId, templateParams)
            .then(function(response) {
                console.log("SUCCESS", response);
                alert("Message sent successfully");
                if (form) form.reset(); // Opcional: resetea el formulario tras enviarlo
            })
            .catch(function(error) {
                console.error("FAILED...", error);
                alert("Error sending message, try again");
            });
    }
    
    // Agrega el evento de 'submit' al formulario de contacto
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            sendEmail("service_pyrjqj8", "template_badfkxg", this, this);
        });
    } else {
        console.error("Formulario con ID 'contactForm' no encontrado");
    }
    
    // Agrega el evento de 'submit' al formulario de suscripción
    const subscriptionForm = document.getElementById("subscription-form");
    if (subscriptionForm) {
        subscriptionForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            const userEmail = document.getElementById("user-email").value;
            if (userEmail.trim() === "") {
                alert("Please enter your email.");
                return;
            }

            const templateParams = {
                email: userEmail
            };
            sendEmail("service_pyrjqj8", "template_badfkxg", null, templateParams);
        });
    } else {
        console.error("Formulario con ID 'subscription-form' no encontrado");
    }
});
