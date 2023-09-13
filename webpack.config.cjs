const path = require('path');

module.exports = {
  entry: './index.cjs',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.cjs'
  },
  target: 'node'
};
