export function simulateProgress(commissionId) {
  let timers = [];

  function updateCommission(update) {
    try {
      const raw = localStorage.getItem('commissions');
      const stored = raw ? JSON.parse(raw) : [];
      const idx = stored.findIndex(c => c.id === commissionId);
      if (idx === -1) return;
      const merged = { ...stored[idx], ...update };
      stored[idx] = merged;
      localStorage.setItem('commissions', JSON.stringify(stored));
      // notify app components, Dashboard is listening for this event
      window.dispatchEvent(new CustomEvent('commissions:updated', { detail: merged }));
    } catch (e) {
      console.warn('simulateProgress update failed', e);
    }
  }

  function getProgressFor() {
    try {
      const raw = localStorage.getItem('commissions');
      const stored = raw ? JSON.parse(raw) : [];
      const c = stored.find(x => x.id === commissionId);
      return (c && c.progress) ? c.progress : {};
    } catch {
      return {};
    }
  }

  // staged updates
  timers.push(setTimeout(() => updateCommission({ status: 'received', progress: { ...getProgressFor(), received: true } }), 2000));
  timers.push(setTimeout(() => updateCommission({ status: 'consulted', progress: { ...getProgressFor(), consulted: true } }), 6000));
  timers.push(setTimeout(() => updateCommission({ status: 'sketch', progress: { ...getProgressFor(), sketch: true } }), 12000));
  timers.push(setTimeout(() => updateCommission({ status: 'painting', progress: { ...getProgressFor(), painting: true } }), 20000));
  timers.push(setTimeout(() => updateCommission({ status: 'final', progress: { ...getProgressFor(), final: true } }), 28000));
  timers.push(setTimeout(() => updateCommission({ status: 'completed', progress: { ...getProgressFor(), shipped: true }, completedAt: new Date().toISOString() }), 34000));

  return {
    cancel() {
      timers.forEach(t => clearTimeout(t));
      timers = [];
    }
  };
}