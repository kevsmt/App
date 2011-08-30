(function() {
	// Dashboard Router
	namespace('App.routes.Contacts');

	// Create a Router for this Object
	var router = Backbone.Router.extend({
		routes: {
			'/contacts': 'list'
		},
		initialize: function() {
			App.views.Sidebar.addMenuItem('Contacts', '#/contacts');
		},
		list: function() {
			// Load Template
			App.loadTemplate('contacts/empty.list', true, function() {
				App.views.Sidebar.setMenuItemActive('contacts', true);				
			});
		}
	});

	// Instanciate
	App.routes.Contacts = new router();

})();
