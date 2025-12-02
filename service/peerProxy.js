const { WebSocketServer } = require('ws');
const DB = require('./database.js');
const uuid = require('uuid');

function parseCookies(cookieHeader = '') {
  return cookieHeader.split(';').map(c => c.trim()).filter(Boolean).reduce((acc, kv) => {
    const [k, v] = kv.split('=');
    if (k && v) acc[k] = decodeURIComponent(v);
    return acc;
  }, {});
}

function peerProxy(httpServer) {
  const socketServer = new WebSocketServer({ server: httpServer, path: '/ws' });

  socketServer.on('connection', async (socket, req) => {
    socket.isAlive = true;
    socket.subscription = null;

    // authenticate using token cookie
    try {
      const cookies = parseCookies(req.headers.cookie || '');
      const token = cookies.token;
      const user = token ? await DB.getUserByToken(token) : null;
      if (!user) {
        socket.send(JSON.stringify({ type: 'error', msg: 'Unauthorized' }));
        socket.terminate();
        return;
      }
      socket.userEmail = user.email;
    } catch (err) {
      socket.send(JSON.stringify({ type: 'error', msg: 'Auth failed' }));
      socket.terminate();
      return;
    }

    // incoming messages (JSON)
    socket.on('message', async (raw) => {
      let text = (typeof raw === 'string') ? raw : raw.toString();
      let obj;
      try { obj = JSON.parse(text); } catch { return; }

      // subscribe to a commission: { type: 'subscribe', commissionId: 123 }
      if (obj.type === 'subscribe') {
        socket.subscription = Number(obj.commissionId);
        socket.send(JSON.stringify({ type: 'subscribed', commissionId: socket.subscription }));
        return;
      }

      // chat message can be either:
      // { type: 'message', commissionId, text }  => persist then broadcast
      // or { type: 'message', commissionId, message: { ... } } => already persisted, just broadcast
      if (obj.type === 'message') {
        const commissionId = Number(obj.commissionId);
        if (!commissionId) {
          socket.send(JSON.stringify({ type: 'error', msg: 'commissionId required' }));
          return;
        }

        // determine message object
        let message;
        if (obj.message && obj.message.id) {
          message = obj.message;
        } else {
          const messageText = String(obj.text || '').trim();
          if (!messageText) {
            socket.send(JSON.stringify({ type: 'error', msg: 'text required' }));
            return;
          }
          message = {
            id: uuid.v4(),
            from: socket.userEmail,
            text: messageText,
            createdAt: new Date().toISOString()
          };
          // persist the message (find commission to get owner)
          const commission = await DB.getCommissionById(commissionId);
          if (!commission) {
            socket.send(JSON.stringify({ type: 'error', msg: 'Commission not found' }));
            return;
          }
          // ensure sender is participant (owner or artist)
          const allowed = (commission.owner === socket.userEmail) || (commission.artist === socket.userEmail);
          if (!allowed) {
            socket.send(JSON.stringify({ type: 'error', msg: 'Forbidden' }));
            return;
          }
          await DB.addMessageToCommission(commissionId, commission.owner, message);
        }

        // broadcast only to clients subscribed to this commission
        socketServer.clients.forEach((client) => {
          if (client.readyState === 1 && client.subscription === commissionId) {
            client.send(JSON.stringify({ type: 'message', commissionId, message }));
          }
        });
      }
    });

    // keepalive handling
    socket.on('pong', () => {
      socket.isAlive = true;
    });
  });

  // Periodically ping clients and terminate dead ones
  const interval = setInterval(() => {
    socketServer.clients.forEach((client) => {
      if (client.isAlive === false) return client.terminate();
      client.isAlive = false;
      client.ping();
    });
  }, 10000);

  socketServer.on('close', () => clearInterval(interval));
}

module.exports = { peerProxy };