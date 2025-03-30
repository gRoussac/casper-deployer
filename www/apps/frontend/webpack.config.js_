// const { merge } = require('webpack-merge');
// module.exports = (config, context) => {
//   return merge(config, {
//     module: {
//       rules: [
//         {
//           test: /\.wasm$/,
//           type: 'javascript/auto',
//           loader: 'arraybuffer-loader',
//         },
//       ],
//     },
//   });
// };

const { composePlugins, withNx } = require('@nx/webpack');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  return config;
});
