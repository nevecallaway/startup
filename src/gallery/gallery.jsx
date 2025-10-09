import React from 'react';
import './gallery.css';

export function Gallery() {
  return (
    <main>
      <section>
        <h2>Portrait Gallery</h2>
        <p>Browse examples of custom digital portraits created for clients. Each piece tells a unique story and captures precious memories.</p>
      </section>

      {/* Mosaic Gallery */}
      <section>
        <h3>Custom Portrait Collection</h3>

        { /* Gallery Grid */ }
        <div className="gallery-mosaic">
          <img src="../images/gallery_2.jpg" alt="Custom Portrait 2" />
          <img src="../images/gallery_3.jpg" alt="Custom Portrait 3" />
          <img src="../images/gallery_4.jpg" alt="Custom Portrait 4" />
          <img src="../images/gallery_5.jpg" alt="Custom Portrait 5" />
          <img src="../images/gallery_6.jpg" alt="Custom Portrait 6" />
          <img src="../images/gallery_7.jpg" alt="Custom Portrait 7" />
          <img src="../images/gallery_8.jpg" alt="Custom Portrait 8" />
          <img src="../images/gallery_9.jpg" alt="Custom Portrait 9" />
          <img src="../images/gallery_10.jpg" alt="Custom Portrait 10" />
          <img src="../images/gallery_11.jpg" alt="Custom Portrait 11" />
          <img src="../images/gallery_12.jpg" alt="Custom Portrait 12" />
          <img src="../images/gallery_13.jpg" alt="Custom Portrait 13" />
          <img src="../images/gallery_14.jpg" alt="Custom Portrait 14" />
          <img src="../images/gallery_15.jpg" alt="Custom Portrait 15" />
          <img src="../images/gallery_16.jpg" alt="Custom Portrait 16" />
          <img src="../images/gallery_17.jpg" alt="Custom Portrait 17" />
          <img src="../images/gallery_18.jpg" alt="Custom Portrait 18" />
          <img src="../images/gallery_19.jpg" alt="Custom Portrait 19" />
          <img src="../images/gallery_20.jpg" alt="Custom Portrait 20" />
          <img src="../images/gallery_21.jpg" alt="Custom Portrait 21" />
          <img src="../images/gallery_22.jpg" alt="Custom Portrait 22" />
          <img src="../images/gallery_23.jpg" alt="Custom Portrait 23" />
          <img src="../images/gallery_24.jpg" alt="Custom Portrait 24" />
          <img src="../images/gallery_25.jpg" alt="Custom Portrait 25" />
          <img src="../images/gallery_26.jpg" alt="Custom Portrait 26" />
        </div>
      </section>

      <section>
        <h3>Commission Your Portrait</h3>
        <p>See something you like? Each portrait is custom-created to capture your unique story and vision.</p>
        
        <button type="button" onclick="location.href='login.html'">Request Your Commission</button>
        <button type="button" onclick="location.href='about.html'">Learn About the Process</button>
        
        <h4>Commission requests require an account.</h4>
        <h4><button type="button" onclick="location.href='login.html'" class="small-link">Login or register</button> to get started.</h4>
      </section>
    </main>
  );
}