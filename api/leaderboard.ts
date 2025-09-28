import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const { gameMode, limit } = req.query;
      if (!gameMode || typeof gameMode !== 'string') {
        return res.status(400).json({ message: 'gameMode é obrigatório' });
      }
      const leaderboard = await storage.getLeaderboard(gameMode, limit ? Number(limit) : 10);
      return res.status(200).json(leaderboard);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  res.status(405).json({ message: 'Método não permitido' });
}
