import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import sourcemaps from "rollup-plugin-sourcemaps";
module.exports = () => {
    return {
        input: './src/index.ts',
        output: {
            name: 'rice-glue',
            globals: {
            },
            file: './lib/index.js',
            format: 'cjs'
        },
        plugins: [
            json(),
            resolve(),
            commonjs(),
            typescript({lib: ["es5", "es6", "dom"], target: "es5"}),
            sourcemaps()
        ],
        external: [
            'icemilk'
        ],
        treeshake: false
    }
};