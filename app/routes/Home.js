(function() {
	
	var Home = Backbone.Router.extend({

		routes: {
			"": "home"
		},

		home: function(path) {
			App.Sidebar.clearActiveMenuItems();
		}

	});

	new Home();

})();
