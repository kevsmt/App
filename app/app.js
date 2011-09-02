/*
 * App
 * Application Framework for Backbone Application
 *
 * Kevinralph M. Tenorio (khebs@live.com)
 *
 */
(function(root, fn) {
	// Alias
	var self = this, __modules = [], __devmode = false;

	// Javascript Loader
	var jsLoader = head.js, jsLoaderReady = head.ready;

	// Console
	var $console = function(msg) {
		if(__devmode)
			console.log(msg);
	};

	/*
	 * Load Script
	 *
	 * @param	function
	 * @return	void
	 */
	var loadScript = function(scripts, callback) {
		var cachetime = (!self.configs.cache ? ('?' + (new Date()).getTime()) : '');
		// If cache is true, append time
		if(!self.configs.cache) {
			for(var i = 0; i < scripts.length; i++) {
				scripts[i] = scripts[i] + cachetime;
				$console('loadScript: ' + scripts[i]);
			}
		}

		// Load scripts
		jsLoader.apply(root, scripts);

		// Call callback once all scripts are ready
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

		// We need to get module.json for this module
		// and look for: name, version, main, dependencies
		for(var i = 0; l = mods.length, i < l; i++) {
			// Prepare paths
			path = self.configs.urls.modules + '/' + mods[i];
			url = path + '/module.json';

			$console('loadModules: ' + mods[i] + ' : ' + url);
			$console('--------------------');

			// Fetch Module Json
			$.ajax({
				url: url + '?' + (new Date()).getTime(),
				dataType: 'json',
				beforeSend: function() {
					queue++;
				}

			}).success(function(data) {
				$console(data);
				__modules.push(data);
			}).error(function(e) {
				$console(data);
				$console('--------------------');
				console.log('MODULE-ERROR: [' + e.statusText + ']' + e.responseText);
				$console('--------------------');
			}).complete(function() {
				queue--;
				$console('loadModules: complete::' + queue);

				// Start loading module libraries
				if(queue <= 0) {
					// Consolidate all libraries
					var loadNextSet = function(i) {
						if(__modules[i]) {
							var deps = [];

							// Check for dependencies
							if(__modules[i]['dependencies']) {
								$console('loadModules: dependencies');
								deps = $.merge(deps, __modules[i].dependencies);
								$console(deps);
							}

							// Check for main
							if(__modules[i]['main']) {
								deps.push(self.configs.urls.modules + '/' + __modules[i].name.toLowerCase() + '/' + __modules[i].main);
							}

							// Load the module by order at app.json, and loads the next set after that.
							loadScript(deps, function() {
								$console('loadModules: Done loading module ' + (i + 1) + ' of ' + __modules.length);
								loadNextSet(i + 1);
							});

						} else {
							$console('loadModules: calling [callback]');
							// Call call back
							callback.apply(root);
						}
					};

					// Start loading
					loadNextSet(0);
				}
			});

		}

		//loadScript(mods, callback);
	};

	/*
	 * init Application
	 *
	 * @param	callback
	 * @return	void
	 */
	var initApp = function(callback) {
		// Application Router
		var Router = Backbone.Router.extend({

		});

		// Instantiate Router Constructor
		self.Router = new Router();

		// Call callback
		callback();
	};

	/*
	 * Bootstrap
	 *
	 * @access	private
	 * @param	function
	 * @return	void
	 */
	var bootstrap = function(callback) {
		// Fetch app.json to get application configs
		$.ajax({
			url: './app/manifest.json?' + (new Date()).getTime(),
			dataType: 'json'
		}).success(function(data) {
			// set DevMode
			__devmode = data.configs.devmode;

			$console('Bootstrap: Binding key,values...');

			// -- Bind app.json keys --
			for(var key in data) {
				self[key] = data[key];
			}

			$console(data);

			$console('-----------------------');
			$console('Bootstrap: Load Dependencies:');
			$console('-----------------------');

			// -- Sequences --
			// Load Dependecies
			loadScript(self.configs.dependencies, function() {
				$console('-----------------------');
				$console('Bootsrap: Checking Browser Compatibility..');
				// Check browser compatibility
				if($.browser.webkit || $.browser.mozilla || $.browser.msie) {
					var tpl = self.configs.urls.templates + '/viewport';

					$console('Compatibility: OK');

					self.Template.load(tpl, null, '#app-root-view', function() {
						$console('Bootstrap: Load Autoloads:');
						$console('-----------------------');
						loadScript(self.configs.autoloads, callback);
						$console('-----------------------');
					});

				} else {
					self.Template.load(App.configs.urls.templates + '/common', {
						title: 'BROWSER NOT COMPATIBLE',
						image: App.assetUrl('img/icons/x.png'),
						message: 'Sorry your browser is not compatible.%n%n~ Dev'
					}, document.body);
				}
				$console('-----------------------');
			});

		}).error(function(e) {
			console.log('App Error: Cannot Continue');
			console.log(e);
			alert('Application cannot load due to error. "see console for details."');
		});

	};

	/*
	 * Template
	 *
	 * @type	singleton
	 */
	self.Template = {
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
	self.Template.load = function(file, data, el, callback) {
		var tpl, url = self.configs.rootURL, tplParser = Handlebars;
		var ext = '.tpl' + (self.configs.cache ? '' : ('?' + (new Date()).getTime()));

		if( typeof data === 'function') {
			callback = data;
			data = null;
		}

		// Defaults to Viewport element
		if(!el) {
			el = $(self.Center.el);
		}

		$console('-----------------------');
		$console('Load Template: ' + file);

		$.ajax({
			url: file + ext,
			async: true
		}).success(function(response) {
			$console('Parsing Template.');
			var template = tplParser.compile(response);
			$(el).html(template(data));
			$console('-----------------------');
		}).error(function(e) {
			$console('Template ERROR:');
			$console(e);
			$console('-----------------------');
			self.Template.load(self.configs.urls.templates + '/common', {
				title: 'ERROR CODE ' + e.status,
				image: self.assetUrl('img/icons/warning.png'),
				message: 'Something went wrong while loading `' + file + '`'
			});
		}).complete(callback);
	};

	// Alias
	self.loadTpl = self.Template.load;

	/*
	 * add
	 *
	 * @access	public
	 * @param	string
	 * @param	string
	 * @param	object
	 */
	self.Template.add = function(name, template, data) {
		if(name && template && !self.Template[name]) {
			self.Template[name] = function(adata, el, callback) {
				self.Template.load(template, _.extend((data || {}), adata), el, callback);
			};

		}
	};

	// Alias
	self.addTpl = self.Template.add;

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
		// Init Application Fns, etc.
		initApp(function() {
			// Load Modules
			loadModules(function() {
				// Set Backbone Configs
				Backbone.emulateHTTP = true;
				Backbone.emulateJSON = true;
				Backbone.history.start({
					pushState: true,
					root: '/app/'
				});

				// Show Viewport
				App.Viewport.show();
			});

		});

	});

}).call(this.App = {}, this);
