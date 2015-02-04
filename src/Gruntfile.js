module.exports = function (grunt) {
	grunt.initConfig({
		sass: {
			options: {
            	outputStyle: 'nested',
            	sourceMap: false
	        },
	        dist: {
	            files: {
	                './Content/site.css': './Content/sass/site.scss'
	            }
        	}
		},
	});

	grunt.loadNpmTasks('grunt-sass');

	grunt.registerTask('default', ['sass']);
};