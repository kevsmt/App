App.Module.reg('App', {
	
	requires: [
		"module:app/views/Header.js",
		"module:app/views/Center.js",
		"module:app/views/Sidebar.js",
		"module:app/views/Viewport.js",
		"module:app/lib/templates.js"
	],

	routes: {
		'': 'home',
		'*page': 'page404'
	},

	initialize: function ()
	{
		var m = this.Module;

		// Load Template
		App.Template.load(m.path('templates/viewport'), null, '#app-root-view', function () {

			// Header Presets
			// We set Application Name/Title
			AppModule.Views.Header.setTitle('MyApp');

			// Sidebar Presets
			// Set Sidebar Title
			AppModule.Views.Sidebar.setTitle('FOCUS');

			// Show Viewport
			m.Views.Viewport.show();
		});
	},

	home: function ()
	{
		console.log('Hello World!');
	},

	page404: function ()
	{
		console.log('Page does not exists!');
	}

});