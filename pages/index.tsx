import { ReactElement } from 'react';

import Layout from '../components/layout';
import PollForm from '../components/poll-form/poll-form';


export default function Home(): ReactElement {
  return (
    <Layout home>
      <h1>Create a poll</h1>
      <PollForm />
    </Layout>
  );
}
