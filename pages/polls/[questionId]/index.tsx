import { GetServerSideProps } from 'next';

import { PollOption, PollQuestion, PrismaClient } from '@prisma/client';

import { ReactElement } from 'react';

import Layout from '../../../components/layout';

import Path from '../../../lib/path';


const prisma = new PrismaClient();


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

  const submitResponse = async (evt) => {
    evt.preventDefault();

    const selectedOptionIds = [...evt.target.response].filter(e => e.checked).map(e => e.value);

    const body = JSON.stringify({
      questionId: id,
      optionIds: selectedOptionIds,
    }, null, 2);

    const res = await fetch(
      Path.CREATE_RESPONSE,
      {
        body,
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
      },
    )

    if (!res.ok) {
      alert("failed!");
    } else {
      evt.target.reset();
    }
  }

  return (
    <Layout>
      <h1>{question}</h1>
      <form onSubmit={submitResponse}>
        {options.map(({ text, id }) => (
          <>
            <input 
              type={isRadio ? "radio" : "checkbox"} 
              id={`response-${id}`}
              name="response" 
              value={id} 
            />
            <label htmlFor={`response-${id}`}>{text}</label>
            <br />
          </>
        ))}
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
};


async function fetchPollData(id: number): Promise<{ 
  question: PollQuestion, 
  options: PollOption[]
}> {
  const question = await prisma.pollQuestion.findUnique({ where: { id }});
  const options = await prisma.pollOption.findMany({ where: { question } })
  options.sort((a, b) => a.orderNumber - b.orderNumber)
  await prisma.$disconnect();
  return { question, options };
};


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const questionId = params.questionId as string;
  const poll = await fetchPollData(parseInt(questionId));
  return {
    props: { 
      id: questionId, 
      question: poll.question.question, 
      options: poll.options.map(o => ({ text: o.text, id: o.id })),
      isRadio: poll.question.isRadio,
    },
  };
};
