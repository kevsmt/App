(function() {

	var template = App.Template.load;

	var view = Backbone.View.extend({
		el: '#app-root-view'
	});

	App.Viewport = new view();

})();
