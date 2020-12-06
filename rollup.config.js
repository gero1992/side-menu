import resolve from '@rollup/plugin-node-resolve';
import common from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';

const targets = {
    targets: [
        { src: ['node_modules/@webcomponents', 'node_modules/@polymer'], dest: 'demo/node_modules' },
        { src: 'index.html', dest: 'demo', rename: 'index.html' },
    ]
}

export default {
    input: ['side-menu.js', "side-menu-item.js", "side-menu-item-style.js"],
    output: {
        dir: 'demo',
        format: 'esm'
    },
    plugins: [
        common({
            include: /node_modules/,
        }),
        copy(targets),
        resolve()
    ]
};
