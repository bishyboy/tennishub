// Define the toggleWishlistIcon function in the global scope
function toggleWishlistIcon(iconElement, productId) {
    const isFilled = iconElement.classList.contains('filled'); // Check if the filled class is currently applied

    // Toggle the filled class
    iconElement.classList.toggle('filled', !isFilled); // If it's filled, remove; if not, add.

    // Call your function to add the product to the wishlist
    addToWishlist(productId);
}

// Function to create a wishlist product element
function createWishlistProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.classList.add('wishlist-product');

    productDiv.innerHTML = `
        <div class="wishlist-product-image">
            <img src="${product.image}" alt="${product.name}">
            <img class="wishlist-icon" src="wishlist-button.png" alt="Wishlist Icon">
        </div>
        <div class="wishlist-product-info">
            <p>${product.name}</p>
            <p>${product.price}</p>
            <button class="remove-wishlist" data-id="${product.id}">Remove</button>
        </div>
    `;

    // Add click event listener to the wishlist icon
    const wishlistIcon = productDiv.querySelector('.wishlist-icon');
    wishlistIcon.addEventListener('click', () => {
        toggleWishlistIcon(wishlistIcon, product.id);
    });

    // Add click event listener to the remove button
    productDiv.querySelector('.remove-wishlist').addEventListener('click', () => {
        removeFromWishlist(product.id);
    });

    

    return productDiv;
}
