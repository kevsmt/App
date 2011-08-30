// Create a View for this Object
// TODO: Needs to be refactored
// This is a bit harsh..

(function() {

	var sidebar_el = $('#app-sidebar-items');

	//----------------------------------------------------------
	// Object Constructors
	//----------------------------------------------------------
	
	/*
	 * MenuTitle
	 * 
	 * @access	public
	 * @param	config
	 * @return	object
	 */
	function MenuTitle(config) {
		var li, h3, self;
		
		// Apply Defaults
		_.defaults(config, {
			text: 'Untitled',
			id: _.uniqueId('#app-sidebar-items-title-'),
		});
		
		_.extend(this, config);
		
		// Create DOM Element
		self = this, li = $('<li/>'), h3 = $('<h3/>');
		
		// H3 Properties
		h3.attr('id', self.id);
		h3.html(self.text);
		
		// Append h3 -> li
		li.append(h3);
		
		// append object
		sidebar_el.append(li);
		
		// for getEl
		this.__el = li;
		
		return this;
	};
	
	/*
	 * text
	 * Set/Retrieve
	 * 
	 * @access	public
	 * @param	arguments
	 * @return	object
	 */
	MenuTitle.prototype.text = function() {
		return this.getEl().text(arguments);
	};
	
	/*
	 * getEl
	 *
	 * @access	public
	 * @return	object
	 */
	MenuTitle.prototype.getEl = function() {
		return this.__el;
	};

	/*
	 * MenuItem
	 *
	 * @access	public
	 * @param	object
	 * @return	object
	 */
	function MenuItem(config) {
		var link, splan, li, self, app = App.Router;

		// Apply Defaults
		_.defaults(config, {
			text: 'Untitled',
			icon: App.assetUrl('img/icons/default-menu-icon.png'),
			navigateTo: null,
			active: false,
			count: 0,
			id: _.uniqueId('#app-sidebar-items-item-'),
			handler: function() {
			}

		});

		_.extend(this, config);

		// Create DOM Element
		self = this, link = $('<a/>'), span = $('<span/>'), li = $('<li/>');

		// link properties
		link.addClass('action');
		link.attr('href', self.navigateTo);
		link.attr('id', self.id);
		link.click(function(e) {
			e.preventDefault();
			// if navigateTo is null proceed exec handler
			if(self.navigateTo) {
				app.navigate(self.navigateTo, true);
			} else {
				handler(e);
			}
		});

		// span properties
		span.addClass('icon');
		span.css('background-image', 'url(' + self.icon + ')');
		span.html(self.text);

		// appends
		link.append(span);
		li.append(link);

		// append to parent
		sidebar_el.append(li);

		// for getEl
		this.__el = li;

		return this;
	};

	/*
	 * getEl
	 *
	 * @access	public
	 * @return	object
	 */
	MenuItem.prototype.getEl = function() {
		return this.__el;
	};

	/*
	 * clearActive
	 *
	 * @access	public
	 * @return	void
	 */
	MenuItem.prototype.clearActive = function() {
		sidebar_el.find('li.active').removeClass('active');
	};

	/*
	 * deactivate
	 *
	 * @access	public
	 * @return	void
	 */
	MenuItem.prototype.deactivate = function() {
		this.getEl().removeClass('active')
	};

	/*
	 * activate
	 *
	 * @access	public
	 * @return	void
	 */
	MenuItem.prototype.activate = function() {
		this.clearActive();
		this.getEl().addClass('active')
	};

	/*
	 * setCount
	 *
	 * @access	public
	 * @param	numeric
	 * @return	void
	 */
	MenuItem.prototype.setCount = function(v) {
		var p, a;

		if(!( p = this.getEl().find('p.count')[0])) {
			p = $('<p/>').addClass('count');
			
			// append p
			if (a = this.getEl().find('a.action')[0]) {
				$(a).append(p);
			}
		}
		
		console.log(p);
		
		p.text(v);
	};

	//-------------------------------------------------------------------------------------
	// Create Backbone View
	//-------------------------------------------------------------------------------------

	/*
	 * Backbone View
	 *
	 * @constructor
	 * @type	object
	 */
	var sidebar = Backbone.View.extend({
		el: sidebar_el,
		
		initialize: function () {
			
		},

		MenuItem: MenuItem,
		MenuTitle: MenuTitle
	});

	// Make available for public
	App.Sidebar = new sidebar;

})();

/*

 App.Sidebar = new (Backbone.View.extend({

 el: '#app-sidebar-items',

 initialize: function () {
 this.addTitle('Focus');
 },

 generateID: function(text, prefix) {
 // slug
 text = text.replace(/[^a-zA-Z 0-9]+/g, '').replace(/[ ]/, '-');
 var id = $(this.el).attr('id') + '-' + prefix + text.toLowerCase();
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

 addMenuItem: function(text, handler, icon, id, active, count) {
 var xid = this.generateID( id ? id : text, 'item-');
 var link = $('<a/>');
 var span = $('<span/>');
 var li = $('<li/>');

 // link properties
 link.addClass('action');
 link.attr('href', '#');
 link.attr('id', xid);

 link.click(function(e){ e.preventDefault(); handler.apply(this); });

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

 }));*/