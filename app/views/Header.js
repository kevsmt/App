(function() {
	
	var view = Backbone.View.extend({
		el: '#app-header',
		
		setTitle: function(text) {
			return $('#app-header-title', this.el).first().text(text);
		},
		
		setCenterTitle: function(text) {
			return $('#app-header-center-title', $(this.el)).first().text(text);
		},
		
		addLeftButton: function(title, handler) {
			return this._addActionButton(title, handler, 'app-header-left-options');
		},
		
		addRightButton: function(title, handler) {
			return this._addActionButton(title, handler, 'app-header-right-options')
		},
		
		_addActionButton: function (title, handler, ulid) {
			var ul = $('#' + ulid);
			var button = $('<a/>');
			var li = $('<li/>');
			
			// Set button properties
			button.attr('title', title);
			button.attr('href', '#');
			button.click(handler);
			button.addClass('action');
			
			li.append(button);			
			ul.append(li);
			
			return li;
		}
	});
	
	App.North = new view();
	
})();