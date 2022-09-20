import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postCSS from 'rollup-plugin-postcss';

import pkg from './package.json';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: './lib/cjs/index.js',
      format: 'cjs',
      exports: "default"
    },
    {
      file: './lib/esm/index.js',
      format: 'es',
      exports: "default"
    },
  ],
  external: [
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      typescript: require('typescript'),
    }),
    postCSS({
      plugins: [require('autoprefixer')],
    }),
  ],
};
