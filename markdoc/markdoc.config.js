import { nodes, Tag } from '@markdoc/markdoc';

// Import custom components
import { Callout } from '../components/Callout';
import { CodeBlock } from '../components/CodeBlock';
import { Heading } from '../components/Heading';
import { Tabs, Tab } from '../components/Tabs';
import CodePaneInjector from '../components/CodePaneInjector';
import EnhancedImage from '../components/EnhancedImage';

// Import custom nodes
import { fence } from './nodes/fence.markdoc';
import { heading } from './nodes/heading.markdoc';
import { link } from './nodes/link.markdoc';
import { image } from './nodes/image.markdoc';

// Import custom tags
import { callout } from './tags/callout.markdoc';
import { note } from './tags/note.markdoc';
import { warning } from './tags/warning.markdoc';
import { tip } from './tags/tip.markdoc';
import { important } from './tags/important.markdoc';
import { codepane } from './tags/codepane.markdoc';

const config = {
  nodes: {
    fence,
    heading,
    link,
    image,
  },
  tags: {
    callout,
    note,
    warning,
    tip,
    important,
    codepane,
    tabs: {
      render: 'Tabs',
      attributes: {},
      transform(node, config) {
        const labels = node
          .transformChildren(config)
          .filter((child) => child && child.name === 'Tab')
          .map((tab) => (typeof tab === 'object' ? tab.attributes.label : null));

        return new Tag(this.render, { labels }, node.transformChildren(config));
      }
    },
    tab: {
      render: 'Tab',
      attributes: {
        label: {
          type: String,
          required: true
        }
      }
    }
  },
  components: {
    Callout,
    CodeBlock,
    Heading,
    Tabs,
    Tab,
    CodePaneInjector,
    EnhancedImage,
  },
  variables: {
    // Global variables that can be used in documents
    siteName: 'ContextSuite Documentation',
    version: '1.0.0',
  },
  functions: {
    // Custom functions for use in documents
    includes: {
      transform(parameters) {
        const [array, value] = Object.values(parameters);
        return Array.isArray(array) ? array.includes(value) : false;
      },
    },
    upper: {
      transform(parameters) {
        const string = parameters[0];
        return typeof string === 'string' ? string.toUpperCase() : string;
      },
    },
  },
  validation: {
    validateLinks: true,
    validateImages: true,
    validateTags: true,
  }
};

export default config;