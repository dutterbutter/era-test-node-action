const path = require('path');

module.exports = {
  mode: 'production',
  entry: './index.cjs',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.cjs',
  },
  target: 'node',
};
