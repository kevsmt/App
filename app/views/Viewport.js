/*
 * Application Viewport
 *
 * @constructor
 */
(function() {

	/*
	 * Backbone View
	 */
	var view = Backbone.View.extend({
		el: '#app-root-view',

		show: function() {
			$(this.el).delay(500).animate({
				opacity: 1
			});
		}

	});

	// Instantiate the View
	App.Viewport = new view();

})();
