// Получаем имя папки проекта
import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = './dist';
const srcFolder = './src';

export const path = {
    build: {
        html: `${buildFolder}/`,
        css: `${buildFolder}/css/`,
        js: `${buildFolder}/js/`,
        images: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`,
        files: `${buildFolder}/files/`
    },
    src: {
        js: `${srcFolder}/assets/js/script.js`,
        images: `${srcFolder}/assets/svg/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/assets/svg/**/*.svg`,
        scss: `${srcFolder}/assets/styles/style.scss`,
        html: `${srcFolder}/*.html`,
        files: `${srcFolder}/assets/files/**/*.*`,
        svgicons: `${srcFolder}/assets/svgicons/*.svg`
    },
    watch: {
        js: `${srcFolder}/assets/js/**/*.js`,
        scss: `${srcFolder}/assets/styles/**/*.scss`,
        html: `${srcFolder}/**/*.html`,
        images: `${srcFolder}/**/*.{jpg,jpeg,png,svg,gif,webp,ico}`,
        files: `${srcFolder}/assets/files/**/*.*`
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: 'public_html'
};
