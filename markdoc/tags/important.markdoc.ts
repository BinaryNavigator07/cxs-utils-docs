const { Tag } = require('@markdoc/markdoc');
const { Callout } = require('../../components/Callout');

const important = {
  render: Callout,
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    title: {
      type: String,
      default: 'Important',
    },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    const finalAttributes = { ...attributes, type: 'important' };
    if (!attributes.title) {
        finalAttributes.title = 'Important';
    }
    return new Tag(Callout, finalAttributes, children);
  }
};

module.exports = { important };