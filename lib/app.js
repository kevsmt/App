/*
 * App
 * Application Framework for Backbone Application
 *
 * Kevinralph M. Tenorio (khebs@live.com)
 *
 */
(function(root, fn) {
	// Alias
	var self = this;

	// Javascript Loader
	var jsLoader = head.js, jsLoaderReady = head.ready;

	/*
	 * Load Script
	 *
	 * @param	function
	 * @return	void
	 */
	var loadScript = function(scripts, callback) {
		var tmp = [];
		
		for (var i = 0; i < scripts.length; i++) {
			scripts[i] = scripts[i] + (self.configs.cache ? '' : ('?'+(new Date()).getTime()));
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
		var mods = self.configs.modules;
		
		for (var i = 0; i < mods.length; i++) {
			mods[i] = self.configs.urls.modules + '/' + mods[i] + '/app.js'
		}
		
		loadScript(mods, callback);
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
			url: './lib/app.json?'+(new Date()).getTime(),
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
		var ext = '.tpl' + (self.configs.cache ? '' : ('?'+(new Date()).getTime())); 
		var tokenize = function(str) {
			return str.replace(/\%n/g, '<br/>');
		};

		if( typeof data === 'function') {
			callback = data;
			data = null;
		}

		// Defaults to Viewport element
		if(!el) {
			el = $(self.Viewport.el);
		}

		$.ajax({
			url: file + ext
		}).success(function(response) {
			var parsed = tplParser.to_html(response, data);
			$(el).html(tokenize(parsed));
		}).error(function(e) {
			self.Template.load(self.configs.urls.templates + '/common', {
				title: 'ERROR CODE ' + e.status,
				image: self.assetUrl('img/icon/warning.png'),
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
		loadModules(function(){
			console.log('Done Loading Modules...');
			Backbone.history.start();
		});
	});

}).call( App = {}, this);
