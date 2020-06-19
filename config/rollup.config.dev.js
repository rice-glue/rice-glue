import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
module.exports = () => {
    return {
        input: './src/index.ts',
        output: {
            name: 'rice-glue',
            globals: {
            },
            file: './dist/index.js',
            format: 'umd'
        },
        plugins: [
            json(),
            resolve(),
            commonjs(),
            typescript({lib: ["es5", "es6", "dom"], target: "es5"}),
        ],
        external: [],
        treeshake: false
    }
};