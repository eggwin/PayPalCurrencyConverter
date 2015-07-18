define([
		'jquery',
		'backbone',
		'IndexView'
	], function ($, Backbone, IndexView) {
	'use strict';
	return Backbone.Router.extend({
		routes: {
			'': 'index'
		},
		initialize: function () {
			Backbone.history.start({
				root: '/',
				pushState: true
			});
		},
		index: function () {
			var index = new IndexView();
			// handle the rendering elsewhere to resolve async
			// index.render();
		}
	});
});