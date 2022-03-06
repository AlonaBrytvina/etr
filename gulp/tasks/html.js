import fileInclude from 'gulp-file-include';
import webpHtmlNoSvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import htmlMin from 'gulp-htmlmin';

export const html = () => {
    return app.gulp.src(app.path.src.html)
        // обработка ошибок
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'HTML',
                message: 'Error: <%= error.message %>'
            })
        ))
        // импорты html
        .pipe(fileInclude())
        // конвертация картинок в webp
        .pipe(app.plugins.if(app.isBuild, webpHtmlNoSvg()))
        // не позволяет кешировать
        .pipe(app.plugins.if(app.isBuild, versionNumber({
            value: '%DT%',
            append: { key: '_v', cover: 0, to: ['css', 'js'] },
            output: { file: 'gulp/version.json' }
        })))
        .pipe(app.plugins.if(app.isBuild, htmlMin({
            collapseWhitespace: true
        })))
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream());
};
