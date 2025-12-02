const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('portraitportal');
const userCollection = db.collection('user');
const commissionCollection = db.collection('commission');

(async function connect() {
  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log('✓ Connected to MongoDB successfully');
  } catch (ex) {
    console.error('✗ MongoDB connection failed:', ex.message);
    process.exit(1);
  }
})();

// Users
async function getUser(email) {
  if (!email) return null;
  return await userCollection.findOne({ email });
}

async function getUserByToken(token) {
  if (!token) return null;
  return await userCollection.findOne({ token });
}

async function createUser(email, password, firstName = '') {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email,
    password: passwordHash,
    firstName,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);
  return { email: user.email, firstName: user.firstName, token: user.token };
}

async function updateUserToken(email, token) {
  await userCollection.updateOne({ email }, { $set: { token } });
}

async function clearUserToken(token) {
  await userCollection.updateOne({ token }, { $unset: { token: '' } });
}

// Commissions
async function addCommission(commission) {
  await commissionCollection.insertOne(commission);
  return commission;
}

async function getCommissions(email) {
  return await commissionCollection.find({ owner: email }).toArray();
}

async function getCommissionById(id) {
  return await commissionCollection.findOne({ id });
}

async function addMessageToCommission(id, owner, message) {
  await commissionCollection.updateOne({ id, owner }, { $push: { messages: message } });
}

async function updateCommissionProgress(id, progress) {
  // merge provided keys into existing progress object
  await commissionCollection.updateOne(
    { id },
    { $set: Object.fromEntries(Object.entries(progress).map(([k,v]) => [`progress.${k}`, v])) }
  );
  return commissionCollection.findOne({ id });
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  updateUserToken,
  clearUserToken,
  addCommission,
  getCommissions,
  getCommissionById,
  addMessageToCommission,
  updateCommissionProgress,
};