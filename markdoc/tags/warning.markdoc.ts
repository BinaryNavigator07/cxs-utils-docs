const { Tag } = require('@markdoc/markdoc');
const { Callout } = require('../../components/Callout');

const warning = {
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    title: {
      type: String,
      default: 'Warning',
    },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    const finalAttributes = { ...attributes, type: 'warning' };
    if (!attributes.title) {
        finalAttributes.title = 'Warning';
    }
    return new Tag(Callout, finalAttributes, children);
  }
};

module.exports = { warning };