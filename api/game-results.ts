import { VercelRequest, VercelResponse } from '@vercel/node';
import { insertGameResultSchema } from '../shared/schema';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const resultData = insertGameResultSchema.parse(req.body);
      const gameResult = await storage.createGameResult(resultData);
      return res.status(200).json(gameResult);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
  res.status(405).json({ message: 'Method Not Allowed' });
}
