import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { SideNav, TableOfContents, TopNav } from '../components';
import CodePaneDisplay from '../components/CodePaneDisplay';
import { AsideContentProvider, useAsideContent } from '../components/context/AsideContentContext';
import { SearchProvider } from '../components/context/SearchContext';

import 'prismjs';
import 'prismjs/components/prism-bash.min';
import 'prismjs/themes/prism.css';
import '../public/globals.css';

import type { AppProps } from 'next/app';
import type { MarkdocNextJsPageProps } from '@markdoc/next.js';

const TITLE = 'ContextSuite Documentation';
const DESCRIPTION = 'AI-powered commerce platform for mid-market and enterprise retailers';

function collectHeadings(node, sections = []) {
  if (node) {
    if (node.name === 'Heading') {
      const title = node.children[0];
      if (typeof title === 'string') {
        sections.push({ ...node.attributes, title });
      }
    }
    if (node.children) {
      for (const child of node.children) {
        collectHeadings(child, sections);
      }
    }
  }
  return sections;
}

export type MyAppProps = MarkdocNextJsPageProps;

function AppContent({ Component, pageProps }: AppProps<MyAppProps>) {
  const { markdoc } = pageProps;
  const router = useRouter();
  const { asideContent, setAsideContent } = useAsideContent();

  useEffect(() => {
    const handleRouteChange = () => {
      setAsideContent(null);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, setAsideContent]);

  let title = TITLE;
  let description = DESCRIPTION;
  if (markdoc) {
    if (markdoc.frontmatter.title) title = markdoc.frontmatter.title;
    if (markdoc.frontmatter.description) description = markdoc.frontmatter.description;
  }

  const toc = pageProps.markdoc?.content ? collectHeadings(pageProps.markdoc.content) : [];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="referrer" content="strict-origin" />
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNav>
        <Link href="/docs">Docs</Link>
      </TopNav>
      <div className="page-container">
        <SideNav />
        <div className={`main-content-wrapper ${asideContent ? 'with-aside' : 'without-aside'}`}>
          <main className="main-article-content">
            <Component {...pageProps} />
          </main>
          <TableOfContents toc={toc} />
        </div>
        <CodePaneDisplay />
      </div>
      <style jsx>{`
        .page-container {
          position: fixed;
          top: var(--top-nav-height);
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          overflow: hidden;
        }

        .main-content-wrapper {
          flex-grow: 1;
          display: flex;
          overflow-y: auto;
          height: calc(100vh - var(--top-nav-height));
        }

        .main-article-content {
          flex-grow: 1;
          padding: 1.5rem 2rem 2rem;
          max-width: 800px;
          margin-right: auto;
          margin-left: auto;
        }

        @media (max-width: 1024px) {
          .main-article-content {
            margin-right: 0;
          }
        }
        
        @media (max-width: 768px) {
          .main-content-wrapper {
            /* Mobile adjustments */
          }
        }
      `}</style>
    </>
  );
}

export default function MyApp(props: AppProps<MyAppProps>) {
  return (
    <SearchProvider>
      <AsideContentProvider>
        <AppContent {...props} />
      </AsideContentProvider>
    </SearchProvider>
  );
}