module.exports = (grunt) ->
    grunt.initConfig
        less:
            compile: 
                options: 
                    paths: ["style/", "node_modules/bootstrap/less"]
                files: 
                    "public/style.css": "style/index.less"              

        browserify:
            compile:
                options:
                    transform: ['coffeeify']
                files:
                    'public/script.js': 'script/index.coffee'

        clean:
            public: [
                'public/script.js'
                'public/style.css'
                'public/sprite.png'
            ]

        uglify:
            compile:
                files:
                    'public/script.min.js': 'public/script.js'

        cssmin:
            compile:
                files:
                    'public/style.min.css': 'public/style.css'

        rename:
            compile:
                files:
                    'public/style.css': 'public/style.min.css'
                    'public/script.js': 'public/script.min.js'

        watch:
            script:
                files: 'script/*.coffee'
                tasks: ['browserify']

            stylus:
                files: 'style/*.less'
                tasks: ['less']

        nodemon:
            app:
                script: './app.coffee'
                options:
                    watchedExtensions: ['coffee']
                    ignore: ['node_modules/**', 'script/*']
                    env:
                        NODE_ENV: 'dev'

        concurrent:
            target:
                tasks: ['watch','nodemon']
                options:
                    logConcurrentOutput: true

    grunt.loadNpmTasks 'grunt-contrib-less'
    grunt.loadNpmTasks 'grunt-browserify'
    grunt.loadNpmTasks 'grunt-contrib-clean'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-cssmin'
    grunt.loadNpmTasks 'grunt-rename'
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-nodemon'
    grunt.loadNpmTasks 'grunt-concurrent'

    grunt.registerTask 'dev', ['clean', 'less', 'browserify']
    grunt.registerTask 'dist', ['dev', 'uglify', 'cssmin', 'rename']