import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './commission.css';
import { simulateProgress } from '../simulateServer';

export function Commission() {
  const navigate = useNavigate();
  const toDashboard = () => {
    const isAuth = !!localStorage.getItem('authToken');
    navigate(isAuth ? '/dashboard' : '/login');
  };

  const [form, setForm] = useState({
    subjectCount: '',
    orientation: '',
    sizeRatio: '',
    photoNotes: '',
    commissionTitle: '',
    storyDescription: '',
    specificRequests: '',
    colorNotes: '',
    termsAgreement: false,
    communicationAgreement: false,
    selectedPalette: '#E8B4B8,#D4A574,#9CAF88,#7FB3D3,#C8A2C8',
  });

  const [files, setFiles] = useState([]);
  const [palette, setPalette] = useState(['#E8B4B8','#D4A574','#9CAF88','#7FB3D3','#C8A2C8']);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  function handleFiles(e) {
    const list = Array.from(e.target.files || []);
    setFiles(list);
  }

  function randomColor() {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
  }
  function randomPalette() {
    const p = Array.from({length:5}, () => randomColor());
    setPalette(p);
    setForm(prev => ({ ...prev, selectedPalette: p.join(',') }));
  }
  function warmPalette() {
    const p = ['#FFB4A2','#FF7F50','#D96C3B','#C85A3B','#8B2D2D'];
    setPalette(p);
    setForm(prev => ({ ...prev, selectedPalette: p.join(',') }));
  }
  function coolPalette() {
    const p = ['#B3E5FC','#81D4FA','#4FC3F7','#29B6F6','#0288D1'];
    setPalette(p);
    setForm(prev => ({ ...prev, selectedPalette: p.join(',') }));
  }
  function neutralPalette() {
    const p = ['#F5F5F5','#E0E0E0','#BDBDBD','#9E9E9E','#616161'];
    setPalette(p);
    setForm(prev => ({ ...prev, selectedPalette: p.join(',') }));
  }

  function pickPaletteColor(index) {
    setForm(prev => ({ ...prev, selectedPalette: palette.join(',') }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.termsAgreement || !form.communicationAgreement) {
      setError('You must agree to the commission terms and communication expectations.');
      return;
    }
    if (!form.commissionTitle || !form.storyDescription) {
      setError('Please provide a title and a description for the commission.');
      return;
    }

    setSaving(true);
    try {
      const commissions = JSON.parse(localStorage.getItem('commissions') || '[]');
      const owner = localStorage.getItem('userEmail') || 'guest';
      const id = Date.now();
      const savedFiles = files.map(f => ({ name: f.name, size: f.size, type: f.type }));
      const newCommission = {
        id,
        owner,
        createdAt: new Date().toISOString(),
        form: { ...form },
        files: savedFiles,
        status: 'submitted',
        progress: {}
      };
      commissions.push(newCommission);
      localStorage.setItem('commissions', JSON.stringify(commissions));

      // start simulated server-side progress updates
      simulateProgress(id);

      toDashboard();
    } catch (err) {
      setError('Failed to save commission. Try again.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  }
  
  return (
    <main className="commission-main">
      <section>
        <h2>Request Your Custom Digital Portrait</h2>
        <p>Transform your precious memories into stunning digital art. Simply upload your photos, share your vision, and watch as your memories are reborn as beautiful, hand-crafted digital portraits.</p>
      </section>

      <section>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <h3>Commission Details</h3>

            <label htmlFor="subjectCount">Number of Subjects:</label>
            <select id="subjectCount" name="subjectCount" value={form.subjectCount} onChange={handleChange} required>
              <option value="">Select number...</option>
              <option value="1">Single Subject ($150)</option>
              <option value="2">Two Subjects ($200)</option>
              <option value="3-4">Family Group: 3-4 people ($300)</option>
              <option value="5+">Large Group: 5+ people ($400+)</option>
            </select>

            <label htmlFor="orientation">Portrait Orientation:</label>
            <select id="orientation" name="orientation" value={form.orientation} onChange={handleChange} required>
              <option value="">Select orientation...</option>
              <option value="portrait">Portrait (Vertical)</option>
              <option value="landscape">Landscape (Horizontal)</option>
              <option value="square">Square</option>
              <option value="flexible">Artist's Choice</option>
            </select>

            <label htmlFor="sizeRatio">Preferred Size Ratio:</label>
            <select id="sizeRatio" name="sizeRatio" value={form.sizeRatio} onChange={handleChange}>
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
            <p>Upload high-resolution photos for your portrait. (JPG/PNG, max 10)</p>
            <label htmlFor="photoUpload">Select Photos:</label>
            <input id="photoUpload" name="photoUpload" type="file" accept="image/*" multiple onChange={handleFiles} />
            {files.length > 0 && (
              <div className="selected-files">
                <strong>Selected files:</strong>
                <ul>
                  {files.map((f, i) => <li key={i}>{f.name} ({Math.round(f.size/1024)} KB)</li>)}
                </ul>
              </div>
            )}
            <label htmlFor="photoNotes">Photo Notes:</label>
            <textarea id="photoNotes" name="photoNotes" rows="2" cols="60" value={form.photoNotes} onChange={handleChange} placeholder="Which photo is your favorite? Any specific details you'd like emphasized?" />
          </div>

          <div>
            <h3>Tell Your Story</h3>

            <label htmlFor="commissionTitle">Commission Title:</label>
            <input type="text" id="commissionTitle" name="commissionTitle" value={form.commissionTitle} onChange={handleChange} placeholder="'Family Christmas Portrait,' 'Memorial for Grandma,' etc." required />

            <label htmlFor="storyDescription">What's the story behind this commission?</label>
            <textarea id="storyDescription" name="storyDescription" rows="5" cols="60" value={form.storyDescription} onChange={handleChange} placeholder="Tell me about the people/pets in the photos, the occasion, what this portrait means to you..." required></textarea>

            <label htmlFor="specificRequests">Specific Requests:</label>
            <textarea id="specificRequests" name="specificRequests" rows="3" cols="60" value={form.specificRequests} onChange={handleChange} placeholder="Any specific colors, mood, background preferences, or artistic elements you'd like included?"></textarea>
          </div>

          <div>
            <h3>Color Palette Preferences</h3>
            <p>Choose a color scheme to inspire your portrait. These palettes will help guide the artistic vision.</p>

            <div className="palette-buttons">
              <button type="button" onClick={randomPalette}>Generate Random Palette</button>
              <button type="button" onClick={warmPalette}>Warm Tones</button>
              <button type="button" onClick={coolPalette}>Cool Tones</button>
              <button type="button" onClick={neutralPalette}>Neutral Tones</button>
            </div>
            
            <div id="colorPaletteDisplay">
              <p><strong>Selected Color Palette:</strong></p>
              <div id="colorSwatches" className="color-swatches">
                {palette.map((c, i) => {
                  const selectedColors = form.selectedPalette ? form.selectedPalette.split(',') : [];
                  const isSelected = selectedColors.includes(c);
                  return (
                    <div
                      key={i}
                      className={`color-swatch ${isSelected ? 'selected' : ''}`}
                      onClick={() => pickPaletteColor(i)}
                      title={c}
                      style={{ backgroundColor: c }}
                    />
                  );
                })}
              </div>
            </div>

            <input type="hidden" id="selectedPalette" name="selectedPalette" value={form.selectedPalette} />

            <label htmlFor="colorNotes">Color Preferences & Notes:</label>
            <textarea id="colorNotes" name="colorNotes" rows="2" cols="60" value={form.colorNotes} onChange={handleChange} placeholder="Any specific color preferences, colors to avoid, or how you'd like the palette applied?"></textarea>
          </div>

          <div>
            <input type="checkbox" id="termsAgreement" name="termsAgreement" checked={form.termsAgreement} onChange={handleChange} />
            <label htmlFor="termsAgreement">I agree to the commission terms: 50% deposit required to begin work, final payment due upon completion.</label>

            <input type="checkbox" id="communicationAgreement" name="communicationAgreement" checked={form.communicationAgreement} onChange={handleChange} />
            <label htmlFor="communicationAgreement">I understand this is a collaborative process and agree to provide timely feedback.</label>
          </div>

          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={saving}>{saving ? 'Submitting...' : 'Submit Commission Request'}</button>

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
        <button type="button" onClick={toDashboard}>Contact me directly.</button>
      </section>
    </main>
  );
}