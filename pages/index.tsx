import { ReactElement } from 'react';

import { resetServerContext } from 'react-beautiful-dnd';

import Layout from '../components/layout';
import PollForm from '../components/poll-form/poll-form';


export default function Home(): ReactElement {
  return (
    <Layout home>
      <h1 style={{ marginTop: 0 }}>Create a poll</h1>
      <PollForm />
    </Layout>
  );
}


export async function getServerSideProps() {
  resetServerContext();
  return { props: {} };
}
