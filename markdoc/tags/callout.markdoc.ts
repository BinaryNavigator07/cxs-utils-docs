const { Callout } = require('../../components/Callout');

const callout = {
  render: Callout,
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    title: {
      type: String,
    },
    type: {
      type: String,
      default: 'default',
    },
  },
};

module.exports = { callout };