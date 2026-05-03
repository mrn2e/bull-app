import fs from 'fs';
import path from 'path';

const schedulePath = path.join(process.cwd(), 'bull-calendar-events-data.json');

export default async function handler(req, res) {
  const data = JSON.parse(fs.readFileSync(schedulePath, 'utf8'));
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(data);
}