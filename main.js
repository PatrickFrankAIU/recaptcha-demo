// Get DOM elements
let form = document.getElementById('demo-form');
let resultDiv = document.getElementById('result');
let captchaErrorDiv = document.getElementById('captcha-error');
let recaptchaResponse = document.getElementById('recaptchaResponse');

// Handle form submission
form.addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();
    
    // Clear previous error messages
    captchaErrorDiv.innerHTML = '';
    
    // Execute reCAPTCHA v3
    grecaptcha.ready(function() {
        grecaptcha.execute('6LdNniYrAAAAADA3zWsM6iQbbTG5IjayNDayIwpT', {action: 'submit'}).then(function(token) {
            // Add token to form
            recaptchaResponse.value = token;
            
            // Get form input values
            let name = document.getElementById('name').value;
            let email = document.getElementById('email').value;
            
            // In a real application, you would send this data to your server
            // For this demo, we'll just show the result
            showResult(true, name, email, token);
            
            // Reset the form
            form.reset();
        });
    });
});

// Function to display the form submission result
function showResult(success, name, email, captchaToken) {
    if (success) {
        // Show success message
        resultDiv.innerHTML = '<h3>Form Submitted Successfully!</h3>' +
                             '<p><strong>Name:</strong> ' + name + '</p>' +
                             '<p><strong>Email:</strong> ' + email + '</p>' +
                             '<p><strong>reCAPTCHA v3 Token:</strong> ' + captchaToken.substring(0, 15) + '...</p>' +
                             '<p>In a real application, this token would be sent to your server along with the form data.</p>' +
                             '<p>The server would verify the token and check the score (0.0-1.0) to determine if the user is likely a bot.</p>';
        resultDiv.className = 'result-container success';
    } else {
        // Show error message
        resultDiv.innerHTML = '<h3>Form Submission Failed</h3>' +
                             '<p>There was an error processing your form submission.</p>';
        resultDiv.className = 'result-container error';
    }
    
    // Display the result container
    resultDiv.style.display = 'block';
    
    // Scroll to the result
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}