document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- Registration Logic ---
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get values
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('regEmail').value;
            const phone = document.getElementById('phone').value;
            const course = document.getElementById('course').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Validation Flags
            let isValid = true;
            const errors = {
                fullName: document.getElementById('error-fullName'),
                email: document.getElementById('error-email'),
                phone: document.getElementById('error-phone'),
                password: document.getElementById('error-password'),
                confirmPassword: document.getElementById('error-confirmPassword')
            };

            // Reset errors
            Object.values(errors).forEach(el => el.style.display = 'none');

            // 1. Check Empty Fields
            if (!fullName || !email || !phone || !course || !password || !confirmPassword) {
                alert("All fields are required.");
                return;
            }

            // 2. Email Format Validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errors.email.textContent = "Invalid email format.";
                errors.email.style.display = 'block';
                isValid = false;
            }

            // 3. Phone Number Validation (10 digits)
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone)) {
                errors.phone.textContent = "Phone number must be exactly 10 digits.";
                errors.phone.style.display = 'block';
                isValid = false;
            }

            // 4. Password Match
            if (password !== confirmPassword) {
                errors.confirmPassword.textContent = "Passwords do not match.";
                errors.confirmPassword.style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                // Store User in LocalStorage
                const user = {
                    name: fullName,
                    email: email,
                    phone: phone,
                    course: course,
                    password: password
                };

                // Get existing users or create new array
                let users = JSON.parse(localStorage.getItem('collegeUsers')) || [];
                
                // Check if email already exists
                const userExists = users.some(u => u.email === email);
                if (userExists) {
                    alert("User with this email already exists!");
                    return;
                }

                users.push(user);
                localStorage.setItem('collegeUsers', JSON.stringify(users));

                // Show Success
                const successMsg = document.getElementById('successMessage');
                successMsg.style.display = 'block';
                successMsg.textContent = `Registration Successful for ${fullName}!`;
                
                // Clear form
                registerForm.reset();
            }
        });
    }

    // --- Login Logic ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Get users from storage
            const users = JSON.parse(localStorage.getItem('collegeUsers')) || [];

            // Find user
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                alert(`Login Successful! Welcome, ${user.name}.`);
                // In a real app, you would redirect here
                // window.location.href = 'index.html';
            } else {
                alert("Invalid Email or Password.");
            }
        });
    }
});