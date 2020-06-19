import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from "rollup-plugin-uglify";
module.exports = () => {
    return [{
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
            typescript({lib: ["es5", "es6", "dom"], target: "es5"})
        ],
        external: [ 'moment', 'axios' ],
        treeshake: true
    }, {
        input: './src/index.ts',
        output: {
            name: 'icemilk',
            globals: {
            },
            file: './dist/index.min.js',
            // dir: './dist',
            format: 'umd'
        },
        plugins: [
            json(),
            resolve(),
            commonjs(),
            typescript({lib: ["es5", "es6", "dom"], target: "es5"}),
            uglify()
        ],
        external: [],
        treeshake: true
    }]
};