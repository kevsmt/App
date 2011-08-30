(function() {
	
	var menuTitle = new App.Sidebar.MenuTitle({
		text: 'Focus'
	});

	var menuItem = new App.Sidebar.MenuItem({
		text: 'Contacts',
		navigateTo: 'contacts',
		icon: App.configs.urls.modules + '/contacts/assets/icon.png'
	});
	
	var menuItem2 = new App.Sidebar.MenuItem({
		text: 'Contacts2',
		navigateTo: 'contacts2',
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
	
	// Contact Index
	App.Router.addRoute('contacts2', 'contact-index2', function(a) {
		menuItem2.activate();
		
		App.Template.load(App.configs.urls.templates + '/common', {
			title: 'No Contaasdasdasdcts',
			image: App.assetUrl('img/icons/exclamation.png'),
			message: 'You have not aasdasddded any contacts yet.'
		});
	});

	

})();
