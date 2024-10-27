document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Basic validation for the form
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const accountHolder = document.getElementById('accountHolder').value;

    // Simple regex checks for card number, expiry date, and CVV
    const cardNumberPattern = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvPattern = /^\d{3}$/;

    // Validation with custom notification
    if (!cardNumberPattern.test(cardNumber)) {
        showNotification('Invalid card number', 'error');
        return;
    }

    if (!expiryDatePattern.test(expiryDate)) {
        showNotification('Invalid expiry date', 'error');
        return;
    }

    if (!cvvPattern.test(cvv)) {
        showNotification('Invalid CVV', 'error');
        return;
    }

    if (accountHolder === '') {
        showNotification('Account Holder Name is required', 'error');
        return;
    }

    // Simulate successful payment process
    showNotification('Payment processed successfully!', 'success');
});

// Function to create and show custom notifications
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.classList.add('toast', type); // 'type' can be 'success' or 'error'
    notification.innerText = message;

    // Append notification to the body
    document.getElementById('toastContainer').appendChild(notification);

    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remove the notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500); // Wait for the hiding transition to finish
    }, 3000); // 3 seconds display time
}
