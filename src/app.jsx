import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div>
      <header>
        {/* Put both title and logo inside the same container */}
        <div className="navbar-brand">
            <h1>Portrait Portal</h1>
            <img src="../images/logo_portrait_portal.png" alt="Logo" />
        </div>

        <nav>
          <menu>
          {/* Public Pages */}
          <li className="nav-item">
              <a className="nav-link active" href="index.html">Home</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="gallery.html">Gallery</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="about.html">About</a>
          </li>

          {/* Authentication */}
          <li className="nav-item">
              <a className="nav-link" href="login.html">Login/Register</a>
          </li>

          {/* Protected Pages (show after login) */}
          <li className="nav-item">
              <a className="nav-link" href="login.html">Request Commission</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="login.html">Dashboard</a>
          </li>
          </menu>
        </nav>
      </header>

      <main>App components go here</main>

      <footer>
      <span>Creator: Neve Callaway</span>
      <a href="https://github.com/nevecallaway/startup">GitHub</a>
    </footer>
    </div>
  );
}