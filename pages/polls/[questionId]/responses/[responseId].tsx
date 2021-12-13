import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { PrismaClient } from '@prisma/client';

import React, { ReactElement } from 'react';

import Layout from '../../../../components/layout';
import ResponseForm from '../../../../components/response-form/response-form';

import { fetchQuestionData, fetchResponseData } from '../../../../lib/fetchData';
import Path, { makeHref } from '../../../../lib/path';


type ResponseProps = {
  question: {
    id: number,
    text: string,
    isRadio: boolean,
  };
  response: {
    id: number,
    createdAt: string;
    options: {  // assumed to be sorted
      text: string,
      id: string,
      checked: boolean,
    }[],
  };
  // prevResponseId: number;
  // nextResponseId: number;
};


export default function Response(props: ResponseProps): ReactElement {
  const { question, response } = props;
  return (
    <Layout>
      <p>Submitted at {response.createdAt}</p>
      <ResponseForm
        questionId={question.id}
        questionText={question.text}
        options={response.options}
        selectedOptionId={response.options.filter(o => o.checked)[0].id}
        disabled={true}
      />
      <p><Link href={makeHref(Path.ALL_RESPONSES, { questionId: question.id })}>
        <a>Back to responses</a>
      </Link></p>
    </Layout>
  );
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const prisma = new PrismaClient();

  const questionId = parseInt(params.questionId as string);
  const responseId = parseInt(params.responseId as string);

  const questionData = await fetchQuestionData(prisma, questionId);
  const responseData = await fetchResponseData(prisma, responseId);

  await prisma.$disconnect();

  const checkedOptionIds = responseData.responseOptions.map(ro => ro.optionId);
  const options = questionData.options
    .slice()
    .sort((o1, o2) => o1.orderNumber - o2.orderNumber)
    .map(o => ({ text: o.text, id: o.id, checked: checkedOptionIds.includes(o.id) }));

  return {
    props: { 
      question: {
        id: questionData.question.id,
        text: questionData.question.question,
        isRadio: questionData.question.isRadio,
      },
      response: {
        id: responseData.response.id,
        createdAt: responseData.response.createdAt.toString(),
        options,
      },
    },
  };
};
