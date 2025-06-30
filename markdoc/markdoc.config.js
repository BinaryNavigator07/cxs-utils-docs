const { nodes, Tag } = require('@markdoc/markdoc');

// Import custom components
const { Callout } = require('../components/Callout');
const { CodeBlock } = require('../components/CodeBlock');
const { Heading } = require('../components/Heading');
const { Tabs, Tab } = require('../components/Tabs');
const CodePaneInjector = require('../components/CodePaneInjector');
const EnhancedImage = require('../components/EnhancedImage');

// Import custom nodes
const { fence } = require('./nodes/fence.markdoc');
const { heading } = require('./nodes/heading.markdoc');
const { link } = require('./nodes/link.markdoc');
const { image } = require('./nodes/image.markdoc');

// Import custom tags
const { callout } = require('./tags/callout.markdoc');
const { note } = require('./tags/note.markdoc');
const { warning } = require('./tags/warning.markdoc');
const { tip } = require('./tags/tip.markdoc');
const { important } = require('./tags/important.markdoc');
const { codepane } = require('./tags/codepane.markdoc');
const { tabs, tab } = require('./tags/tabs.markdoc');

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
    tabs,
    tab,
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

module.exports = config;