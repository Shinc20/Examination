// Initialize or fetch existing cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to increase the quantity
function increaseQuantity(button) {
    const inputField = button.previousElementSibling;
    let currentValue = parseInt(inputField.value);
    currentValue++;
    inputField.value = currentValue;
}

// Function to decrease the quantity
function decreaseQuantity(button) {
    const inputField = button.nextElementSibling;
    let currentValue = parseInt(inputField.value);
    if (currentValue > 1) { // Ensure the quantity doesn't go below 1
        currentValue--;
        inputField.value = currentValue;
    }
}

// Function to add an item to the cart
function addToCart(productName, productPrice) {
    // Get the quantity from the input field
    const quantityInput = event.target.parentElement.querySelector('input');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

    // Check if the product is already in the cart
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        // If the item already exists, update the quantity
        existingItem.quantity += quantity;
    } else {
        // Otherwise, add the new product to the cart
        cart.push({ name: productName, price: productPrice, quantity: quantity });
    }
    
    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${quantity} x ${productName} added to cart`);
    updateCartCount();
}

// Function to render the cart table
function renderCart() {
    let cartBody = document.getElementById('cart-body');
    let cartTotal = document.getElementById('cart-total');
    cartBody.innerHTML = ''; // Clear existing cart table

    // Fetch cart from localStorage again to ensure data is updated
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    // Iterate over each item in the cart
    cart.forEach(item => {
        let row = document.createElement('tr');

        let nameCell = document.createElement('td');
        nameCell.textContent = item.name;

        let quantityCell = document.createElement('td');
        let quantityControl = `
            <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
        `;
        quantityCell.innerHTML = quantityControl;

        let priceCell = document.createElement('td');
        priceCell.textContent = `₹${item.price.toFixed(2)}`; // Format price to two decimal places

        let subtotal = item.price * item.quantity;
        let subtotalCell = document.createElement('td');
        subtotalCell.textContent = `₹${subtotal.toFixed(2)}`; // Format subtotal to two decimal places

        let removeCell = document.createElement('td');
        let removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');
        removeBtn.onclick = () => removeItem(item.name);
        removeCell.appendChild(removeBtn);

        // Add cells to the row
        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        row.appendChild(priceCell);
        row.appendChild(subtotalCell);
        row.appendChild(removeCell);

        cartBody.appendChild(row);
        totalPrice += subtotal; // Accumulate subtotal to totalPrice
    });

   // Display total without dollar sign
   cartTotal.textContent = ` ₹${totalPrice.toFixed(2)}`; // Format total correctly
}

// Function to update item quantity in the cart
function updateQuantity(name, change) {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeItem(name);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    }
}

// Function to remove an item from the cart
function removeItem(name) {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Function to update the cart item count in the UI
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// On page load, render the cart (if on the cart page)
window.onload = function() {
    renderCart();
    updateCartCount();
}

// Example: Checkout button event handler
document.getElementById('checkout-btn')?.addEventListener('click', () => {
    alert('Proceeding to checkout...');
    window.location.href = '../billing/billing.html';
});
