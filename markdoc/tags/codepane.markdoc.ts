const CodePaneInjector = require('../../components/CodePaneInjector');

const codepane = {
  render: CodePaneInjector,
  children: ['tabs', 'fence', 'tag'],
  attributes: {},
};

module.exports = { codepane };