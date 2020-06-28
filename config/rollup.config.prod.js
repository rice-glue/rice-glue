import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from "rollup-plugin-uglify";
import sourcemaps from "rollup-plugin-sourcemaps";
module.exports = () => {
    return [{
        input: './src/index.ts',
        output: {
            sourceMap: false,
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
            sourcemaps(),
        ],
        external: [ 'icemilk' ],
        treeshake: true
    }, {
        input: './src/index.ts',
        output: {
            sourceMap: false,
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
            sourcemaps(),
            uglify()
        ],
        external: [ 'icemilk' ],
        treeshake: true
    }]
};