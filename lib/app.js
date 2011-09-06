/*
 * App
 * Application Framework for Backbone Application
 *
 * Kevinralph M. Tenorio (khebs@live.com)
 *
 */

App = (function(){

	// Vars
	var self = {},
			root = window,
			isDevMode = true;
	
	// AppRouter
	var AppRouter = new (Backbone.Router.extend({}));
	
	// hubs
	var hubs = { 
		"root:"		: "/app/",
		"module:"	: "/app/modules/",
		"lib:"		: "/app/lib/"
	};

	//----------------------------------------------------------------------------
	// UTILS
	//----------------------------------------------------------------------------

	/*
	 * mapPath
	 * @param		string
	 * @return	string
	 */
	var mapPath = function(str) 
	{
		var keys = Object.keys(hubs), p = str;

		for (var i = 0; i < keys.length; i++)
		{
			p = p.replace(new RegExp(keys[i], 'g'), hubs[keys[i]]);
		}

		return p;
	};

	/*
	 * Load Script
	 *
	 * @param		function
	 * @return	void
	 */
	var loadScript = function (scripts, callback) 
	{
		var cachetime = (isDevMode === true ? ('?' + (new Date()).getTime()) : false);

		console.log(scripts);

		// If cache is true, append time
		if (cachetime)
		{
			for (var i = 0; i < scripts.length; i++) 
			{
				scripts[i] = mapPath(scripts[i] + cachetime);
			}
		}

		// Load scripts
		head.js.apply(root, scripts);

		// Call callback once all scripts are ready
		head.ready(callback);
	};

	/*
	 * Module
	 * @singleton
	 */
	var Module = {
		// Holder for Registered Modules
		_registeredModules: [],

		// Store for Javascripts to load for each module
		_moduleQueueJS: [],

		// Internal
		init: function (callback)
		{
			var self = this,
					callback = callback ? callback : function () {},
					modules = this._registeredModules;
	
			loadScript(_.flatten(this._moduleQueueJS), function () {
				for (var i = 0; i < self._registeredModules.length; i++)
				{
					var name = self._registeredModules[i];
					root[name + 'Module'].Router = new root[name + 'Module'].Router;
				}
				callback.call(root);
			});
		},

		/*
		 * reg
		 * @access	public
		 * @param		string
		 * @param		object
		 * @return	void
		 */
		reg: function (name, config)
		{
			config = _.defaults(config, {
				requires: [],
				routes: {}
			});

			// append this js to queue
			for (var i = 0; i < config.requires.length; i++)
			{
				this._moduleQueueJS.push(config.requires[i]);
			}

			// Remove this
			delete config.requires;

			// for later initialization
			this._registeredModules.push(name);

			// Reference
			var m = root[name + 'Module'] = {
				// This will reinit
				Router: {}, 

				// View Holder
				Views: {},

				// Model Holder
				Models: {},

				path: function(str)
				{
					return App.mapPath('module:' + name + '/' + str);
				}
			};

			m.Router = Backbone.Router.extend(_.extend(config, { Module: m }));
		}
	};

	/*
	 * Template
	 * @singleton
	 */
	var Template = {};

	/*
	 * Template Loader
	 *
	 * @access	public
	 * @param		string
	 * @param		object/function
	 * @param		object/function/bool
	 * @param		function
	 * @return	void
	 */
	Template.load = function (file, data, el, callback) 
	{
		var tpl;

		if (typeof data === 'function') 
		{
			callback = data;
			data = null;
		}

		if(_.isString(el)) 
			el = $(el);

		// Call parseFile
		Template.parseFile(file, data, function (success, response) {
			if (el) {
				if (success && _.isObject(el)) el.empty().append(response);
			}
			if (_.isFunction(callback)) callback(success, response);
		});

	};

	/*
	 * parse
	 *
	 * @access	public
	 * @param		string
	 * @param		object
	 * @return	string
	 */
	Template.parse = function (string, data) 
	{
		return $.tmpl(string, data);
	};

	/*
	 * parseFile
	 *
	 * @access	public
	 * @param		string
	 * @param		object
	 * @param		function
	 * @return	void
	 */
	Template.parseFile = function (file, data, callback) 
	{
		var ext = '.tpl' + (isDevMode === true ? '' : ('?' + (new Date()).getTime()));

		$.ajax({
			url: file + ext,
			async: true
		}).success(function (response) {
			callback(true, Template.parse(response, data));
		}).error(function (e) {
			callback(false, e);
		});	
	};

	/*
	 * add
	 *
	 * @access	public
	 * @param		string
	 * @param		string
	 * @param		object
	 * @return	void
	 */
	Template.add = function (name, template, data) 
	{
		if (name && template && !Template[name]) 
		{
			Template[name] = function (d, el, callback) {
				var d = _.defaults(d||{}, data);
				Template.load(template, d, el, callback);
			};
		}
	};

	/*
	 * LoadApplication
	 * @access	private
	 * @param		function
	 * @return	void
	 */
	var LoadApplication = function (callback)
	{
		$.ajax({ 
			dataType: 'json', 
			url: mapPath('lib:manifest.json') 
		})
			.success(function(conf) {
				var libs = [];

				App.Manifest = conf;
				
				if ( ! _.isUndefined(conf.cached))
					isDevMode = conf.cached;

				if (_.isArray(conf.modules) && conf.modules.length > 0)
					libs.push(_.map(conf.modules, function(m) { return 'module:' + m + '/router.js'; }));

				if ( ! _.isUndefined(conf.autoload) && conf.autoload.length > 0)
					libs.push(conf.autoload);
				
				loadScript(_.flatten(libs), function() {
					Module.init(callback);
				});
			})
			.error(function(e) {
				console.log(e);
			})
	};

	return {
		start: LoadApplication,
		mapPath: mapPath,
		Template: Template,
		Module: Module,
	};
	
}());

App.start(function() {
	Backbone.emulateHTTP = true;
	Backbone.emulateJSON = true;
	Backbone.history.start({
		pushState: false,
		root: App.mapPath('root:')
	});
});
