import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const q1 = await prisma.pollQuestion.create({
    data: {
      question: "What color is the sky?",
      isRadio: true,
    }
  });

  ["blue", "red", "green", "yellow"].forEach(async (res, i) => {
    await prisma.pollOption.create({
      data: {
        questionId: q1.id,
        text: res,
        orderNumber: i,
      }
    });
  });

  const q2 = await prisma.pollQuestion.create({
    data: {
      question: "Which of the following are even?",
      isRadio: false,
    }
  });

  ["1", "2", "3", "4"].forEach(async (res, i) => {
    await prisma.pollOption.create({
      data: {
        questionId: q2.id,
        text: res,
        orderNumber: i,
      }
    });
  });
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => await prisma.$disconnect());
