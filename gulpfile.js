const { series, parallel, src, dest, watch: gulpwatch } = require('gulp')
const postcss = require('gulp-postcss')
const nunjucks = require('gulp-nunjucks')
const clean = require('gulp-clean')
const minify = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

const build = () => {
	return src('dist/**/*', { read: false })
		.pipe(clean({ force: true }))
}

const css = () => {
	return src('src/css/style.css')
		.pipe(postcss())
		.pipe(minify())
		.pipe(dest('dist/css'))
}

const js = () => {
	return src('src/js/app.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(dest('dist/js'))
}

const page = () => {
	return src('src/pages/*.html')
		.pipe(nunjucks.compile())
		.pipe(dest('dist/'))
}

const compile = series(build, parallel(css, js, page))

const watch = () => {
	gulpwatch(['src/css/*.css', 'src/js/*.js', 'src/pages/**/*.html'], compile)
}

exports.default = compile
exports.watch = watch
exports.build = build
exports.css = css
exports.js = js
exports.page = page