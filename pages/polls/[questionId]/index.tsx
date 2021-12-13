import { GetServerSideProps } from 'next';

import { PrismaClient } from '@prisma/client';

import { ReactElement } from 'react';

import Layout from '../../../components/layout';
import ResponseForm from '../../../components/response-form/response-form';

import { fetchQuestionData } from '../../../lib/fetchData';


type PollProps = {
  id: string;
  question: string;
  options: {
    text: string,
    id: string,
  }[];
  isRadio: boolean;
};


export default function Poll(props: PollProps): ReactElement {
  const { id, question, options, isRadio } = props;

  return (
    <Layout>
      <ResponseForm
        questionId={parseInt(id)}
        questionText={question}
        options={options}
      />
    </Layout>
  );
};


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const prisma = new PrismaClient();

  const questionId = params.questionId as string;
  const poll = await fetchQuestionData(prisma, parseInt(questionId));

  const options = poll.options
    .slice()
    .sort((o1, o2) => o1.orderNumber - o2.orderNumber)
    .map(o => ({ text: o.text, id: o.id }));

  await prisma.$disconnect();

  return {
    props: { 
      id: questionId, 
      question: poll.question.question, 
      options,
      isRadio: poll.question.isRadio,
    },
  };
};
