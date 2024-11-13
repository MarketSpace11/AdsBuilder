document.addEventListener("DOMContentLoaded", function () {
    // Función para actualizar el contador de artículos en el carrito
    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const itemCount = cartItems.length;
        const cartButton = document.getElementById("cart-button");
        const itemCountElement = document.getElementById("item-count");

        // Verifica si cartButton y itemCountElement existen antes de aplicar cambios
        if (cartButton && itemCountElement) {
            // Muestra el botón solo si hay artículos en el carrito
            if (itemCount > 0) {
                cartButton.style.display = "block";
                itemCountElement.textContent = itemCount;
            } else {
                cartButton.style.display = "none";
            }
        }
    }

    // Llama a la función al cargar la página
    updateCartCount();

    // Función para agregar al carrito
    function addToCart(product) {
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        cartItems.push(product);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        updateCartCount();
    }

    // Lógica para mostrar contenido en `cart.html`
    if (document.getElementById("cart-contents")) {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const cartContents = document.getElementById("cart-contents");
        let totalPrice = 0;

        cartItems.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");
            itemDiv.textContent = `${item.name} - $${item.price}`;
            cartContents.appendChild(itemDiv);
            totalPrice += item.price;
        });

        document.getElementById("total-price").textContent = `Total: $${totalPrice}`;
    }

    // Añadir al carrito al hacer clic en cualquier botón de agregar
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const product = {
                id: button.getAttribute("data-id"),
                name: button.getAttribute("data-name"),
                price: parseFloat(button.getAttribute("data-price"))
            };
            addToCart(product);
        });
    });
});
