App.addTpl('message', './app/templates/common');
App.addTpl('page404', './app/templates/common', {
	title: 'Page Not Found',
	image: App.assetUrl('img/icons/x.png'),
	message: 'Page not found'
});
