(function() {
	var app = App.Router

	var menuItem = new App.Sidebar.MenuItem({
		text: 'Contacts',
		navigateTo: 'contacts',
		icon: App.configs.urls.modules + '/contacts/assets/icon.png',
		count: 20
	});
	
	var menuItem2 = new App.Sidebar.MenuItem({
		text: 'Employees',
		navigateTo: 'employee'
	});
	
	new App.Sidebar.MenuTitle({
		text: 'Profile',
		position: 'right'
	});
	
	new App.Sidebar.MenuItem({
		text: 'Personal Details',
		position: 'right',
		handler: function() {
			this.activate();
		}
	});
	
	new App.Sidebar.MenuItem({
		text: 'Work Experience',
		position: 'right',
		handler: function() {
			this.activate();
		}
	});
	
	new App.Sidebar.MenuItem({
		text: 'Hobbies',
		position: 'right',
		handler: function() {
			this.activate();
		}
	});
	
	App.Header.addLeftButton('Hello', function() {
		app.navigate('hello', true);
	});
	
	App.Header.addRightButton('Click to view', function() {
		App.Sidebar.showRightSidebar().toggle();
	});


	App.Router.route('employee', 'contact-index', function(a) {
		menuItem2.activate();
		App.Template.page404();
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
