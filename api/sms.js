// api/sms.js
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '../../firebase-admin.json';

export const config = {
  api: {
    bodyParser: true
  }
};

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount)
  });
}

const db = getFirestore();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { From, Body } = req.body;

  try {
    await db.collection('messages').add({
      from: From || 'Unknown',
      body: Body,
      time: new Date().toISOString()
    });
    res.status(200).end();
  } catch (err) {
    console.error('🔥 Error saving SMS:', err);
    res.status(500).json({ error: 'Failed to save message' });
  }
}