import React, { useState, useEffect } from 'react';
import './dashboard.css';

export function Dashboard() {
  const [userName, setUserName] = useState('User');
  const [commissions, setCommissions] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        // Fetch current user
        const userRes = await fetch('/api/me', { credentials: 'include' });
        if (userRes.ok) {
          const userData = await userRes.json();
          setUserName(userData.email);
        }

        // Fetch commissions
        const commRes = await fetch('/api/commissions', { credentials: 'include' });
        if (!commRes.ok) throw new Error('Failed to load commissions');
        const commData = await commRes.json();
        setCommissions(commData);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <main><section><h2>Loading dashboard...</h2></section></main>;
  }

  if (error) {
    return <main><section><h2>Error</h2><p className="error">{error}</p></section></main>;
  }

  const activeCommissions = commissions.filter(c => c.status !== 'completed');
  const completedCommissions = commissions.filter(c => c.status === 'completed');

  function handleDraftChange(commissionId, value) {
    setDrafts(prev => ({ ...prev, [commissionId]: value }));
  }

  async function sendMessage(commissionId) {
    const text = drafts[commissionId]?.trim();
    if (!text) return;

    try {
      const res = await fetch(`/api/commissions/${commissionId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error('Failed to send message');

      const newMsg = await res.json();

      // Update local state
      setCommissions(prev => prev.map(c => {
        if (c.id === commissionId) {
          return { ...c, messages: [...(c.messages || []), newMsg] };
        }
        return c;
      }));
      setDrafts(prev => ({ ...prev, [commissionId]: '' }));
    } catch (err) {
      console.error('Send message failed', err);
      alert('Failed to send message. Please try again.');
    }
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
        {activeCommissions.length === 0 && <p>No active commissions.</p>}
        {activeCommissions.map(c => (
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

              <form onSubmit={(e) => { e.preventDefault(); sendMessage(c.id); }}>
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
        {completedCommissions.length === 0 && <p>No completed commissions yet.</p>}
        {completedCommissions.map(c => (
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
        <p><strong>Active Orders:</strong> {activeCommissions.length}</p>
        <p><strong>Completed Orders:</strong> {completedCommissions.length}</p>
      </section>
    </main>
  );
}