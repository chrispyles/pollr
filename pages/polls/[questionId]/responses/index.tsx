import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { PollOption, PollQuestion, PollResponse, PollResponseOption, PrismaClient } from '@prisma/client';

import React, { ReactElement } from 'react';

import Layout from '../../../../components/layout';

import { fetchAllResponsesForQuestion, fetchQuestionData } from '../../../../lib/fetchData';
import Path, { makeHref } from '../../../../lib/path';


type ResponseListProps = {
  question: {
    id: number,
    text: string,
  };
  responseIds: number[];
};


export default function ResponseList(props: ResponseListProps): ReactElement {
  const { question, responseIds } = props;
  return (
    <Layout>
      <h1>{question.text}</h1>
      <p>Responses:</p>
      <ul>
        {responseIds.map((rid, i) => (
          <li key={`response-${i}`}>
            <Link href={makeHref(Path.RESPONSE, { questionId: question.id, responseId: rid })}>
              <a>{rid}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const prisma = new PrismaClient();

  const questionId = parseInt(params.questionId as string);

  const questionData = await fetchQuestionData(prisma, questionId);
  const allResponseData = await fetchAllResponsesForQuestion(prisma, questionId);

  const responseIds = allResponseData
    .slice()
    .sort((r1, r2) => r1.createdAt.getTime() - r2.createdAt.getTime())
    .map(r => r.id);

  return {
    props: {
      question: {
        id: questionData.question.id,
        text: questionData.question.question,
      },
      responseIds,
    },
  };
};
