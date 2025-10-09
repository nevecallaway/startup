import React from 'react';
import './login.css';

export function Login() {
  return (
    <main>
      {/* Login Section */}
      <section>
        <h2>Client Login</h2>
        <h4>Access your commission dashboard and manage your portrait orders.</h4>
        
        <form>
          <div>
            <label for="loginEmail">Email:</label>
            <input type="email" id="loginEmail" name="email" placeholder="Enter email" required />
          </div>
          <div>
            <label for="loginPassword">Password:</label>
            <input type="password" id="loginPassword" name="password" placeholder="Enter password" required />
          </div>
          <a href="dashboard.html">Login</a>
        </form>
        
        <p>Don't have an account? Register below.</p>
      </section>

      {/* Registration Section */}
      <section>
        <h2>Create New Account</h2>
        <h4>Join Portrait Portal to commission custom artwork and track your orders.</h4>
        
        <form>
          <div>
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" placeholder="First name" required />
          </div>
          <div>
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" placeholder="Last name" required />
          </div>
          <div>
            <label for="registerEmail">Email:</label>
            <input type="email" id="registerEmail" name="email" placeholder="Enter email" required />
          </div>
          <div>
            <label for="registerPassword">Password:</label>
            <input type="password" id="registerPassword" name="password" placeholder="Create password" required minlength="6" />
          </div>
          <div>
            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" required minlength="6" />
          </div>
          <div>
            <label for="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" placeholder="+1 (123) 456-7890" />
          </div>
          <a href="dashboard.html">Create Account</a>
        </form>
      </section>

      {/* Alternative Actions */}
      <section>
        <h3>Browse Without an Account</h3>
        <div class="link-container">
          <a href="gallery.html" class="small-link">View Gallery</a>
          <a href="about.html" class="small-link">Learn More</a>
        </div>
      </section>
    </main>
  );
}