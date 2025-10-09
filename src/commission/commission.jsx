import React from 'react';
import './commission.css';

export function Commission() {
  return (
    <main>
      <section>
        <h2>Request Your Custom Digital Portrait</h2>
        <p>Transform your precious memories into stunning digital art. Simply upload your photos, share your vision, and watch as your memories are reborn as beautiful, hand-crafted digital portraits.</p>
      </section>

      <section>
        <form method="post" action="dashboard.html" enctype="multipart/form-data">
          
          <div>
            <h3>Commission Details</h3>
            
            <label for="subjectCount">Number of Subjects:</label>
            <select id="subjectCount" name="subjectCount" required>
              <option value="">Select number...</option>
              <option value="1">Single Subject ($150)</option>
              <option value="2">Two Subjects ($200)</option>
              <option value="3-4">Family Group: 3-4 people ($300)</option>
              <option value="5+">Large Group: 5+ people ($400+)</option>
            </select>
            
            <label for="orientation">Portrait Orientation:</label>
            <select id="orientation" name="orientation" required>
              <option value="">Select orientation...</option>
              <option value="portrait">Portrait (Vertical)</option>
              <option value="landscape">Landscape (Horizontal)</option>
              <option value="square">Square</option>
              <option value="flexible">Artist's Choice</option>
            </select>
            
            <label for="sizeRatio">Preferred Size Ratio:</label>
            <select id="sizeRatio" name="sizeRatio">
              <option value="">No preference</option>
              <option value="4:5">4:5 (Instagram portrait)</option>
              <option value="3:4">3:4 (Traditional portrait)</option>
              <option value="2:3">2:3 (Classic photo ratio)</option>
              <option value="16:9">16:9 (Widescreen landscape)</option>
              <option value="3:2">3:2 (Standard landscape)</option>
              <option value="1:1">1:1 (Square)</option>
              <option value="custom">Custom ratio (specify in notes)</option>
            </select>
          </div>
          
          <div>
            <h3>Upload Reference Photos</h3>
            <p>Upload high-resolution photos for your portrait.</p>
            
            <label for="photoUpload">Select Photos:</label>
            <input type="file" id="photoUpload" name="photoUpload" accept="image/*"/>
            <p><small>Supported formats: JPG, PNG. Maximum 10 photos.</small></p>
            
            <label for="photoNotes">Photo Notes:</label>
            <textarea id="photoNotes" name="photoNotes" rows="2" cols="60" placeholder="Which photo is your favorite? Any specific details you'd like emphasized?"></textarea>
          </div>
          
          <div>
            <h3>Tell Your Story</h3>
            
            <label for="commissionTitle">Commission Title:</label>
            <input type="text" id="commissionTitle" name="commissionTitle" placeholder="'Family Christmas Portrait,' 'Memorial for Grandma,' etc." required />
            
            <label for="storyDescription">What's the story behind this commission?</label>
            <textarea id="storyDescription" name="storyDescription" rows="5" cols="60" placeholder="Tell me about the people/pets in the photos, the occasion, what this portrait means to you..." required></textarea>
            
            <label for="specificRequests">Specific Requests:</label>
            <textarea id="specificRequests" name="specificRequests" rows="3" cols="60" placeholder="Any specific colors, mood, background preferences, or artistic elements you'd like included?"></textarea>
          </div>
          
          <div>
            <h3>Color Palette Preferences</h3>
            <p>Choose a color scheme to inspire your portrait. These palettes will help guide the artistic vision.</p>
            
            <button type="button" onclick="generateColorPalette()">Generate Random Palette</button>
            <button type="button" onclick="generateWarmPalette()">Warm Tones</button>
            <button type="button" onclick="generateCoolPalette()">Cool Tones</button>
            <button type="button" onclick="generateNeutralPalette()">Neutral Tones</button>
            
            <div id="colorPaletteDisplay">
              <p><strong>Selected Color Palette:</strong></p>
              <div id="colorSwatches">
                <div style="background-color: #E8B4B8; width: 50px; height: 50px; display: inline-block; margin: 5px;"></div>
                <div style="background-color: #D4A574; width: 50px; height: 50px; display: inline-block; margin: 5px;"></div>
                <div style="background-color: #9CAF88; width: 50px; height: 50px; display: inline-block; margin: 5px;"></div>
                <div style="background-color: #7FB3D3; width: 50px; height: 50px; display: inline-block; margin: 5px;"></div>
                <div style="background-color: #C8A2C8; width: 50px; height: 50px; display: inline-block; margin: 5px;"></div>
              </div>
            </div>
            
            <input type="hidden" id="selectedPalette" name="selectedPalette" value="#E8B4B8,#D4A574,#9CAF88,#7FB3D3,#C8A2C8" />
            
            <label for="colorNotes">Color Preferences & Notes:</label>
            <textarea id="colorNotes" name="colorNotes" rows="2" cols="60" placeholder="Any specific color preferences, colors to avoid, or how you'd like the palette applied?"></textarea>
          </div>
          
          <div>
            <input type="checkbox" id="termsAgreement" name="termsAgreement" required />
            <label for="termsAgreement">I agree to the commission terms: 50% deposit required to begin work, final payment due upon completion.</label>
            
            <input type="checkbox" id="communicationAgreement" name="communicationAgreement" required />
            <label for="communicationAgreement">I understand this is a collaborative process and agree to provide timely feedback.</label>
          </div>
          
          <button type="submit">Submit Commission Request</button>
          
        </form>
      </section>

      <section>
        <h2>What Happens Next?</h2>
        
        <div>
          <p><strong>1. Digital Consultation & Planning</strong></p>
          <p>I'll review your photos and vision, then provide digital mockups and style recommendations. We'll finalize composition, color palette, and artistic approach before I begin.</p>
        </div>
        
        <div>
          <p><strong>2. Digital Creation Process</strong></p>
          <p>Your portrait comes to life through digital stages: initial sketch, base colors, detailed rendering, and final touches. You'll receive work-in-progress screenshots throughout the process.</p>
        </div>
        
        <div>
          <p><strong>3. Review & Digital Refinement</strong></p>
          <p>Before completion, you'll receive a preview file for review. Minor adjustments can be made quickly in the digital medium to ensure perfect satisfaction.</p>
        </div>
        
        <div>
          <p><strong>4. Digital Delivery</strong></p>
          <p>Your finished digital portrait is delivered as high-resolution files (PNG, JPEG) via secure download. Print-ready files included for home printing or professional printing services.</p>
        </div>
        
        <p><strong>Have questions about digital art? I'm open to alternative commission ideas.</strong></p>
        <button type="button">Contact me directly.</button>
      </section>
    </main>
  );
}