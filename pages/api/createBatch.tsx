import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { model, level, quantity } = req.body;

  try {
    // Create a batch with the entered details
    const createdBatch = await prisma.batchForm.create({
      data: {
        model,
        level,
        quantity,
        serialNum: '' + (Math.floor(Math.random() * 100)),
      },
    });

    return res.status(201).json({ message: 'Batch created successfully', batch: createdBatch });
  } catch (error) {
    console.error('Error creating batch:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
