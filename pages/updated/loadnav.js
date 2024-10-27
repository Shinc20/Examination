window.onload = function() {
    fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbarContainer').innerHTML = data;
        updateCartCount(); // Optional: Update the cart count
        })
        .catch(error => console.error('Error loading navbar:', error));
    }
