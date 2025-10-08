import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home';
import { Login } from './login/login';
import { Gallery } from './gallery/gallery';
import { Dashboard } from './dashboard/dashboard';
import { About } from './about/about';
import { Commission } from './commission/commission';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <div className="navbar-brand">
              <h1>Portrait Portal</h1>
              <img src="/images/logo_portrait_portal.png" alt="Logo" />
          </div>

          <nav>
            <menu>
              <li className="nav-item">
                  <NavLink className='nav-link' to=''>Home</NavLink>
                  </li>
              <li className="nav-item">
                  <NavLink className='nav-link' to='gallery'>Gallery</NavLink>
              </li>
              <li className="nav-item">
                  <NavLink className='nav-link' to='about'>About</NavLink>
              </li>

              <li className="nav-item">
                  <NavLink className='nav-link' to='login'>Login/Register</NavLink>
              </li>

              <li className="nav-item">
                  <NavLink className='nav-link' to='commission'>Request Commission</NavLink>
              </li>
              <li className="nav-item">
                  <NavLink className='nav-link' to='dashboard'>Dashboard</NavLink>
              </li>
            </menu>
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/login' element={<Login />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/about' element={<About />} />
          <Route path='/commission' element={<Commission />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
          <span>Creator: Neve Callaway</span>
          <a href="https://github.com/nevecallaway/startup">GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}