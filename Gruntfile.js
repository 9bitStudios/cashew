module.exports = function(grunt){
    grunt.initConfig({

        browserify:{
            dist:{
                options:{
                    transform:[
                        ['babelify', {'loose':"all"}]
                    ]
                },
                src: ['src/modules/Cashew.js'],
                dest: 'src/cashew.js'
            }
        },
        concat: {
            options: {                
                separator: '\n'
            },
            dist: {
                src: ['src/lib/handlebars.js','src/cashew.js'],
                dest: 'dist/cashew.js'
            }
        },
        uglify: {
            build: {
                src: 'dist/cashew.js',
                dest: 'dist/cashew.min.js'
            }
        },
        clean: {
            build: {
              src: ['src/cashew.js']
            }
        },        
        watch:{
            scripts:{
                files:['src/modules/*.js'],
                tasks:['browserify','concat','uglify','clean']
            }
        }

    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ["watch"]);

};

