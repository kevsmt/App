(function() {
	// Dashboard Router
	namespace('App.routes.Dashboard');

	// Create a Router for this Object
	var router = Backbone.Router.extend({

		routes: {
			'/dashboard': 'index'
		},

		initialize: function() {
			App.views.Sidebar.addMenuItem('Dashboard', '#/dashboard', 'dashboard');
		},

		index: function() {
			// Load Template
			App.loadTemplate('dashboard/empty.list', true, function() {
				App.views.Sidebar.setMenuItemActive('dashboard', true);				
			});
		}

	});

	// Instanciate
	App.routes.Dashboard = new router();

})();
