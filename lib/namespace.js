// Namespace ~khebs
// Usage:
//
//    namespace('Alpha.Bravo', 'One.Two.Tree.Four')
//
//    Passing function:
//
//    namespace('com.github.app.ui.view.Sidebar', function() {
//        this.data = ...
//    });
//
//    var X = { property: "X" };
//    ns(X, 'Mark.This.One'); => X.Mark.This.One == object
//

(function(context)
{
	/**
	 * namespace
	 * @param arguments
	 */
	function namespace()
	{
		var args = arguments, parent = context, aDomains, oDomain, oSubDomain, obj;
		var _ns = function(ns)
		{
			aDomains = ns.split(".");
			oDomain = parent;

			for(var i = 0; i < aDomains.length; i ++)
			{
				oSubDomain = aDomains[i];

				if( typeof oDomain[oSubDomain] === 'undefined')
					oDomain[oSubDomain] = new Object();
				oDomain = oDomain[oSubDomain];
			}
		};
		
		for(var j = 0; j < args.length; j ++)
		{
			if(j == 0)
			{
				if( typeof args[j] == 'object')
				{
					parent = args[j];
					continue;
				}
			}
			else if (typeof args[j] == 'function')
			{
				return args[j].call(oDomain);
			}
			
			_ns(args[j]);
		}
		
		return oDomain;
	};

	context.namespace = context.ns = namespace;

})(this);
