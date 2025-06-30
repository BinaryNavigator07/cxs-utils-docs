const { Tag } = require('@markdoc/markdoc');
const { Callout } = require('../../components/Callout');

const tip = {
  render: Callout,
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    title: {
      type: String,
      default: 'Tip',
    },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    const finalAttributes = { ...attributes, type: 'tip' };
    if (!attributes.title) {
        finalAttributes.title = 'Tip';
    }
    return new Tag(Callout, finalAttributes, children);
  }
};

module.exports = { tip };