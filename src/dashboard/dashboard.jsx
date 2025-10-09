import React from 'react';

export function Dashboard() {
  return (
    <main>
      <section>
        <h2>Welcome back, [Client Name]!</h2>
        <p>Manage your portrait commissions and track progress from your dashboard.</p>
      </section>

      {/*<section>
        <h2>Quick Actions</h2>
        <div class="button-container">
          <button type="button" onclick="location.href='commission.html'">Request New Commission</button>
          <button type="button" onclick="location.href='gallery.html'">Browse Gallery</button>
          <button type="button" onclick="location.href='index.html'">Logout</button>
        </div>
      </section>*/}

      <section>
        <h2>Active Commissions</h2>
        
        <div>
          <h3>Family Portrait</h3>
          <div>
            <p><strong>Status:</strong> In Progress - Sketching Phase</p>
            <p><strong>Artist:</strong> Neve Callaway</p>
            <p><strong>Submitted:</strong> October 15, 2024</p>
            <p><strong>Estimated Completion:</strong> November 30, 2024</p>
            <p><strong>Description:</strong> 16x20 family portrait with 4 family members, oil on canvas</p>
          </div>

          <div>
            <p><strong>Progress:</strong></p>
            <ul>
              <li>✅ Order Received</li>
              <li>✅ Initial Consultation</li>
              <li>🎨 Sketching (Current)</li>
              <li>⏳ Painting</li>
              <li>⏳ Final Review</li>
              <li>⏳ Shipping</li>
            </ul>
          </div>

          <div>
            <h3>Recent Messages</h3>
            <div>
              <p><strong>Artist (2 hours ago):</strong> "Hi! I've finished the initial sketch. Please review the attached image and let me know if you'd like any adjustments."</p>
            </div>
            <div>
              <p><strong>You (1 day ago):</strong> "Looking forward to seeing the progress!"</p>
            </div>
            <div>
              <p><strong>Artist (3 days ago):</strong> "Starting work on your family portrait today. I'll send updates as I progress through each stage."</p>
            </div>

            <form>
              <label for="message1">Send Message:</label>
              <textarea id="message1" name="message" placeholder="Type your message here..." rows="3" cols="50"></textarea>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>

        <div>
          <h3>Pet Portrait</h3>
          <div>
            <p><strong>Status:</strong> Awaiting Photo Approval</p>
            <p><strong>Artist:</strong> Neve Callaway</p>
            <p><strong>Submitted:</strong> October 22, 2024</p>
            <p><strong>Estimated Completion:</strong> December 15, 2024</p>
            <p><strong>Description:</strong> 12x16 pet portrait, watercolor</p>
            <p><strong>Action Needed:</strong> Please review and approve the photo selection.</p>
          </div>
          <div>
            <h3>Recent Messages</h3>
            <div>
              <p><strong>Artist (6 hours ago):</strong> "I've selected 3 photos that would work well for the watercolor style. Please let me know which one you prefer or if you'd like me to use a different photo."</p>
            </div>
            <div>
              <p><strong>You (1 day ago):</strong> "Uploaded 10 photos of Max. Use whichever works best for the composition!"</p>
            </div>
            
            <form>
              <label for="message2">Send Message:</label>
              <textarea id="message2" name="message" placeholder="Type your message here..." rows="3" cols="50"></textarea>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
        <button type="button" onclick="location.href='commission.html'">Request New Commission</button>
      </section>

      <section>
        <h2>Completed Commissions</h2>
        
        <div>
          <h3>Wedding Portrait</h3>
          <p><strong>Status:</strong>Completed & Delivered</p>
          <p><strong>Completed:</strong> September 28, 2024</p>
          <p><strong>Description:</strong> 20x24 wedding portrait, oil on canvas</p>
        </div>
        <button type="button" onclick="location.href='commission.html'">Request New Commission</button>
      </section>

      <section>
        <h2>Account Summary</h2>
        <p><strong>Total Commissions:</strong> 3</p>
        <p><strong>Active Orders:</strong> 2</p>
        <p><strong>Completed Orders:</strong> 1</p>
        
      </section>
    </main>
  );
}