(function() {
	
	// Create a View for this Object
	// TODO: Needs to be refactored
	// This is a bit harsh..
	
	var view = Backbone.View.extend({

		el: '#app-sidebar-items',

		generateID: function(text, prefix) {
			// slug
			text = text.replace(/[^a-zA-Z 0-9]+/g, '').replace(/[ ]/, '-');
			var id = $(this.el).attr('id').replace('#', '') + '-' + prefix + text.toLowerCase();
			return id;
		},

		getTitle: function(id) {
			id = $(this.el).attr('id') + '-title-' + id;
			return $(this.el).find('h3#' + id);
		},

		addTitle: function(text) {
			var li = $('<li/>');
			var h3 = $('<h3/>');
			var id = this.generateID(text, 'title-');

			// H3 Properties
			h3.attr('id', id);
			h3.html(text);

			// Append h3 -> li
			li.append(h3);

			// append object
			$(this.el).append(li);
		},
		
		getMenuItem: function(id) {
			// Get Item
			var count, item = $(this.el).find('li>a#' + $(this.el).attr('id') + '-item-' + id).first();
			// Get Item Count
			if($(item)) {
				count = item.find('p.count');
			}
			// Return Object
			return [item, count];
		},
		
		addMiniMenu: function(title, icon_url, handler) {
			var ul = $('#app-sidebar-optbtngrps');
			var li = $('<li/>');
			var button = $('<a/>');
			var span = $('<span/>');
			
			// button properties
			button.attr('title', title);
			button.attr('href', '#');
			button.addClass('action');
			button.click(handler);
			
			// span
			span.addClass('icon-mini');
			span.css('background', 'transparent url(' + icon_url + ') no-repeat center center');
			
			// appends
			button.append(span);
			li.append(button);
			ul.append(li);
		},

		addMenuItem: function(text, url, icon, id, active, count) {
			var xid = this.generateID( id ? id : text, 'item-');
			var link = $('<a/>');
			var span = $('<span/>');
			var li = $('<li/>');

			// link properties
			link.addClass('action');
			link.attr('href', url);
			link.attr('id', xid);

			// span properties
			var icon = ( id ? id : text).replace(/[^a-zA-Z 0-9]+/g, '').replace(/[ ]/, '-').toLowerCase();

			span.addClass('icon ' + icon);
			span.html(text);

			// appends
			link.append(span);
			li.append(link);

			// append to parent
			$(this.el).append(li);

			// add count
			if(count && count > 0)
				this.setMenuItemCount(id, count, true);
			if(active === true)
				this.setMenuItemActive(id, true, true);
		},

		setMenuItemActive: function(id, value, _generatedID) {
			if(_generatedID === true) {
				var item = $(this.el).find('#' + id).first().parent();
			} else {
				var item = $(this.getMenuItem(id)[0]).parent();
			}

			// remove other active class
			$(this.el).find('li.active').removeClass('active');

			if(value === true)
				item.addClass('active');
		},

		setMenuItemCount: function(id, n, _generatedID) {

			if(_generatedID === true) {
				var item = $(this.el).find('#' + id).first();
			} else {
				var item = this.getMenuItem(id)[0];
			}

			// if not found exit
			if(!item)
				return;

			// check if p.count is already created
			if(item.find('p.count')[0]) {
				item.find('p.count').first().text(n);
			} else {
				$(item).append($('<p/>').addClass('count').text(n));
			}
		}

	});

	// Instanciate
	App.Sidebar = new view;
})()