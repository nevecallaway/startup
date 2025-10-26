import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [reg, setReg] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  // Placeholder login: store fake token in LocalStorage
  async function handleLogin(e) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password required');
      return;
    }

    try {
      const fakeToken = `demo-token:${btoa(email)}`;
      localStorage.setItem('authToken', fakeToken);
      localStorage.setItem('userEmail', email);
      navigate('/commission');
    } catch (err) {
      setError('Login failed');
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError('');

    if (reg.password !== reg.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!reg.email || !reg.password) {
      setError('Email and password required for registration');
      return;
    }

    try {
      const fakeToken = `demo-token:${btoa(reg.email)}`;
      localStorage.setItem('authToken', fakeToken);
      localStorage.setItem('userEmail', reg.email);
      navigate('/commission');
    } catch (err) {
      setError('Registration failed');
    }
  }

  return (
    <main>
      {/* Login Section */}
      <section>
        <h2>Client Login</h2>
        <h4>Access your commission dashboard and manage your portrait orders.</h4>
        
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="loginEmail">Email:</label>
            <input type="email" id="loginEmail" name="email" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="loginPassword">Password:</label>
            <input type="password" id="loginPassword" name="password" placeholder="Enter password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
        
        <p>Don't have an account? Register below.</p>
      </section>

      {/* Registration Section */}
      <section>
        <h2>Create New Account</h2>
        <h4>Join Portrait Portal to commission custom artwork and track your orders.</h4>
        
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First name"
              required
              value={reg.firstName}
              onChange={(e) => setReg({...reg, firstName: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last name"
              required
              value={reg.lastName}
              onChange={(e) => setReg({...reg, lastName: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="registerEmail">Email:</label>
            <input
              type="email"
              id="registerEmail"
              name="email"
              placeholder="Enter email"
              required
              value={reg.email}
              onChange={(e) => setReg({...reg, email: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="registerPassword">Password:</label>
            <input
              type="password"
              id="registerPassword"
              name="password"
              placeholder="Create password"
              required
              minLength={6}
              value={reg.password}
              onChange={(e) => setReg({...reg, password: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              required
              minLength={6}
              value={reg.confirmPassword}
              onChange={(e) => setReg({...reg, confirmPassword: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+1 (123) 456-7890"
              value={reg.phone}
              onChange={(e) => setReg({...reg, phone: e.target.value})}
            />
          </div>
          <button type="submit">Create Account</button>
        </form>
      </section>

      {/* Alternative Actions */}
      <section>
        <h3>Browse Without an Account</h3>
        <div className="link-container">
          <button type="button" className="small-link" onClick={() => navigate('/gallery')}>View Gallery</button>
          <button type="button" className="small-link" onClick={() => navigate('/about')}>Learn More</button>
        </div>
      </section>
    </main>
  );
}