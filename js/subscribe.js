// Inicializa EmailJS
emailjs.init("xPw6PF0ef-Di5oFKO");  // Asegúrate de usar tu User ID de EmailJS

// Añadir evento click al botón de suscripción
document.getElementById("subscription-form").addEventListener("click", function(event) {
    event.preventDefault(); // Evita que el formulario se recargue al hacer clic

    var userEmail = document.getElementById("user-email").value;

    // Validación de correo electrónico vacío
    if (!userEmail) {
        alert("Please enter a valid email.");
        return;
    }

    // Configura los parámetros para el correo
    var templateParams = {
        email: userEmail,  // Envía el correo ingresado en el formulario
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
