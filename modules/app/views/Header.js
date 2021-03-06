/*
 * Application Header View
 *
 * @constructor
 */
AppModule.Views.Header = (function () {
	/*
	 * _addActionButton
	 *
	 * @access	private
	 * @param	string
	 * @param	function
	 * @param	object
	 * @return	object
	 */
	var _addActionButton = function (title, handler, ulid) 
	{
		var ul = $(ulid),
				button = $('<a/>'),
				li = $('<li/>');

		// Set button properties
		button.attr('title', title);
		button.attr('href', '#');
		button.click(function (e) {
			e.preventDefault();
			handler.call(this, e);
		});

		button.addClass('action');

		li.append(button);
		ul.append(li);

		return li;
	};
	
	var _clearActionButtons = function (ulid) 
	{
		$(ulid).empty();
	};

	/*
	 * Backbone View
	 */
	var view = Backbone.View.extend({
		el: '#app-header',

		/*
		 * setTitle
		 *
		 * @access	public
		 * @param	string
		 * @return	void
		 */
		setTitle: function (text, navigateTo) 
		{
			return $('#app-header-title', this.el).first().text(text).click(function () {
				AppModule.Router.navigate((navigateTo || ''), true);
			});
		},

		/*
		 * setCenterTitle
		 *
		 * @access	public
		 * @param	string
		 * @return	void
		 */
		setCenterTitle: function (text) 
		{
			return $('#app-header-center-title', this.el).first().text(text);
		},

		/*
		 * addLeftButton
		 * Appends Button to Norths Top Left button groups
		 *
		 * @access	public
		 * @param	string
		 * @param	function
		 * @return	object
		 */
		addLeftButton: function (title, handler) 
		{
			return _addActionButton(title, handler, '#app-header-left-options');
		},
		
		/*
		 * addRightButton
		 * Appends Button to Norths Top Right button groups
		 *
		 * @access	public
		 * @param	string
		 * @param	function
		 * @return	object
		 */
		addRightButton: function (title, handler) 
		{
			return _addActionButton(title, handler, '#app-header-right-options')
		},
		
		/*
		 * clearLeftButtons
		 * 
		 * @access	public
		 * @return	void
		 */
		clearLeftButtons: function () 
		{
			_clearActionButtons('#app-header-left-options');
		},
		
		/*
		 * clearRightButtons
		 * 
		 * @access	public
		 * @return	void
		 */
		clearRightButtons: function () 
		{
			_clearActionButtons('#app-header-right-options');
		}

	});

	// Instantiate the View
	return new view();

}());
