import React from 'react';
import { useNavigate } from 'react-router-dom';
import './gallery.css';

export function Gallery() {
  const navigate = useNavigate();
  
  const toAbout = () => navigate('/about');
  const toLogin = () => navigate('/login');
  const toCommission = () => {
    const isAuth = !!localStorage.getItem('authToken');
    navigate(isAuth ? '/commission' : '/login');
  };

  const images = Array.from({ length: 25 }, (_, i) => `/images/gallery_${i + 2}.jpg`);

  return (
    <main>
      <section className="gallery-hero">
        <div className="hero-inner">
          <h2>Portrait Gallery</h2>
          <p>Browse examples of custom digital portraits created for clients. Each piece tells a unique story and captures precious memories.</p>
        </div>
      </section>
 
      {/* Mosaic Gallery */}
      <section className="gallery-section">
        <div className="section-inner">
          <h3>Custom Portrait Collection</h3>

          <div className="gallery-mosaic">
            <div className="gallery-inner">
              {images.map((src, idx) => (
                <img key={idx} src={src} alt={`Custom Portrait ${idx + 2}`} />
              ))}
            </div>
          </div>
        </div>
      </section>
 
      <section>
        <h3>Commission Your Portrait</h3>
        <p>See something you like? Each portrait is custom-created to capture your unique story and vision.</p>

        <button type="button" onClick={toCommission}>Request Your Commission</button>
        <button type="button" onClick={toAbout}>Learn About the Process</button>

        <h4>Commission requests require an account.</h4>
        <h4>
          <button type="button" onClick={toLogin} className="small-link">Login or register</button> to get started.
        </h4>
      </section>
    </main>
  );
}