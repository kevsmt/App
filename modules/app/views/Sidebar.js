// Create a View for this Object
// TODO: Needs to be refactored
// This is a bit harsh..

AppModule.Views.Sidebar = (function () {

	var sidebar_left_el = '#app-sidebar-left .app-sidebar-items',
			sidebar_right_el = '#app-sidebar-right .app-sidebar-items',
			sidebar_position = ['left', 'right'],
			Module = AppModule,
			Router = Module.Router;

	//----------------------------------------------------------
	// Object Constructors
	//----------------------------------------------------------

	function _infoPosition (position) 
	{
		var ul = $(sidebar_left_el);

		// check for positions
		switch (position) 
		{
			//case position[0]:
			//break;
			case sidebar_position[1]:
				ul = sidebar_right_el;
				break;
			default:
				position = sidebar_position[0];
		}

		return ul;
	};

	/*
	 * MenuTitle
	 *
	 * @access	public
	 * @param		config
	 * @return	object
	 */
	function MenuTitle (config) 
	{
		// Apply Defaults
		_.defaults(config, {
			text: 'Untitled',
			id: _.uniqueId('#app-sidebar-items-title-'),
			position: sidebar_position[0]
		});

		_.extend(this, config);

		// Create DOM Element
		var self = this, li = $('<li/>'), p = $('<p/>'), ul = _infoPosition(config.position);

		// H3 Properties
		p.attr('id', self.id);
		p.html(self.text);

		// Append p -> li
		li.addClass('title');
		li.append(p);

		// append object
		ul.append(li);

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
	MenuTitle.prototype.text = function () 
	{
		return this.getEl().text(arguments);
	};

	/*
	 * getEl
	 *
	 * @access	public
	 * @return	object
	 */
	MenuTitle.prototype.getEl = function () 
	{
		return this.__el;
	};

	/*
	 * MenuItem
	 *
	 * @access	public
	 * @param		object
	 * @return	object
	 */
	function MenuItem (config) 
	{
		// Apply Defaults
		_.defaults(config, {
			text: 'Untitled',
			icon: Module.path('assets/img/icons/default-menu-icon.png'),
			navigateTo: null,
			active: false,
			count: 0,
			id: _.uniqueId('#app-sidebar-items-item-'),
			position: sidebar_position[0],
			handler: null

		});

		_.extend(this, config);

		// Create DOM Element
		var self = this, link = $('<a/>'), span = $('<span/>'), li = $('<li/>'), ul = _infoPosition(config.position);

		// link properties
		link.addClass('action');
		link.attr('href', self.navigateTo);
		link.attr('id', self.id);
		link.click(function (e) {
			e.preventDefault();
			// if navigateTo is null proceed exec handler
			if (self.navigateTo)
			{
				Router.navigate(self.navigateTo, true);
			} 
			else 
			{
				if (self.handler) self.handler.call(self, e);
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
		ul.append(li);

		// for getEl
		this.__el = li;
		this.__ul = ul;

		// Check for active

		if (this.active == true)
			this.activate();
		if (this.count > 0)
			this.setCount(this.count);

		return this;
	};

	/*
	 * MenuItem
	 *
	 * @access	public
	 * @param		object
	 * @return	object
	 */
	function MenuItem (config)
	{
		// Apply Defaults
		_.defaults(config, {
			text: 'Untitled',
			icon: Module.path('assets/img/icons/default-menu-icon.png'),
			navigateTo: null,
			active: false,
			count: 0,
			id: _.uniqueId('#app-sidebar-items-item-'),
			position: sidebar_position[0],
			handler: null

		});

		_.extend(this, config);

		// Create DOM Element
		var self = this, link = $('<a/>'), span = $('<span/>'), li = $('<li/>'), ul = _infoPosition(config.position);

		// link properties
		link.addClass('action');
		link.attr('href', self.navigateTo);
		link.attr('id', self.id);
		link.click(function(e) {
			e.preventDefault();
			self.activate();

			// if navigateTo is null proceed exec handler
			if (self.navigateTo) 
			{
				Router.navigate(self.navigateTo, true);
			}
			else 
			{
				if (self.handler) self.handler.call(self, e);
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
		ul.append(li);

		// for getEl
		this.__el = li;
		this.__ul = ul;

		// Check for active
		
		if (this.active == true)
			this.activate(true);
		if (this.count > 0)
			this.setCount(this.count);

		return this;
	};

	/*
	 * getEl
	 *
	 * @access	public
	 * @return	object
	 */
	MenuItem.prototype.getEl = function () 
	{
		return this.__el;
	};

	/*
	 * deactivate
	 *
	 * @access	public
	 * @return	void
	 */
	MenuItem.prototype.deactivate = function () 
	{
		this.getEl().removeClass('active')
	};

	/*
	 * activate
	 *
	 * @access	public
	 * @return	void
	 */
	MenuItem.prototype.activate = function () 
	{
		Module.Views.Sidebar.clearActiveMenuItems(this.__ul);
		this.getEl().addClass('active')
	};

	/*
	 * setCount
	 *
	 * @access	public
	 * @param		numeric
	 * @return	void
	 */
	MenuItem.prototype.setCount = function (v) 
	{
		var p, a;

		if ( ! ( p = this.getEl().find('p.count')[0])) 
		{
			p = $('<p/>').addClass('count');

			// append p
			if ( a = this.getEl().find('a.action')[0])
			{
				$(a).append(p);
			}
		}

		p.text(v);
	};

	//-------------------------------------------------------------------------------------
	// Create Backbone View
	//-------------------------------------------------------------------------------------

	// right sidebar toggle

	var toggler = $('#app-center').hasClass('show-sidebar-right'), 
			togglel = $('#app-center').hasClass('show-sidebar-right');

	/*
	 * Backbone View
	 *
	 * @constructor
	 * @type	object
	 */
	var sidebar = Backbone.View.extend({

		// Alias
		MenuItem: MenuItem,

		// Alias
		MenuTitle: MenuTitle,

		setTitle: function (text) 
		{
			$('p.title', '#app-sidebar-left').text(text);
		},

		/*
		 * showLeftSidebar
		 *
		 * @access	public
		 * @param		bool
		 * @return	void
		 */
		showLeftSidebar: function (v) 
		{
			var el = $('#app-center');

			if(v === true || typeof v == 'undefined') {
				el.removeClass('show-sidebar-left').addClass('show-sidebar-left');
			} else {
				el.removeClass('show-sidebar-left');
			}

			return {
				toggle: function (callback) 
				{
					Module.Views.Sidebar.showLeftSidebar( togglel = !togglel);

					if( typeof callback == 'function')
						callback.call(this, togglel);
				}

			}
		},

		/*
		 * showRightSidebar
		 *
		 * @access	public
		 * @param		bool
		 * @return	void
		 */
		showRightSidebar: function (v) 
		{
			var el = $('#app-center');

			if(v === true || typeof v == 'undefined') {
				el.removeClass('show-sidebar-right').addClass('show-sidebar-right');
			} else {
				el.removeClass('show-sidebar-right');
			}

			return {
				toggle: function (callback) 
				{
					Module.Views.Sidebar.showRightSidebar( toggler = !toggler);

					if( typeof callback == 'function')
						callback.call(this, toggler);
				}

			}
		},

		/*
		 * clearActiveMenuItems
		 *
		 * @access	public
		 * @param		object
		 * @param		string
		 * @return	void
		 */
		clearActiveMenuItems: function (el, position) 
		{
			if (position === 'right')
				var target = sidebar_right_el;
			else
				var target = sidebar_left_el;

			$('li.active', (el || target)).removeClass('active');
		}

	});

	// Make available for public
	return new sidebar();

}());

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