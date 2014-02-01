/* Backbone UI: TOC
 * Source: https://github.com/backbone-ui/toc
 * Copyright © Makesites.org
 *
 * Initiated by Lyndel Thomas (@ryndel)
 * Distributed through [Makesites.org](http://makesites.org)
 * Released under the [MIT license](http://makesites.org/licenses/MIT)
 */

(function($, _, Backbone) {

	// support for Backbone APP() view if available...
	var isAPP = ( typeof APP !== "undefined" && typeof APP.View !== "undefined" );
	var View = ( isAPP ) ? APP.View : Backbone.View;

	var TOC = View.extend({

		el : function() { return this.options.element },
		
		options : {
			element : '.main',
			titleEl : "h2"
			// scroll : true,
			// className : "",
			// tagName : "a",
			// text: "",
			// scrollOffset : 0,
			// target: false,
			// targetOffset : 0,
			// position: "bottom-right"
		},

		events: {
			
		},

		initialize: function(options){
			_.bindAll(this, 'render', 'displayTOC');
			
			$(this.el).addClass("ui-toc");

			return View.prototype.initialize.call(this, options);

		},
		
		postRender: function() {
			
			this.displayTOC();
			
		},
		
		displayTOC: function() {
			var titleText = [];
			$(this.options.titleEl + '[id]').each(function() { 
				titleText.push( { text : $(this).text(), id : $(this).attr('id') } ) 
			});

			var tocItems = "";
				
			for(var i in titleText){
				var item = titleText[i];
				tocItems += '<li><a href="#' + item.id + '">' + item.text + '</a></li>';
			}
			
			var html = "<ul class='toc'>" + tocItems + "</ul>"
			
			$(this.el).prepend(html);
		}

	});


	// fallbacks
	if( _.isUndefined( Backbone.UI ) ) Backbone.UI = {};
	Backbone.UI.TOC = TOC;

	// Support module loaders
	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		// Expose as module.exports in loaders that implement CommonJS module pattern.
		module.exports = TOC;
	} else {
		// Register as a named AMD module, used in Require.js
		if ( typeof define === "function" && define.amd ) {
			
			define( [], function () { return TOC; } );
		}
	}
	// If there is a window object, that at least has a document property
	if ( typeof window === "object" && typeof window.document === "object" ) {
		window.Backbone = Backbone;
		// update APP namespace
		if( typeof APP != "undefined" && (_.isUndefined( APP.UI ) || _.isUndefined( APP.UI.TOC ) ) ){
			APP.UI = APP.UI || {};
			APP.UI.TOC = Backbone.UI.TOC;
			window.APP = APP;
		}
	}



})(this.jQuery, this._, this.Backbone);