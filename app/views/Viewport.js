(function() {
	
	var template = App.Template.load;
	
	var view = Backbone.View.extend({
		el: 'body',
		
		initialize: function() {
			// Check browser compatibility
			if ($.browser.webkit || $.browser.mozilla) {
				this._showViewport();
			} else {
				this._notCompatible();
			}
		},
		
		_showViewport: function () {
			template(App.configs.urls.templates + '/viewport', null, $(this.el), function() {
				App.Viewport.show();
			});
		},
		
		_notCompatible: function () {
			template(App.configs.urls.templates + '/common', {
				title: 'BROWSER NOT COMPATIBLE',
				image: App.assetUrl('img/icons/x.png'),
				message: 'Sorry your browser is not compatible.%n%n~ Dev'
			}, $(this.el), function() {
				App.Viewport.show();
			});
		},
		
		show: function() {
			return $(this.el).css('visibility', 'visible');
		},
		
		hide: function() {
			return $(this.el).css('visibility', 'hidden');
		}
	});
	
	App.Viewport = new view();
	
})();