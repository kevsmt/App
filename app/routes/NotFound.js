(function() {
	var NotFound = Backbone.Router.extend({

		routes: {
			"*path": "notFound"
		},

		notFound: function(path) {
			App.Sidebar.clearActiveMenuItems();
			App.Template.page404();
		}

	});

	new NotFound();

})();
