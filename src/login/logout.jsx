import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Logout({ onLogout }) {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    async function logout() {
      try {
        const authRes = await fetch('/api/me', { credentials: 'include' });
        if (!authRes.ok) {
          if (onLogout) onLogout(null);
          navigate('/login');
          return;
        }

        const res = await fetch('/api/auth/logout', {
          method: 'DELETE',
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Logout failed');
        }

        if (onLogout) onLogout(null);
        navigate('/login');
      } catch (err) {
        setError('Failed to logout. Please try again.');
        console.error(err);
      }
    }

    logout();
  }, [navigate, onLogout]);

  return (
    <main>
      <section>
        <h2>Logging out...</h2>
        {error && <p className="error">{error}</p>}
      </section>
    </main>
  );
}