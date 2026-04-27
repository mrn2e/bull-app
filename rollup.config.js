import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';
import esbuild from 'rollup-plugin-esbuild';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';

export default {
  input: 'index.html',
  output: {
    entryFileNames: '[hash].js',
    chunkFileNames: '[hash].js',
    assetFileNames: '[hash][extname]',
    format: 'es',
    dir: 'public',
  },
  preserveEntrySignatures: false,

  plugins: [
    /** Enable using HTML as rollup entrypoint */
    html({
      minify: true,
    }),
    /** Copy static assets */
    copy({
      targets: [
        { src: '*.jpg', dest: 'public' },
        { src: '*.jpeg', dest: 'public' },
        { src: '*.png', dest: 'public' },
        { src: '*.avif', dest: 'public' },
        { src: '*.webp', dest: 'public' },
        { src: '*.json', dest: 'public' },
        { src: 'images/**', dest: 'public/images' },
        { src: 'locales/**', dest: 'public/locales' },
      ]
    }),
    /** Resolve bare module imports */
    nodeResolve(),
    /** Minify JS, compile JS to a lower language target */
    json(),
    esbuild({
      minify: true,
      target: ['chrome64', 'firefox67'],
    }),
    /** Bundle assets references via import.meta.url */
    importMetaAssets(),
    /** Minify html and css tagged template literals */
    babel({
      plugins: [
        [
          'babel-plugin-template-html-minifier',
          {
            modules: { lit: ['html', { name: 'css', encapsulation: 'style' }] },
            failOnError: false,
            strictCSS: true,
            htmlMinifier: {
              collapseWhitespace: true,
              conservativeCollapse: true,
              removeComments: true,
              caseSensitive: true,
              minifyCSS: true,
            },
          },
        ],
      ],
    }),
  ],
};
