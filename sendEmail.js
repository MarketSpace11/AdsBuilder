document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío directo

    const serviceID = "service_pyrjqj8";
    const templateID = "template_badfkxg";
    const publicKey = "xPw6PF0ef-Di5oFKO";

    const templateParams = {
        user_name: document.querySelector("input[name='user_name']").value,
        user_email: document.querySelector("input[name='user_email']").value,
        user_phone: document.querySelector("input[name='user_phone']").value,
        message: document.querySelector("textarea[name='message']").value
    };

    emailjs.init(publicKey); // Inicializa EmailJS con tu public key

    emailjs.send(serviceID, templateID, templateParams)
        .then(response => {
            console.log("SUCCESS!", response.status, response.text);
            alert("Your message has been sent successfully!");
            document.getElementById("contactForm").reset(); // Opcional: reinicia el formulario
        }, error => {
            console.log("FAILED...", error);
            alert("There was an error sending your message. Please try again.");
        });
});
