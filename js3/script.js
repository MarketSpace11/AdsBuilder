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

    function addToCart(product) {
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        cartItems.push(product);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        updateCartCount();
    }

    function removeFromCart(productId) {
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        cartItems = cartItems.filter(item => item.id !== productId);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        displayCartItems();
        updateCartCount();
    }

    function displayCartItems() {
        const cartItemsContainer = document.getElementById("cart-items-container");
        cartItemsContainer.innerHTML = '';
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        let totalPrice = 0;

        cartItems.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            
            cartItem.innerHTML = `
                <button class="remove-item-btn" onclick="removeFromCart(${item.id})">&times;</button>
                <img src="images/w${item.id}.png" alt="${item.name}">
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
        totalDiv.classList.add("cart-item-total");
        totalDiv.textContent = `Total: $${totalPrice.toFixed(2)}`;
        cartItemsContainer.appendChild(totalDiv);
    }

    if (document.getElementById("cart-items-container")) {
        displayCartItems();
    }

    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const product = {
                id: parseInt(button.getAttribute("data-id")),
                name: button.getAttribute("data-name"),
                price: parseFloat(button.getAttribute("data-price")),
                quantity: 1
            };
            addToCart(product);
        });
    });

    window.removeFromCart = removeFromCart;
});
