document.addEventListener("DOMContentLoaded", () => {
    // Crear el widget del chatbot
    const chatbotWidget = document.createElement("div");
    chatbotWidget.id = "chatbot-widget";
    chatbotWidget.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/4712/4712100.png" alt="Chatbot" />`;
    document.body.appendChild(chatbotWidget);

    const offsetFromCarrito = 100;  // Ajusta este valor para mover el chatbot un poco más lejos del carrito
    chatbotWidget.style.position = "fixed";  // Fijar el chatbot en la pantalla
    chatbotWidget.style.bottom = "80px"; // Ajusta el valor para que no se solape con el carrito
    chatbotWidget.style.right = "20px";  // Ajusta la distancia desde la derecha, si es necesario

    // Crear el cuadro de chat
    const chatboxContainer = document.createElement("div");
    chatboxContainer.id = "chatbox-container";
    chatboxContainer.innerHTML = `
        <div id="chatbox-header">
            FAQ - AdsBuilds 💻✨
            <button id="chatbox-close">&times;</button>
        </div>
        <div id="chatbox-content">
            <button id="toggle-language">🌐 Cambiar a Español</button>
            <ul id="faq-list"></ul>
        </div>
    `;
    document.body.appendChild(chatboxContainer);

    // Idioma actual
    let currentLanguage = "en";

    // Contenido de preguntas y respuestas
    const faqData = {
        es: [
            { q: "¿Qué servicios ofrecen?", a: "🌟 Ofrecemos diseño web, desarrollo de apps, SEO y promoción digital para negocios que quieren brillar. ¡Tu página web será hermosa y profesional! 😊" },
            { q: "¿Cuánto cuesta crear una página web?", a: "💸 Por solo $500, diseñamos una página perfecta para ti. ¡Paquetes con apps disponibles! 📱" },
            { q: "¿Qué métodos de pago aceptan?", a: "✔️ Aceptamos PayPal, Tarjeta de Credito y Debito para transacciones seguras. ¡Fácil y confiable! 🛡️" },
            { q: "¿Qué incluye la promoción digital?", a: "📢 Incluye creación de páginas en redes, diseño de banners y logos únicos. ¡Todo para destacar tu negocio! 🚀" },
            { q: "¿Cuánto tiempo tardan?", a: "⏱️ En 7-10 días tendrás tu página lista. ¡Rápido y espectacular! 🕒" },
            { q: "¿Ofrecen soporte?", a: "📞 Claro que sí. Paquetes de actualizaciones disponibles para que tu web siempre esté al día. 🌐" },
        ],
        en: [
            { q: "What services do you offer?", a: "🌟 We offer web design, app development, SEO, and digital promotion to make your business shine. Your website will be stunning and professional! 😊" },
            { q: "How much does it cost to create a website?", a: "💸 For just $500, we design a perfect website for you. App packages are available! 📱" },
            { q: "What payment methods do you accept?", a: "✔️ We accept PayPal, Credit and Debit card for secure transactions. Easy and reliable! 🛡️" },
            { q: "What does digital promotion include?", a: "📢 It includes creating social media pages, banners, and unique logos. Everything you need to make your business stand out! 🚀" },
            { q: "How long does it take?", a: "⏱️ In 7-10 days, your website will be ready. Quick and spectacular! 🕒" },
            { q: "Do you offer support?", a: "📞 Absolutely! Update packages are available to keep your site always up-to-date. 🌐" },
        ],
    };

    // Inicializar FAQ
    const faqList = document.querySelector("#faq-list");
    const renderFaq = (language) => {
        faqList.innerHTML = "";
        faqData[language].forEach(({ q, a }) => {
            const li = document.createElement("li");
            li.innerHTML = `<span>${q}</span><br>${a}`;
            faqList.appendChild(li);
        });
    };

    renderFaq(currentLanguage);

    // Cambiar idioma
    document.querySelector("#toggle-language").addEventListener("click", () => {
        currentLanguage = currentLanguage === "en" ? "es" : "en";
        renderFaq(currentLanguage);
        document.querySelector("#toggle-language").textContent =
            currentLanguage === "en" ? "🌐 Cambiar a Español" : "🌐 Switch to English";
    });

    // Mostrar y ocultar el cuadro de chat
    chatbotWidget.addEventListener("click", () => {
        chatboxContainer.style.display = "flex";
    });

    const closeButton = document.getElementById("chatbox-close");
    closeButton.addEventListener("click", () => {
        chatboxContainer.style.display = "none";
    });

    // Hacer el widget arrastrable con restricciones
    let isDragging = false;
    let offsetX, offsetY;

    const moveWidget = (x, y) => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Calcular nuevas posiciones, limitándolas a los bordes de la ventana
        let newLeft = Math.max(0, Math.min(x - offsetX, windowWidth - chatbotWidget.offsetWidth));
        let newTop = Math.max(0, Math.min(y - offsetY, windowHeight - chatbotWidget.offsetHeight));

        chatbotWidget.style.left = `${newLeft}px`;
        chatbotWidget.style.top = `${newTop}px`;
    };

    chatbotWidget.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - chatbotWidget.offsetLeft;
        offsetY = e.clientY - chatbotWidget.offsetTop;
        chatbotWidget.style.cursor = "grabbing";
    });

    chatbotWidget.addEventListener("touchstart", (e) => {
        isDragging = true;
        const touch = e.touches[0];
        offsetX = touch.clientX - chatbotWidget.offsetLeft;
        offsetY = touch.clientY - chatbotWidget.offsetTop;

        // Evitar que se mueva la pantalla mientras arrastramos el widget
        e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            moveWidget(e.clientX, e.clientY);
        }
    });

    document.addEventListener("touchmove", (e) => {
        if (isDragging) {
            const touch = e.touches[0];
            moveWidget(touch.clientX, touch.clientY);
        }

        // Evitar que se mueva la pantalla mientras arrastramos el widget
        e.preventDefault();
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        chatbotWidget.style.cursor = "grab";
    });

    document.addEventListener("touchend", () => {
        isDragging = false;
    });
});
