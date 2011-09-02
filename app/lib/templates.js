// Message Template
App.addTpl('message', './app/templates/common');

// Page 404 Template
App.addTpl('page404', './app/templates/common', {
	title: 'Page Not Found',
	image: App.assetUrl('img/icons/warning.png'),
	message: 'Page not found'
});
