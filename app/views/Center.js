/*
 * Application Center View
 * 
 * @constructor
 */
(function() {
	
	/*
	 * Backbone View
	 */
	var view = Backbone.View.extend({
		el: '#app-center-inner',
		
		/*
		 * set/get html
		 * 
		 * @access	public
		 * @param	string
		 * @return	void
		 */
		html: function() {
			return $(this.el).html(arguments);
		}
	});
	
	// Instantiate the View
	App.Center = new view();
	
})();