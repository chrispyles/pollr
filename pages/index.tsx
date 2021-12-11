import Head from 'next/head';

import { ReactElement } from 'react';

import Layout, { siteTitle } from '../components/layout';

import utilStyles from '../styles/utils.module.scss';


export default function Home(): ReactElement {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h1>Hi there</h1>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  )
}
