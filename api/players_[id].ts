import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      const player = await storage.getPlayer(id as string);
      if (!player) {
        return res.status(404).json({ message: 'Player not found' });
      }
      return res.status(200).json(player);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  res.status(405).json({ message: 'Method Not Allowed' });
}
