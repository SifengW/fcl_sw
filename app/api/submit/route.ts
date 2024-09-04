import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { model, date, quantity, licenseLevel } = await req.json();

    const batch = await prisma.batch.create({
      data: {
        model,
        date: new Date(date),
        quantity: parseInt(quantity, 10),
        licenseLevel: parseInt(licenseLevel, 10),
        serialNumbers: {
          create: Array.from({ length: quantity }, (_, i) => ({
            number: `SN-${model}-${i + 1}-${Date.now()}`
          }))
        }
      }
    });

    return NextResponse.json(batch, { status: 200 });
  } catch (error) {
    console.error('Error creating batch:', error);
    return NextResponse.json({ error: 'Failed to create batch' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
