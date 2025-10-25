import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  const goAbout = () => navigate('/about');
  const goGallery = () => navigate('/gallery');
  const goLogin = () => navigate('/login');
  const goCommission = () => {
    const isAuth = !!localStorage.getItem('authToken');
    navigate(isAuth ? '/commission' : '/login');
  };

  return (
    <main>
        {/* About preview section */}
        <section>
          <h2>Step through the Portrait Portal</h2>
          <h3>Where memories become magic</h3>
          <h4>Commissioning custom and cherished art has never been more seamless or magical.</h4>
          <h4>Upload your photos, share your vision, and watch as
            your memories are reborn as beautiful, hand-crafted portraits.</h4>
          <h4>Get real-time progress updates and direct communication throughout the creative journey.</h4>
          <button type="button" onClick={goAbout}>Learn More</button>
        </section>

        {/* Gallery preview section */}
        <section>
          <h2>Gallery</h2>
          <h4>Browse custom portrait examples:</h4>

          {/* Gallery preview with actual images */}
          <div class="gallery-container">
            <img src="../images/gallery_2.jpg" alt="Pet Portrait Example" />
            <img src="../images/gallery_6.jpg" alt="Memorial Portrait Example" />
            <img src="../images/gallery_14.jpg" alt="Individual Portrait Example" />
          </div>

          <button type="button" onClick={goGallery}>View Full Gallery</button>

        </section>

        {/* Call to Action */}
      <section>
        <h2>Get Started</h2>
        <h4>Transform your precious memories into timeless art.</h4>

        <button type="button" onClick={goCommission} class="small-link">Request a Commission</button>
        <button type="button" onClick={goAbout} class="small-link">Learn More</button>

        <h4>Commission requests require an account.</h4>
        <h4><button type="button" onClick={goLogin} class="small-link">Login or register</button> to get started.</h4>
      </section>

    </main>
  );
}