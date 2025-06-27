import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { user, data } = req.body;
  if (!user || !Array.isArray(data)) return res.status(400).json({ error: 'Invalid body' });

  const dirPath = path.resolve('./data');
  const filePath = path.join(dirPath, `${user}.json`);

  // Pastikan folder data ada
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);

  fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
    if (err) return res.status(500).json({ error: 'Gagal simpan file' });
    res.status(200).json({ success: true });
  });
}
