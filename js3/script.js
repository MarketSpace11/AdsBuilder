document.addEventListener("DOMContentLoaded", function () {
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
        const existingProductIndex = cartItems.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            cartItems[existingProductIndex].quantity += 1;
        } else {
            cartItems.push(product);
        }

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

    function adjustQuantity(productId, adjustment) {
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const productIndex = cartItems.findIndex(item => item.id === productId);

        if (productIndex !== -1) {
            cartItems[productIndex].quantity += adjustment;
            if (cartItems[productIndex].quantity < 1) {
                cartItems[productIndex].quantity = 1;  // Prevent negative or zero quantities
            }
            localStorage.setItem("cart", JSON.stringify(cartItems));
            displayCartItems();
        }
    }

    function displayCartItems() {
        const cartItemsContainer = document.getElementById("cart-items-container");
        cartItemsContainer.innerHTML = '';
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        let totalPrice = 0;

        cartItems.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            const productImage = item.id ? `images/${item.id}.png` : 'images/default.png';

            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <button class="remove-item-btn" onclick="removeFromCart('${item.id}')">&times;</button>
                    <img src="${productImage}" alt="${item.name}" onerror="this.src='images/default.png'; this.onerror=null;">
                </div>
                <div class="cart-item-details">
                    <h5>${item.name}</h5>
                    <p>Price: $${item.price}</p>
                    <div class="quantity-control">
                        <p>Quantity: ${item.quantity}</p>
                        <div class="quantity-arrows">
                            <button onclick="adjustQuantity('${item.id}', 1)">&#9650;</button>
                            <button onclick="adjustQuantity('${item.id}', -1)">&#9660;</button>
                        </div>
                    </div>
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

    window.removeFromCart = removeFromCart;
    window.adjustQuantity = adjustQuantity;

    const checkoutButton = document.getElementById("pay-with-paypal-btn");
    checkoutButton.addEventListener("click", function () {
        document.getElementById("paypal-button-container").style.display = "block";
    });

    if (window.paypal) {
        paypal.Buttons({
            createOrder: function (data, actions) {
                const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
                const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
                
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: totalAmount.toFixed(2)
                        }
                    }]
                });
            },
            onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                    alert('Transaction completed by ' + details.payer.name.given_name);
                    localStorage.removeItem("cart");
                    displayCartItems();
                    updateCartCount();
                });
            }
        }).render('#paypal-button-container');
    }
});
