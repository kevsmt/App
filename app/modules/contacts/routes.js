(function() {
	
	// Create a Router for this Object
	var router = Backbone.Router.extend({

		routes: {
			'/contacts': 'list'
		},

		initialize: function() {
			App.Sidebar.addMenuItem('Contacts', '#/contacts');
		},

		list: function() {
			App.Sidebar.setMenuItemActive('contacts', true);
			App.Template.load(App.configs.urls.templates + '/common', {
				title: 'No Contacts',
				image: App.assetUrl('img/icons/exclamation.png'),
				message: 'You have not added any contacts yet.'
			});

		}

	});

	new router();

})();
