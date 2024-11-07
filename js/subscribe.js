// Inicializa EmailJS
emailjs.init("xPw6PF0ef-Di5oFKO");  // Aquí debes colocar tu User ID de EmailJS

// Llama a esta función cuando el formulario se envíe
document.getElementById("subscription-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Previene que el formulario se recargue

    // Obtén el correo del formulario
    var userEmail = document.getElementById("user-email").value;

    // Configura el correo a enviar
    var templateParams = {
        email: userEmail,  // Esto va a enviar el email ingresado
    };

    // Enviar el correo con EmailJS
    emailjs.send("service_pyrjqj8", "template_badfkxg", templateParams)
        .then(function(response) {
            alert("¡You have successfully subscribed!");
            console.log("SUCCESS", response);
        }, function(error) {
            alert("There was an error subscribing, please try again.");
            console.log("FAILED", error);
        });
});
