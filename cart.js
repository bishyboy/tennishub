// cart.js
const cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productId) {
    const product = productData.find(item => item.id === productId);
    if (product) {
        // Check if the product already exists in the cart
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }
        localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart to local storage
        updateCartCount(); // Update cart count
        animateCartCount();
        calculateTotalPrice();

        // Trigger cart animation
        const cartElement = document.querySelector('.cart'); // Adjust selector if necessary
        cartElement.classList.add('cart-animation');

        // Remove animation class after animation ends
        setTimeout(() => {
            cartElement.classList.remove('cart-animation');
        }, 500); // Match this duration with the CSS animation duration

        // Show alert after a delay
        setTimeout(() => {
            alert("Product added to cart"); // Alert after animation
        }, 500); // Match this duration with the CSS animation duration
    } else {
        console.error("Product not found:", productId);
    }
}

function addToWishlist(productId) {
    const product = productData.find(item => item.id === productId);
    if (product) {
        const existingProduct = wishlist.find(item => item.id === productId);
        if (!existingProduct) {
            wishlist.push(product);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            alert("Product added to wishlist");
        } else {
            console.log("Product already in wishlist:", productId);
        }
    } else {
        console.error("Product not found:", productId);
    }
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cart-count").innerText = cartCount;
}

/*Cart animation when item added */
function animateCartCount() {
    const cartElement = document.querySelector('.cart'); // Select the cart container
    const cartCountElement = document.getElementById("cart-count");

    // Add the flash class to both the cart and the cart count
    cartElement.classList.add("cart-flash");
    cartCountElement.classList.add("cart-count-flash");
    cartCountElement.classList.add("animated"); // Add bounce animation to count

    // Clear previous animations
    cartElement.addEventListener("animationend", () => {
        cartElement.classList.remove("cart-flash");
        cartCountElement.classList.remove("cart-count-flash");
        cartCountElement.classList.remove("animated");
    }, { once: true });
}


function calculateTotalPrice() {
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalPriceElement = document.getElementById("total-price");
    if (totalPriceElement) {
        totalPriceElement.innerText = `$${parseFloat(totalPrice).toFixed(2)}`;
    }
}

function renderCart() {
    const cartContainer = document.getElementById('cart-container');
    const totalPriceContainer = document.querySelector('.total-price-container');

    if (cartContainer) {
        cartContainer.innerHTML = ''; // Clear the container
        cart.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.className = 'cart-item';
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <h3>${product.name}</h3>
                    <p>Price: $${parseFloat(product.price).toFixed(2)}</p>
                    <p>Quantity: ${product.quantity}</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
            cartContainer.appendChild(productDiv);
        });

        // Show or hide the total price container based on cart length
        if (cart.length > 0) {
            totalPriceContainer.style.display = 'flex'; // Show total price
            calculateTotalPrice(); // Calculate and display total price
        } else {
            totalPriceContainer.style.display = 'none'; // Hide total price when cart is empty
        }
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
    calculateTotalPrice();
    animateCartCount(); // Call to animate after updating the cart
}

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    updateCartCount();
    calculateTotalPrice();
});
