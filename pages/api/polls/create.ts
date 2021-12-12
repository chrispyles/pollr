import { NextApiHandler } from 'next';

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


type PollData = {
  questionText: string;
  isRadio: boolean;
  options: string[];
};


const handler: NextApiHandler = async (req, res) => {
  if (req.method == 'POST') {
    try {
      const data: PollData = await req.body;

      const question = await prisma.pollQuestion.create({
        data: {
          question: data.questionText,
          isRadio: data.isRadio,
        }
      });

      data.options.forEach(async (optionText, idx) => {
        await prisma.pollOption.create({
          data: {
            questionId: question.id,
            text: optionText,
            orderNumber: idx,
          }
        });
      });

      res.status(200).json({ success: true, questionId: question.id });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.toString());
    }
  }
  await prisma.$disconnect();
};


export default handler;
