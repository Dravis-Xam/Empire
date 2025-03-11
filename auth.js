// Function to handle login
async function handleLogin(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
  
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Login failed. Please check your credentials.');
      }
  
      // Save token and user info to localStorage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data.user));
  
      // Redirect to the home page
      window.location.href = '/';
    } catch (error) {
      alert(error.message); // Show error message to the user
    }
  }
  
  // Function to handle signup
  async function handleSignup(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
  
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
  
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: name, email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed. Please try again.');
      }
  
      // Save token and user info to localStorage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data.user));
  
      // Redirect to the home page
      window.location.href = '/';
    } catch (error) {
      alert(error.message); // Show error message to the user
    }
  }
  
  // Attach event listeners to the forms
  document.getElementById('login').addEventListener('submit', handleLogin);
  document.getElementById('signup').addEventListener('submit', handleSignup);