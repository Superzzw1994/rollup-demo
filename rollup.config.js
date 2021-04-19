const commonjs = require('@rollup/plugin-commonjs')
const {nodeResolve} = require('@rollup/plugin-node-resolve')
const {babel} = require('@rollup/plugin-babel')
const {terser} = require("rollup-plugin-terser")
const postcss = require('rollup-plugin-postcss')
const image = require('@rollup/plugin-image');
const typescript = require('rollup-plugin-typescript')
const serve = require('rollup-plugin-serve')
const livereload = require('rollup-plugin-livereload')
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const replace = require('@rollup/plugin-replace');

module.exports = {
  input: 'src/App.js',
  output: [{
    format: 'iife',
    file: "public/index.js",
    globals: {
      'lodash-es': '_'
    }
  }],
  external: ['lodash-es'],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    nodeResolve({
      extensions
    }),
    babel({
      extensions,
      exclude: /node_modules/,
      babelHelpers: "bundled"
    }),
    commonjs(
      {
        include: /node_modules/,
      }
    ),
    typescript(),
    image(),
    postcss(),
    terser(),
    // serve({
    //   open: true,
    //   port: 1994,
    //   host: 'localhost',
    //   contentBase: ['public']
    // }),
    // livereload({
    //   watch: 'public',
    // })
  ]
}

// {
//   transformMixedEsModules: true
// }
