define(['jquery',
		'underscore',
		'handlebars'
	], function ($, _, Handlebars) {
		Handlebars.registerHelper('noop', function (opts) {
			return opts.fn(this);
		});
		Handlebars.registerHelper('bold', function (options) {
			return new Handlebars.SafeString(
				'<div class="mybold">'
				+ options.fn(this)
				+ '</div>');
		});
		Handlebars.registerHelper('dropdown', function (context, options) {
			var buildDropdown = '<select>';
			// console.log('handlebars helper :: dropdown', 'context', context, 'options', options);
			_(context).each(function (v, k) {
				if (k === options.toUpperCase()) {
					buildDropdown += '<option selected>' + k + '</option>'
				} else buildDropdown += '<option>' + k + '</option>';
			});
			buildDropdown += '</select>';
			return buildDropdown;
			// console.log('buildDropdown', buildDropdown);
			// for (var i=0, j = context.length; i<j; i++) {
			// 	// if (context)
			// 	console.log('options', options);
			// 	// ret += options.fn(context[i]);
			// }
			// return ret;
		});
	});