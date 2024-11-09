// Inicializa EmailJS solo después de que el DOM esté listo
document.addEventListener("DOMContentLoaded", function() {
    try {
        emailjs.init("xPw6PF0ef-Di5oFKO"); // Inicializa con el User ID
        console.log("EmailJS initialized successfully.");
    } catch (error) {
        console.error("Error initializing EmailJS:", error);
        return; // Detenemos la ejecución si no se puede inicializar EmailJS
    }

    // Función para manejar el envío de formularios de EmailJS
    async function sendEmail(serviceId, templateId, form, templateParams) {
        try {
            const response = await emailjs.send(serviceId, templateId, templateParams);
            console.log("SUCCESS", response);
            alert("Message sent successfully");
            if (form) form.reset(); // Resetea el formulario tras enviarlo
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
            alert("Error sending message, please try again.");
        }
    }

    // Agrega el evento 'submit' al formulario de contacto
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            sendEmail("service_pyrjqj8", "template_badfkxg", contactForm, contactForm);
        });
    } else {
        console.error("Formulario con ID 'contactForm' no encontrado");
    }

    // Agrega el evento 'submit' al formulario de suscripción
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
