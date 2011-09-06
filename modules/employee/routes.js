/*
 * App.Module.Employee
 * 
 * @type			object
 * @extends		Backbone.Router
 */

App.Module.Employee = (function() {

	var route = Backbone.Router.extend({
		/*
		 * initialize
		 */
		initialize: function () 
		{
			var self = this;

			// Create & Bind Routes
			this.route('/employee', 'list', this.list);
			this.bind('route:list', function () {
				// Activate the menu when opened through #/employee
				this.menuItem.activate();
			});

			// Create a Menu Item to Sidebar
			this.menuItem = new App.Sidebar.MenuItem({
				text: 'Employee',
				navigateTo: '/employee',
				icon: App.modulesUrl('employee') + '/assets/icon.png'
			});
		},

		/*
		 * list
		 *
		 * @access	public
		 * @return	void
		 */
		list: function () 
		{
			App.Center.setContent("Hello World!");
		}
	});

	// Create our Router
	return new route();

}());
