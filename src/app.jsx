import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './home/home';
import { Login } from './login/login';
import { Logout } from './login/logout';
import { Gallery } from './gallery/gallery';
import { Dashboard } from './dashboard/dashboard';
import { About } from './about/about';
import { Commission } from './commission/commission';

export default function App() {
  return (
    <BrowserRouter>
     <AppContent />
   </BrowserRouter>
 );
}

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/me', { credentials: 'include' })
      .then(res => res.ok ? res.json() : null)
      .then(data => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <header>
          <div className="navbar-brand">
              <h1>Portrait Portal</h1>
              <img src="/images/logo_portrait_portal.png" alt="Logo" />
          </div>

          <nav>
            <menu>
              <li className="nav-item">
                 <NavLink className='nav-link' to='/'>Home</NavLink>
                  </li>
              <li className="nav-item">
                 <NavLink className='nav-link' to='/gallery'>Gallery</NavLink>
              </li>
              <li className="nav-item">
                 <NavLink className='nav-link' to='/about'>About</NavLink>
              </li>

             {user ? (
               <>
                 <li className="nav-item">
                     <NavLink className='nav-link' to='/commission'>Request Commission</NavLink>
                 </li>
                 <li className="nav-item">
                     <NavLink className='nav-link' to='/dashboard'>Dashboard</NavLink>
                 </li>
                 <li className="nav-item">
                     <NavLink className='nav-link' to='/logout'>Logout</NavLink>
                 </li>
               </>
             ) : (
               <li className="nav-item">
                   <NavLink className='nav-link' to='/login'>Login/Register</NavLink>
               </li>
             )}
            </menu>
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/login' element={<Login onLogin={setUser} />} />
          <Route path='/logout' element={<Logout onLogout={setUser} />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/about' element={<About />} />
          <Route path='/commission' element={user ? <Commission /> : <Navigate to="/login" replace />} />
          <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
          <span>Creator: Neve Callaway</span>
          <a href="https://github.com/nevecallaway/startup">GitHub</a>
        </footer>
      </div>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}