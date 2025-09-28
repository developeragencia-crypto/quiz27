import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const { playerId } = req.query;
      if (!playerId || typeof playerId !== 'string') {
        return res.status(400).json({ message: 'playerId é obrigatório' });
      }
      const results = await storage.getPlayerGameResults(playerId);
      return res.status(200).json(results);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  res.status(405).json({ message: 'Método não permitido' });
}
