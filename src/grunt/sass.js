module.exports = {
    // Development settings
    dev: {
        options: {
            outputStyle: 'nested',
            sourceMap: false
        },
        files: [{
            expand: true,
            cwd: './Content/sass/',
            src: ['*.scss'],
            dest: './Content/',
            ext: '.css'
        }]
    }
};