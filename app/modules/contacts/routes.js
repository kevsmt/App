(function() {

	var menuItem = new App.Sidebar.MenuItem({
		text: 'Contacts',
		navigateTo: 'contacts',
		icon: App.configs.urls.modules + '/contacts/assets/icon.png'
	});
	
	// Contact Index
	App.Router.addRoute('contacts', 'contact-index', function(a) {
		menuItem.activate();
		
		App.Template.load(App.configs.urls.templates + '/common', {
			title: 'No Contacts',
			image: App.assetUrl('img/icons/exclamation.png'),
			message: 'You have not added any contacts yet.'
		});
	});
	

})();
