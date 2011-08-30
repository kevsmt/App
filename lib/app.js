/*
 * App
 * Application Framework for Backbone Application
 *
 * Kevinralph M. Tenorio (khebs@live.com)
 *
 */
(function(root, fn) {
	// Alias
	var self = this, __modules = [];

	// Javascript Loader
	var jsLoader = head.js, jsLoaderReady = head.ready;

	/*
	 * Load Script
	 *
	 * @param	function
	 * @return	void
	 */
	var loadScript = function(scripts, callback) {
		for(var i = 0; i < scripts.length; i++) {
			scripts[i] = scripts[i] + (self.configs.cache ? '' : ('?' + (new Date()).getTime()));
		}

		jsLoader.apply(root, scripts);
		jsLoaderReady(callback);
	};

	/*
	 * Load Modules
	 *
	 * @param	function
	 * @return	void
	 */
	var loadModules = function(callback) {
		var path, url, mods = self.configs.modules, queue = 0;

		// We need to get app.json for this module
		// and look for: name, version, main, dependencies
		for(var i = 0; l = mods.length, i < l; i++) {
			path = self.configs.urls.modules + '/' + mods[i];
			url = path + '/app.json' + (self.configs.cache ? '' : ('?' + (new Date()).getTime()));

			$.ajax({
				url: url,
				dataType: 'json',
				beforeSend: function() {
					queue++;
				}

			}).success(function(data) {
				__modules.push(data);
			}).error(function(e) {
				console.log('MODULE-ERROR: [' + e.statusText + ']' + e.responseText);
			}).complete(function() {
				queue--;
				if(queue <= 0) {
					// Consolidate all libraries
					var module_libs = [];
					
					for(var i = 0; l = __modules.length, i < l; i++) {
						var deps = [];
						
						if (__modules[i]['dependencies']) {
							deps = __modules[i].dependencies;
						}
						
						if (__modules[i]['main']) {
							deps.push(self.configs.urls.modules + '/' + __modules[i].name.toLowerCase() + '/' + __modules[i].main);
						}
						
						module_libs.push(deps)
					}
					
					loadScript(_.flatten(module_libs), callback);
				}
			});

		}

		//loadScript(mods, callback);
	};

	/*
	 * Bootstrap
	 *
	 * @access	private
	 * @param	function
	 * @return	void
	 */
	var bootstrap = function(callback) {
		$.ajax({
			url: './lib/app.json?' + (new Date()).getTime(),
			dataType: 'json'
		}).success(function(data) {
			// -- Bind app.json keys --
			for(var key in data) {
				self[key] = data[key];
			}
			// -- Sequences --
			// Load Dependecies
			loadScript(self.configs.autoloads, callback);

		}).error(function(e) {
			console.log('App Error: Cannot Continue');
			console.log(e);
			alert('Application cannot load due to error. See log.');
		});

	};

	/*
	 * Navigate
	 *
	 * @access	public
	 * @param	string
	 * @param	bool
	 * @return	void
	 */
	self.navigate = function(url, hash) {
		location.replace((hash === true ? '#' : '') + url);
	};

	/*
	 * Template Loader
	 *
	 * @access	public
	 * @param	string
	 * @param	object/function
	 * @param	object/function
	 * @param	function
	 * @return	void
	 */
	self.Template = {};
	self.Template.load = function(file, data, el, callback) {
		var tpl, url = self.configs.rootURL, tplParser = Mustache;
		var ext = '.tpl' + (self.configs.cache ? '' : ('?' + (new Date()).getTime()));
		var tokenize = function(str) {
			return str.replace(/\%n/g, '<br/>');
		};

		if( typeof data === 'function') {
			callback = data;
			data = null;
		}

		// Defaults to Viewport element
		if(!el) {
			el = $(self.Center.el);
		}

		$.ajax({
			url: file + ext,
			async: false
		}).success(function(response) {
			var parsed = tplParser.to_html(response, data);
			$(el).html(tokenize(parsed));
		}).error(function(e) {
			self.Template.load(self.configs.urls.templates + '/common', {
				title: 'ERROR CODE ' + e.status,
				image: self.assetUrl('img/icons/warning.png'),
				message: 'Something went wrong while loading `' + file + '`'
			});
		}).complete(callback);
	};

	/*
	 * assetUrl
	 *
	 * Returns string formulated/prefixed by assets url
	 *
	 * @param	string
	 * @return	string
	 */
	self.assetUrl = function(file) {
		return self.configs.urls.assets + '/' + file;
	};

	/*
	 * Run Bootstrap
	 */
	bootstrap(function() {
		console.log('Done Libraries...');
		loadModules(function() {
			console.log('Done Loading Modules...');

			App.Viewport.show();
			Backbone.history.start();
		});

	});

}).call(this.App = {}, this);
