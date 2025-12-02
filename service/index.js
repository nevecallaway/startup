const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');
const app = express();

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (!req.body || !req.body.email || !req.body.password) {
    res.status(400).send({ msg: 'email and password required' });
    return;
  }
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    // pass firstName if provided
    const user = await DB.createUser(req.body.email, req.body.password, req.body.firstName || '');
    setAuthCookie(res, user.token);
    res.send({ email: user.email, firstName: user.firstName });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = uuid.v4();
      await DB.updateUserToken(user.email, token);
      setAuthCookie(res, token);
      res.send({ email: user.email, firstName: user.firstName });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  await DB.clearUserToken(req.cookies[authCookieName]);
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// PROTECTED ROUTES BELOW
// Return current user
apiRouter.get('/me', verifyAuth, (req, res) => {
  res.send({ email: req.user.email, firstName: req.user.firstName || '' });
});

// Create a commission
apiRouter.post('/commissions', verifyAuth, async (req, res) => {
  const id = Date.now();
  const commission = {
    id,
    owner: req.user.email,
    createdAt: new Date().toISOString(),
    commissionTitle: req.body.commissionTitle || 'Untitled',
    storyDescription: req.body.storyDescription || '',
    subjectCount: req.body.subjectCount || '',
    orientation: req.body.orientation || '',
    sizeRatio: req.body.sizeRatio || '',
    photoNotes: req.body.photoNotes || '',
    specificRequests: req.body.specificRequests || '',
    colorNotes: req.body.colorNotes || '',
    selectedPalette: req.body.selectedPalette || '',
    termsAgreement: req.body.termsAgreement || false,
    communicationAgreement: req.body.communicationAgreement || false,
    status: 'submitted',
    progress: {},
    files: (req.body.files || []).map(f => ({ name: f.name, size: f.size, type: f.type })),
    messages: []
  };
  const savedCommission = await DB.addCommission(commission);
  res.status(201).send(savedCommission);
});

// List commissions for current user
apiRouter.get('/commissions', verifyAuth, async (req, res) => {
  const mine = await DB.getCommissions(req.user.email);
  res.send(mine);
});

// Append message to commission
apiRouter.post('/commissions/:id/messages', verifyAuth, async (req, res) => {
  const id = Number(req.params.id);
  const c = await DB.getCommissionById(id, req.user.email);
  if (!c) return res.status(404).send({ msg: 'Not found' });
  const msg = { id: uuid.v4(), from: req.user.email, text: req.body.text || '', createdAt: new Date().toISOString() };
  await DB.addMessageToCommission(id, req.user.email, msg);
  res.status(201).send(msg);
});

// Third-party palette endpoint (Colormind.io API)
apiRouter.get('/palette', async (_req, res) => {
  try {
    // Call Colormind.io API (free, no API key needed)
    const response = await fetch('http://colormind.io/api/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'default' })
    });
    
    if (!response.ok) {
      throw new Error(`Colormind API returned ${response.status}`);
    }
    
    const data = await response.json();
    // Colormind returns: { result: [[r,g,b], [r,g,b], [r,g,b], [r,g,b], [r,g,b]] }
    // Need to convert RGB arrays to hex color strings
    const palette = data.result.map(rgb => 
      '#' + rgb.map(v => v.toString(16).padStart(2, '0')).join('')
    );
    
    res.send({ palette });
  } catch (err) {
    console.error('Palette fetch failed:', err);
    res.status(502).send({ msg: 'Failed to fetch palette from third-party API', error: err.message });
  }
});

// Helper functions

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Default error handler (must come after all routes)
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown (must be last)
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);