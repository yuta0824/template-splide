const { src, dest, series, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const gcmq = require("gulp-group-css-media-queries");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssdeclsort = require("css-declaration-sorter");
const sassGlob = require("gulp-sass-glob-use-forward");
const browserSync = require("browser-sync");

// パスの定義
const distBase = "./docs";
const srcSass = "./scss/**/*.scss";
const distSass = `${distBase}/assets/css`;
const distFile = `${distBase}/**/*`;

// Sassコンパイル
const compileSass = (done) => {
	src(srcSass)
		.pipe(
			plumber({
				errorHandler: notify.onError("Error:<%= error.message %>"),
			})
		)
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(postcss([autoprefixer()]))
		.pipe(
			postcss([
				cssdeclsort({
					order: "alphabetical",
				}),
			])
		)
		.pipe(gcmq())
		.pipe(dest(distSass));
	done();
};

// ローカルサーバー
const browserSyncFunc = (done) => {
	browserSync.init({
		server: { baseDir: distBase },
	});
	done();
};

const browserSyncReload = (done) => {
	browserSync.reload();
	done();
};

// 変更の監視
const watchFiles = (done) => {
	watch(srcSass, series(compileSass, browserSyncReload));
	watch(distFile, browserSyncReload);
	done();
};

// タスク実行
exports.default = series(watchFiles, browserSyncFunc);
