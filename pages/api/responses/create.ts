import { NextApiHandler } from 'next';

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


type ResponseData = {
  questionId: string;
  optionIds: string[]
};


const handler: NextApiHandler = async (req, res) => {
  if (req.method == 'POST') {
    const data: ResponseData = await req.body;
    const response = await prisma.pollResponse.create({
      data: {
        questionId: parseInt(data.questionId),
      }
    });
    data.optionIds.forEach(async oid => {
      await prisma.pollResponseOption.create({
        data: {
          responseId: response.id,
          optionId: parseInt(oid),
        }
      });
    });
    res.status(200).json({ responseId: response.id });
  }
  await prisma.$disconnect();
};


export default handler;
