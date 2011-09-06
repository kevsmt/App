// Message Template
App.Template.add('message', AppModule.path('templates/common'));

// Page 404 Template
App.Template.add('page404', AppModule.path('templates/common'), {
	title: 'Page Not Found',
	image: AppModule.path('assets/img/icons/warning.png'),
	message: 'Page not found'
});