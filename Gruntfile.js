module.exports = function(grunt){
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'dist/css/cashew.css': 'src/scss/cashew.scss'
                }
            }
        },
        cssmin: {
            add_banner: {
                files: [{ expand: true, cwd: 'dist/css/', src: ['cashew.css'], dest: 'dist/css/', ext: '.min.css' }]
            }
        },
        browserify:{
            dist:{
                options:{
                    transform:[
                        ['babelify', {'loose':"all"}]
                    ]
                },
                src: ['src/js/modules/Cashew.js'],
                dest: 'src/js/cashew.js'
            }
        },
        concat: {
            options: {                
                separator: '\n'
            },
            dist: {
                src: [
                    'src/js/lib/handlebars.js',
                    'src/js/cashew.js'
                ],
                dest: 'dist/js/cashew.js'
            }
        },
        uglify: {
            build: {
                src: 'dist/js/cashew.js',
                dest: 'dist/js/cashew.min.js'
            }
        },
        clean: {
            build: {
              src: ['.sass-cache/', 'dist/css/*.css.map', 'src/js/cashew.js']
            }
        },        
        watch:{
            scripts:{
                files:['src/js/modules/*.js'],
                tasks:['browserify','concat','uglify','clean']
            },
            css: {
                files: 'src/scss/**/*.scss',
                tasks: ['sass', 'cssmin', 'clean']
            }            
        }

    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ["watch"]);

};

