import Head from 'next/head';
import Link from 'next/link';

import { ReactElement, ReactNode } from 'react';

import Path from '../lib/path';

import OctocatIcon from './icons/octocat';

import styles from './layout.module.scss';

const SITE_TITLE = 'Pollr';

type LayoutProps = {
  children: ReactNode;
  home?: boolean;
};

export default function Layout({ children, home }: LayoutProps): ReactElement {
  return (
    <div>
      <Head>
        <title>{SITE_TITLE}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Polling app"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            SITE_TITLE
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={SITE_TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&display=swap" rel="stylesheet"></link>
      </Head>
      <div className={styles.outerContainer}>
        <div className={styles.container}>
          <main>{children}</main>
        </div>
      </div>
      <footer className={styles.footer}>
        <div>
          <Link href={Path.HOME}>
            <button>Create a poll</button>
          </Link>
        </div>
        <div className={styles.siteName}>
          {SITE_TITLE}
        </div>
        <div>
          <Link href="https://github.com/chrispyles">
            <button><OctocatIcon /> View on GitHub</button>
          </Link>
        </div>
      </footer>
    </div>
  )
}
