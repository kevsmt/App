(function() {
	// Create a Router for this Object
	var router = Backbone.Router.extend({

		routes: {
			'/appointments': 'list'
		},

		initialize: function() {
			App.Sidebar.addMenuItem('My Appointments', '#/appointments');
		},

		list: function() {
			App.Sidebar.setMenuItemActive('my-appointments', true);
			App.Template.load(App.configs.urls.templates + '/common', {
				title: 'No Appointments',
				image: App.assetUrl('img/icons/exclamation.png'),
				message: 'You have not created any appointments yet.'
			});

		}

	});

	new router();

})();
