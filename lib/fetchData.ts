import { 
  PollOption, 
  PollQuestion, 
  PollResponse, 
  PollResponseOption, 
  PrismaClient 
} from '@prisma/client';


export async function fetchQuestionData(prisma: PrismaClient, questionId: number): Promise<{
  question: PollQuestion,
  options: PollOption[],
}> {
  const question = await prisma.pollQuestion.findUnique({ where: { id: questionId }});
  const options = await prisma.pollOption.findMany({ where: { question } });
  return { question, options };
}


export async function fetchResponseData(prisma: PrismaClient, responseId: number): Promise<{
  response: PollResponse,
  responseOptions: PollResponseOption[],
}> {
  const response = await prisma.pollResponse.findUnique({ where: { id: responseId } });
  const responseOptions = await prisma.pollResponseOption.findMany({ where: { response }});
  return { response, responseOptions };
}


export async function fetchAllResponsesForQuestion(
  prisma: PrismaClient,
  questionId: number
): Promise<PollResponse[]> {
  return prisma.pollResponse.findMany({ where: { questionId } });
}
