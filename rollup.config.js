const typescript = require('@rollup/plugin-typescript');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

/** @type {import('rollup').RollupOptions} */
module.exports = {
  input: 'app.ts',
  output: {
    file: 'dist/app.bundle.js',
    format: 'cjs',
    sourcemap: true,
    exports: 'auto'
  },
  plugins: [
    resolve({
      preferBuiltins: true,
      exportConditions: ['node'],
      browser: false,
    }),
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: true
    })
  ],
  external: [
    'fs', 'path', 'util', 'stream', 'events',
    'buffer', 'crypto', 'os', 'process',
    'child_process', 'net', 'tls', 'http', 'https',
    'url', 'querystring'
  ]
};
