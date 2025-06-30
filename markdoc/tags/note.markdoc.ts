const { Tag } = require('@markdoc/markdoc');
const { Callout } = require('../../components/Callout');

const note = {
  render: Callout,
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    title: {
      type: String,
      default: 'Note',
    },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    const finalAttributes = { ...attributes, type: 'note' };
    if (!attributes.title) {
        finalAttributes.title = 'Note';
    }
    return new Tag(Callout, finalAttributes, children);
  }
};

module.exports = { note };