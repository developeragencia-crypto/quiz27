import { VercelRequest, VercelResponse } from '@vercel/node';
import { insertPlayerSchema } from '../shared/schema';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const playerData = insertPlayerSchema.parse(req.body);
      const existingPlayer = await storage.getPlayerByInstagram(playerData.instagram);
      if (existingPlayer) {
        return res.status(200).json(existingPlayer);
      }
      const player = await storage.createPlayer(playerData);
      return res.status(200).json(player);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
  res.status(405).json({ message: 'Method Not Allowed' });
}
