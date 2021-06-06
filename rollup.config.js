import { builtinModules } from 'module';
import { dependencies } from './package.json';
import { terser } from "rollup-plugin-terser";

export default [
	{
    input: 'lib/index.js',
    output: {
      file: 'dist/index.cjs',
      format: 'cjs',
      exports: 'default'
    },
    external: [...builtinModules, ...Object.keys(dependencies)]
  },
  {
    input: 'lib/index.js',
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      esModule: true,
      exports: 'named',
      plugins: [terser()]
    },
    external: [...builtinModules, ...Object.keys(dependencies)]
  },
  {
    input: 'lib/index.js',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      sourcemap: 'inline',
      globals: {
        'node-fetch': 'fetch'
      },
      name: 'gravatar',
      plugins: [terser()]
    },
    external: [...builtinModules, ...Object.keys(dependencies)]
  }
];
