import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function handler(req, res) {
  try {
    const filePath = path.join(__dirname, 'schedule-data.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    res.status(200).json(data);
  } catch (error) {
    console.error('API ERROR:', error);
    res.status(500).json({ error: 'Failed to load schedule' });
  }
}