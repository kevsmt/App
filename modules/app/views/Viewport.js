/*
 * Application Viewport
 *
 * @constructor
 */
AppModule.Views.Viewport = (function () {

	/*
	 * Backbone View
	 */
	var view = Backbone.View.extend({
		
		el: '#app-root-view',

		show: function () 
		{
			$(this.el).animate({
				opacity: 1
			}, 125);
		}

	});

	// Instantiate the View
	return new view();

}());
