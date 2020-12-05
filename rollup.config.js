import resolve from 'rollup-plugin-node-resolve';
import common from 'rollup-plugin-commonjs';

export default {
    input: 'side-menu.js',
    output: {
        file: 'bundle.js',
        format: 'esm'
    },
    plugins: [
        common(),
        resolve()
    ]
};