/*
 * Application Center View
 * 
 * @constructor
 */

AppModule.Views.Center = (function () { 

	/*
	 * Backbone View
	 */
	var view = Backbone.View.extend({

		el: '#app-center-inner',
		
		/*
		 * set/get html
		 * 
		 * @access	public
		 * @param		string
		 * @return	void
		 */
		html: function () 
		{
			return $(this.el).html(arguments);
		},

		/*
		 * setContent
		 *
		 * @access	public
		 * @param		string
		 * @return	object
		 */
		setContent: function (string) 
		{
			var content = $('<div class="content">');
			content.html(string);
			$(this.el).empty().append(content);
			return content;
		}
	});

	return new view();

}());