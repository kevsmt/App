(function() {
	// Dashboard Router
	namespace('App.routes.Appointments');

	// Create a Router for this Object
	var router = Backbone.Router.extend({

		routes: {
			'/appointments': 'list'
		},

		initialize: function() {
			App.views.Sidebar.addMenuItem('My Appointments', '#/appointments');
		},

		list: function() {
			var sidebar = App.views.Sidebar; 
			
			sidebar.setMenuItemActive('my-appointments', true);
			
			App.loadTemplate('common', {
				title: 'No Appointments',
				image: App.C_HOST + 'assets/img/icons/exclamation.png',
				message: 'You have not created any appointments yet.'
			});
		}

	});

	// Instanciate
	App.routes.Appointments = new router();

})();
