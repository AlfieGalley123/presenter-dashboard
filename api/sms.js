import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { From, Body } = req.body;

  const message = {
    from: From || 'Unknown',
    body: Body,
    time: new Date().toLocaleString(),
  };

  const filePath = 'data/messages.json';
  try {
    const existing = JSON.parse(await fs.readFile(filePath, 'utf8'));
    existing.unshift(message); // newest first
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2));
    res.status(200).end();
  } catch (err) {
    console.error('Error writing message:', err);
    res.status(500).json({ error: 'Failed to save message' });
  }
}