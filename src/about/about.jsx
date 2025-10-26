import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

export function About() {
  const navigate = useNavigate();

  const toGallery = () => navigate('/gallery');
  const toCommission = () => {
    const isAuth = !!localStorage.getItem('authToken');
    navigate(isAuth ? '/commission' : '/login');
  };
  const toDashboard = () => {
    const isAuth = !!localStorage.getItem('authToken');
    navigate(isAuth ? '/dashboard' : '/login');
  };

  return (
    <main>
      <section>
        <h2>About Portrait Portal</h2>
        <div>
          <p>Where memories become magic through digital artistry. They say a picture is worth a thousand words, but what if that picture could transport you back to your most precious moments? Portrait Portal opens a gateway to transform fleeting moments into timeless digital art. Whether it's capturing your partner's radiant smile, honoring your late grandparent's legacy, or freezing a moment of pure joy before time changes everything, I transform these precious memories into digital portals that let you revisit them forever. No more endless searching for the right artist or worrying about miscommunication! Simply upload your photos, share your vision, and watch as your memories are reborn as beautiful, hand-crafted digital portraits. With real-time progress updates and direct communication throughout the creative journey, commissioning custom digital art has never been more seamless or magical.</p>
        </div>
      </section>

      <section>
        <h2>About the Digital Artist</h2>
        <div>
          <p><strong>Neve Callaway:</strong> Digital Portrait Artist</p>
          
          <p>With over 5 years of experience in digital artistry, I specialize in creating stunning digital portraits that capture the essence of meaningful relationships and precious moments. My journey combines traditional art fundamentals with cutting-edge digital techniques.</p>
          
          <p>Each commission is a collaboration between artist and client, ensuring that every digital portrait reflects not just physical likeness, but the emotional connection and story behind the image.</p>
        </div>
        
        <div>
          <p><strong>Digital Art Specializations:</strong></p>
          <ul>
            <li>Family Portraits</li>
            <li>Pet Portraits</li>
            <li>Memorial Art</li>
            <li>Wedding & Anniversary Portraits</li>
            <li>Children's Portraits</li>
            <li>Religious Art</li>
          </ul>
        </div>
        
        <div>
          <p><strong>Tools:</strong></p>
          <ul>
            <li>Procreate</li>
            <li>iPad Air with Apple Pencil</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>How Digital Creation Works</h2>
        
        <div>
          <p><strong>1. Submit Your Commission</strong></p>
          <p>Upload your high-resolution photos and share your vision. Tell me about the story behind the image, preferred digital style, and any special requests.</p>
        </div>
        
        <div>
          <p><strong>2. Digital Consultation & Planning</strong></p>
          <p>I'll review your photos and vision, then provide digital mockups and style recommendations. We'll finalize composition, color palette, and artistic approach before I begin.</p>
        </div>
        
        <div>
          <p><strong>3. Digital Creation Process</strong></p>
          <p>Your portrait comes to life through digital stages: initial sketch, base colors, detailed rendering, and final touches. You'll receive work-in-progress screenshots throughout the process.</p>
        </div>
        
        <div>
          <p><strong>4. Review & Digital Refinement</strong></p>
          <p>Before completion, you'll receive a preview file for review. Minor adjustments can be made quickly in the digital medium to ensure perfect satisfaction.</p>
        </div>
        
        <div>
          <p><strong>5. Digital Delivery</strong></p>
          <p>Your finished digital portrait is delivered as high-resolution files (PNG, JPEG) via secure download. Print-ready files included for home printing or professional printing services.</p>
        </div>
      </section>

      <section>
        <h2>Digital Art Pricing & Timeline</h2>
        
        <div>
          <p><strong>Portrait Pricing:</strong></p>
          <ul>
            <li>Single Subject: $150 (5-7 days)</li>
            <li>Two Subjects: $200 (7-10 days)</li>
            <li>Family Group (3-4 people): $300 (10-14 days)</li>
            <li>Large Group (5+ people): $400+ (14+ days)</li>
          </ul>
        </div>
        
        <div>
          <p><strong>Digital Art Advantages:</strong></p>
          <ul>
            <li>High-resolution files suitable for any print size</li>
            <li>Easy revisions and adjustments</li>
            <li>Multiple file formats included</li>
            <li>Print-ready files included</li>
            <li>No shipping required - instant digital delivery</li>
            <li>Unlimited digital copies</li>
            <li>Rush delivery available (50% surcharge)</li>
          </ul>
        </div>
        
        <div>
          <p>Final pricing depends on complexity, number of subjects, and chosen style. All quotes provided during digital consultation.</p>
        </div>
      </section>

      <section>
        <h2>Ready to Create Digital Magic?</h2>
        <div>
          <p>Transform your precious memories into stunning digital art.</p>

          <button type="button" onClick={toCommission}>Request a Digital Commission</button>
          <button type="button" onClick={toGallery}>View Digital Gallery</button>

          <p><strong>Have questions about digital art? I'm open to alternative commission ideas.</strong></p>
          <button type="button" onClick={toDashboard}>Contact me directly.</button>
        </div>
      </section>
    </main>
  );
}