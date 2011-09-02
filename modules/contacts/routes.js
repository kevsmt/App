(function() {
	var app = App.Router

	var menuItem = new App.Sidebar.MenuItem({
		text: 'Contacts',
		navigateTo: 'contacts',
		icon: App.configs.urls.modules + '/contacts/assets/icon.png'
	});
	
	var menuItem2 = new App.Sidebar.MenuItem({
		text: 'Employees',
		navigateTo: 'employee'
	});
	
	new App.Sidebar.MenuTitle({
		text: 'Profile',
		position: 'right'
	});
	
	var menuButton = App.Header.addLeftButton('Hello', function() {
		app.navigate('hello', true);
	});


	App.Router.route('employee', 'contact-index', function(a) {
		menuItem2.activate();
	});
	
	// Contact Index
	App.Router.route('contacts', 'contact-index', function(a) {
		menuItem.activate();
		App.Template.message({
			title: 'No Contacts',
			image: App.assetUrl('img/icons/exclamation.png'),
			message: 'You have not added any contacts yet.'
		});
	});

	/*App.Router.bind('route:contact-index', function() {
		alert("A");
	});*/

})();
