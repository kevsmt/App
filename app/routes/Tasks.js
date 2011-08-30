(function() {
	// Dashboard Router
	namespace('App.routes.Tasks');

	// Create a Router for this Object
	var router = Backbone.Router.extend({
		
		routes: {
			'/tasks': 'index'
		},
		
		initialize: function() {
			App.views.Sidebar.addMenuItem('My Tasks', '#/tasks');
		},

		index: function() {
			// Load Template
			App.loadTemplate('tasks/empty.list', true, function() {
				App.views.Sidebar.setMenuItemActive('my-tasks', true);				
			});
		}

	});

	// Instanciate
	App.routes.Tasks = new router();

})();
