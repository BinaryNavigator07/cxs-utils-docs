import React from 'react';
import { Callout } from './Callout';
import { CodeBlock } from './CodeBlock';
import { Tabs, Tab } from './Tabs';
import CodePaneInjector from './CodePaneInjector';
import EnhancedImage from './EnhancedImage';

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
  
  // Custom components
  Callout,
  Note: (props) => <Callout type="note" {...props} />,
  Warning: (props) => <Callout type="warning" {...props} />,
  Tip: (props) => <Callout type="tip" {...props} />,
  Important: (props) => <Callout type="important" {...props} />,
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