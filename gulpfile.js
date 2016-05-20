//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    watch = require('gulp-watch');
    less = require('gulp-less');
    UglifyJS = require('gulp-uglify');
    cssmin = require('gulp-minify-css');
    cache = require('gulp-cache');//只对改变的文件执行任务
    // imagemin = require('gulp-imagemin');
    //  //确保本地已安装imagemin-pngquant [cnpm install imagemin-pngquant --save-dev]
    // pngquant = require('imagemin-pngquant');
    // //确保本地已安装gulp-cache [cnpm install gulp-cache --save-dev]
    // cache = require('gulp-cache');
    livereload = require('gulp-livereload');
    
    
    
    
//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {
    gulp.src('css/main.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('css/')) //将会在src/css下生成index.css
        .pipe(livereload());
});

gulp.task('jsmin', function () {
    gulp.src('js/*.js') //该任务针对的文件
        .pipe(UglifyJS({
        	mangle: false//是否混淆
            //mangle: {except: ['require' ,'exports' ,'module' ,'$']}//排除混淆关键字
        })) //该任务调用的模块
        .pipe(gulp.dest('dist/js')); //将会在src/css下生成index.css
});

gulp.task('cssmin', function () {
    gulp.src('css/*.css') //该任务针对的文件
        .pipe(cssmin({
        	advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true//类型：Boolean 默认：false [是否保留换行]
        })) //该任务调用的模块
        .pipe(gulp.dest('dist/css')); //将会在src/css下生成index.css
});


// gulp.task('imagemin', function () {
//     gulp.src('images/*.{png,jpg,gif,ico}')
//         .pipe(cache(imagemin({
//             optimizationLevel: 7, //类型：Number  默认：3  取值范围：0-7（优化等级）
//             progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
//             svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
//             use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
//         })))
//         .pipe(gulp.dest('dist/images'));
// });


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('css/*.less', ['testLess']);
});




gulp.task('default',['testLess','jsmin','cssmin','watch']); //定义默认任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径