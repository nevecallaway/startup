import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

export function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(() => localStorage.getItem('userName') || 'Client');
  const [commissions, setCommissions] = useState([]);
  const [drafts, setDrafts] = useState({});

  useEffect(() => {
    function reloadFromStorage() {
      try {
        const raw = localStorage.getItem('commissions');
        const stored = raw ? JSON.parse(raw) : [];
        setCommissions(stored.slice().reverse());
      } catch (e) {
        console.warn('Failed to parse commissions from storage', e);
        setCommissions([]);
      }
    }

    // initial load
    reloadFromStorage();

    // respond to simulated server pushes
    window.addEventListener('commissions:updated', reloadFromStorage);
    return () => {
      window.removeEventListener('commissions:updated', reloadFromStorage);
    };
  }, []);

  useEffect(() => {
    try {
      // persist in actual oldest-first order
      const toSave = commissions.slice().reverse();
      localStorage.setItem('commissions', JSON.stringify(toSave));
    } catch (e) {
      console.error('Failed to save commissions', e);
    }
  }, [commissions]);

  function isAuth() {
    return !!localStorage.getItem('authToken');
  }

  function handleRequestCommission() {
    navigate(isAuth() ? '/commission' : '/login');
  }

  function handleDraftChange(id, value) {
    setDrafts(prev => ({ ...prev, [id]: value }));
  }

  function handleSendMessage(e, id) {
    e.preventDefault();
    const text = (drafts[id] || '').trim();
    if (!text) return;
    setCommissions(prev => {
      const updated = prev.map(c => {
        if (c.id === id) {
          const msgs = c.messages ? [...c.messages] : [];
          msgs.push({
            from: 'You',
            text,
            at: new Date().toISOString()
          });
          return { ...c, messages: msgs };
        }
        return c;
      });
      return updated;
    });
    setDrafts(prev => ({ ...prev, [id]: '' }));
  }

  function formatDate(iso) {
    try { return new Date(iso).toLocaleString(); } catch { return iso; }
  }

  return (
    <main className="dashboard-main">
      <section>
        <h2>Welcome back, {userName}!</h2>
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
        {commissions.filter(c => c.status !== 'completed').length === 0 && <p>No active commissions.</p>}
        {commissions.filter(c => c.status !== 'completed').map(c => (
          <article key={c.id} className="commission-card">
            <h3>{c.form?.commissionTitle || 'Untitled Commission'}</h3>
            <div className="commission-meta">
              <p><strong>Status:</strong> {c.status}</p>
              <p><strong>Artist:</strong> {c.artist || 'Neve Callaway'}</p>
              <p><strong>Submitted:</strong> {formatDate(c.createdAt)}</p>
              <p><strong>Description:</strong> {c.form?.storyDescription || '—'}</p>
            </div>

            <div className="commission-progress">
              <p><strong>Progress:</strong></p>
              <ul>
                <li>{c.progress?.received ? '✅ Order Received' : 'Order Received'}</li>
                <li>{c.progress?.consulted ? '✅ Initial Consultation' : 'Initial Consultation'}</li>
                <li>{c.progress?.sketch ? '🎨 Sketching' : 'Sketching'}</li>
                <li>{c.progress?.painting ? '⏳ Painting' : 'Painting'}</li>
                <li>{c.progress?.final ? '⏳ Final Review' : 'Final Review'}</li>
                <li>{c.progress?.shipped ? '⏳ Shipping' : 'Shipping'}</li>
              </ul>
            </div>

            <div className="commission-messages">
              <h4>Recent Messages</h4>
              {(c.messages || []).slice(-5).map((m, i) => (
                <div key={i} className="message-row">
                  <p><strong>{m.from} ({formatDate(m.at)}):</strong> {m.text}</p>
                </div>
              ))}

              <form onSubmit={(e) => handleSendMessage(e, c.id)}>
                <label htmlFor={`msg-${c.id}`}>Send Message:</label><br />
                <textarea
                  id={`msg-${c.id}`}
                  name={`message-${c.id}`}
                  placeholder="Type your message here..."
                  rows={3}
                  value={drafts[c.id] || ''}
                  onChange={(e) => handleDraftChange(c.id, e.target.value)}
                />
                <div className="button-row">
                  <button type="submit">Send</button>
                  <button type="button" onClick={() => handleRequestCommission()}>Request New Commission</button>
                </div>
              </form>
            </div>
          </article>
        ))}
      </section>

      <section>
        <h2>Completed Commissions</h2>
        {commissions.filter(c => c.status === 'completed').length === 0 && <p>No completed commissions yet.</p>}
        {commissions.filter(c => c.status === 'completed').map(c => (
          <article key={c.id} className="commission-card">
            <h3>{c.form?.commissionTitle || 'Completed Commission'}</h3>
            <p><strong>Completed:</strong> {formatDate(c.completedAt || c.createdAt)}</p>
            <p><strong>Description:</strong> {c.form?.storyDescription || '—'}</p>
            <div className="button-row">
              <button type="button" onClick={() => handleRequestCommission()}>Request New Commission</button>
            </div>
          </article>
        ))}
      </section>

      <section>
        <h2>Account Summary</h2>
        <p><strong>Total Commissions:</strong> {commissions.length}</p>
        <p><strong>Active Orders:</strong> {commissions.filter(c => c.status !== 'completed').length}</p>
        <p><strong>Completed Orders:</strong> {commissions.filter(c => c.status === 'completed').length}</p>
      </section>
    </main>
  );
}