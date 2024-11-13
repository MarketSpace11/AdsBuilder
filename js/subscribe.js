document.addEventListener("DOMContentLoaded", function() {
    // Inicializa EmailJS
    emailjs.init("xPw6PF0ef-Di5oFKO");  // Usa tu User ID de EmailJS

    // Añadir evento de submit al formulario de suscripción
    document.getElementById("subscription-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que el formulario se recargue al enviarse

        // Obtén el correo del campo de entrada
        var userEmail = document.getElementById("user-email").value;

        // Verifica si el campo está vacío antes de enviar
        if (userEmail.trim() === "") {
            alert("Please enter your email."); // Muestra el mensaje solo si está vacío
            return; // Detiene la ejecución si el campo está vacío
        }

        // Si el correo no está vacío, procede a enviar
        var templateParams = {
            email: userEmail,  // Envía el correo ingresado
        };

        // Enviar correo con EmailJS
        emailjs.send("service_pyrjqj8", "template_badfkxg", templateParams)
            .then(function(response) {
                alert("You have successfully subscribed!");
                console.log("SUCCESS", response);
            }, function(error) {
                alert("There was an error subscribing, please try again.");
                console.log("FAILED", error);
            });
    });
});
