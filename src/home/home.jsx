import React from 'react';

export function Home() {
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
          <button type="button" onclick="location.href='about.html'">Learn More</button>
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
        
          <button type="button" onclick="location.href='gallery.html'">View Full Gallery</button>

        </section>

        {/* Call to Action */}
      <section>
        <h2>Get Started</h2>
        <h4>Transform your precious memories into timeless art.</h4>

        <button type="button" onclick="location.href='login.html'" class="small-link">Request a Commission</button>
        <button type="button" onclick="location.href='about.html'" class="small-link">Learn More</button>

        <h4>Commission requests require an account.</h4>
        <h4><button type="button" onclick="location.href='login.html'" class="small-link">Login or register</button> to get started.</h4>
      </section>

    </main>
  );
}