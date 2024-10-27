window.onload = function() {
    fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbarContainer').innerHTML = data;
        updateCartCount(); // Optional: Update the cart count
        })
        .catch(error => console.error('Error loading navbar:', error));
    }
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to add an item to the cart
    function addToCart(productName, productPrice) {
        const quantityInput = event.target.previousElementSibling.querySelector('input');
        const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
        
        const existingItem = cart.find(item => item.name === productName);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: quantity });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${quantity} x ${productName} added to cart`);
        updateCartCount();
    }
    
    // Function to render the cart table
    function renderCart() {
        let cartBody = document.getElementById('cart-body');
        let cartTotal = document.getElementById('cart-total');
        cartBody.innerHTML = ''; 
    
        cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalPrice = 0;
    
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
            priceCell.textContent = `$${item.price}`;
    
            let subtotal = item.price * item.quantity;
            let subtotalCell = document.createElement('td');
            subtotalCell.textContent = `$${subtotal.toFixed(2)}`;
    
            let removeCell = document.createElement('td');
            let removeBtn = document.createElement('button');
            removeBtn.textContent = "Remove";
            removeBtn.classList.add('remove-btn');
            removeBtn.onclick = () => removeItem(item.name);
            removeCell.appendChild(removeBtn);
    
            row.appendChild(nameCell);
            row.appendChild(quantityCell);
            row.appendChild(priceCell);
            row.appendChild(subtotalCell);
            row.appendChild(removeCell);
    
            cartBody.appendChild(row);
            totalPrice += subtotal;
        });
    
        cartTotal.textContent = totalPrice.toFixed(2);
    }
    
    // Function to update item quantity
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
    document.getElementById('checkout-btn').addEventListener('click', () => {
        alert('Proceeding to checkout...');
        window.location.href = '../billing/billing.html';
    });
    

