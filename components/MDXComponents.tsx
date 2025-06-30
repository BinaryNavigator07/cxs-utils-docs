import React from 'react';
import { Callout } from './Callout';
import { CodeBlock } from './CodeBlock';
import { Tabs, Tab } from './Tabs';
import CodePaneInjector from './CodePaneInjector';
import EnhancedImage from './EnhancedImage';
import { Heading } from './Heading';

// Custom components for MDX
export const MDXComponents = {
  // Override default components
  img: EnhancedImage,
  pre: ({ children, ...props }) => {
    // Extract language from className if present
    const child = React.Children.only(children);
    const language = child?.props?.className?.replace('language-', '') || '';
    
    return (
      <CodeBlock data-language={language} {...props}>
        {child?.props?.children || children}
      </CodeBlock>
    );
  },
  
  // Custom heading component
  h1: (props) => <Heading level={1} {...props} />,
  h2: (props) => <Heading level={2} {...props} />,
  h3: (props) => <Heading level={3} {...props} />,
  h4: (props) => <Heading level={4} {...props} />,
  h5: (props) => <Heading level={5} {...props} />,
  h6: (props) => <Heading level={6} {...props} />,
  
  // Custom components
  Callout,
  Note: (props) => <Callout type="note" title="Note" {...props} />,
  Warning: (props) => <Callout type="warning" title="Warning" {...props} />,
  Tip: (props) => <Callout type="tip" title="Tip" {...props} />,
  Important: (props) => <Callout type="important" title="Important" {...props} />,
  Tabs,
  Tab,
  CodePane: CodePaneInjector,
  
  // Table components with better styling
  table: (props) => (
    <div className="table-wrapper">
      <table {...props} />
      <style jsx>{`
        .table-wrapper {
          overflow-x: auto;
          margin: 1.5em 0;
        }
        .table-wrapper :global(table) {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid var(--border-color);
        }
        .table-wrapper :global(th),
        .table-wrapper :global(td) {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
        }
        .table-wrapper :global(th) {
          background-color: #f8f9fa;
          font-weight: 600;
        }
        .table-wrapper :global(tr:hover) {
          background-color: #f8f9fa;
        }
      `}</style>
    </div>
  ),
  
  // Enhanced blockquote
  blockquote: (props) => (
    <blockquote {...props} style={{
      borderLeft: '4px solid var(--border-color)',
      paddingLeft: '1rem',
      margin: '1.5rem 0',
      fontStyle: 'italic',
      color: 'var(--text-color-secondary)'
    }} />
  ),
};