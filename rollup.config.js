
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import copy from 'rollup-plugin-copy';
import common from 'rollup-plugin-commonjs';


const filesizeConfig = {
    showGzippedSize: true,
    showBrotliSize: false,
    showMinifiedSize: false,
};

const copyConfig = {
    targets: [
        { src: ['node_modules/@webcomponents', 'node_modules/@polymer'], dest: 'dist/node_modules' },
        { src: 'index.html', dest: 'dist', rename: 'index.html' },
    ],
};

// The main JavaScript bundle for modern browsers that support
// JavaScript modules and other ES2015+ features.
const config = {
    input: ['side-menu.js', "side-menu-item.js", "side-menu-item-style.js"],
    output: {
        dir: 'dist',
        format: 'es',
    },

    plugins: [
        minifyHTML(),
        common(),
        copy(copyConfig),
        resolve(),
        filesize(filesizeConfig)
    ],
    preserveEntrySignatures: false,
};

if (process.env.NODE_ENV !== 'development') {
    config.plugins.push(terser());
}

export default config;