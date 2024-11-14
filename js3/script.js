document.addEventListener("DOMContentLoaded", function () {
    // Función para actualizar el contador de artículos en el carrito
    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const itemCount = cartItems.length;
        const cartButton = document.getElementById("cart-button");
        const itemCountElement = document.getElementById("item-count");

        if (cartButton && itemCountElement) {
            if (itemCount > 0) {
                cartButton.style.display = "block";
                itemCountElement.textContent = itemCount;
            } else {
                cartButton.style.display = "none";
            }
        }
    }

    updateCartCount();

    // Función para agregar un producto al carrito
    function addToCart(product) {
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        // Revisamos si el producto ya existe en el carrito
        const existingProductIndex = cartItems.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            cartItems[existingProductIndex].quantity += 1; // Si ya existe, aumentamos la cantidad
        } else {
            cartItems.push(product); // Si no existe, lo agregamos al carrito
        }

        localStorage.setItem("cart", JSON.stringify(cartItems));
        updateCartCount();
    }

    // Función para eliminar un producto del carrito
    function removeFromCart(productId) {
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        cartItems = cartItems.filter(item => item.id !== productId); // Eliminamos el producto con el ID correspondiente
        localStorage.setItem("cart", JSON.stringify(cartItems));
        displayCartItems();
        updateCartCount();
    }

    // Función para mostrar los productos en el carrito
    function displayCartItems() {
        const cartItemsContainer = document.getElementById("cart-items-container");
        cartItemsContainer.innerHTML = ''; // Limpiar contenido previo
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        let totalPrice = 0;

        cartItems.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            // Aseguramos que las imágenes se muestren correctamente
            const productImage = item.id ? `images/${item.id}.png` : 'images/default.png';  // Aseguramos que la imagen exista

            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <button class="remove-item-btn" onclick="removeFromCart('${item.id}')">&times;</button>
                    <img src="${productImage}" alt="${item.name}" onerror="this.src='images/default.png'; this.onerror=null;">
                </div>
                <div class="cart-item-details">
                    <h5>${item.name}</h5>
                    <p>Price: $${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <div class="cart-item-total">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);
            totalPrice += item.price * item.quantity;
        });

        const totalDiv = document.createElement("div");
        totalDiv.classList.add("cart-total");
        totalDiv.textContent = `Total: $${totalPrice.toFixed(2)}`;
        cartItemsContainer.appendChild(totalDiv);
    }

    if (document.getElementById("cart-items-container")) {
        displayCartItems();
    }

    // Evento para agregar productos al carrito
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const product = {
                id: button.getAttribute("data-id"),
                name: button.getAttribute("data-name"),
                price: parseFloat(button.getAttribute("data-price")),
                quantity: 1
            };
            addToCart(product);
        });
    });

    // Exponer la función removeFromCart a nivel global para que funcione al hacer clic
    window.removeFromCart = removeFromCart;
});
