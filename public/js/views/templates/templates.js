define(['handlebars'], function(Handlebars) {

this["templates"] = this["templates"] || {};

this["templates"]["content"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div id=\"contentRegion\">\n</div>";
},"useData":true});

this["templates"]["currencies"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "					<option>"
    + this.escapeExpression(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"currenciesRegion\" class=\"col-md-12\">\n	<form class=\"form-inline\" id=\"convertForm\">\n		<div class=\"form-group col-md-3\">\n			<label for=\"amountToConvert\">Amount</label>\n			<input type=\"number\" class=\"form-control\" id=\"amountToConvert\" placeholder=\"Amount to Convert\" />\n		</div>\n		<div class=\"form-group col-md-3\">\n			<label for=\"currencyToConvertFrom\">Convert From</label>\n			<select id=\"currencyToConvertFrom\">				\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.currency : depth0)) != null ? stack1.mappedCurrencies : stack1),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "			</select>\n		</div>\n		<div class=\"form-group col-md-3\">\n			<label for=\"currencyToConvertTo\">Convert To</label>\n			<select id=\"currencyToConvertTo\">\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.currency : depth0)) != null ? stack1.mappedCurrencies : stack1),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "				}\n			</select>\n		</div>\n		<div class=\"form-group col-md-3\">\n			<button type=\"submit\" class=\"btn btn-primary\" id=\"convertNewAmount\">Convert</button>\n		</div>\n	</form>\n	<h1 id=\"currencyResult\"></h1>\n</div>";
},"useData":true});

this["templates"]["exchanges"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "				<tr>\n					<td>"
    + this.escapeExpression(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + "</td>\n					<td>"
    + ((stack1 = this.lambda(depth0, depth0)) != null ? stack1 : "")
    + "</td>\n				</tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<div id=\"exchangesRegion\">\n	<h1>Exchange Rates</h1>\n	<h4>In "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.currency : depth0)) != null ? stack1.base : stack1), depth0))
    + ", latest as of "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.currency : depth0)) != null ? stack1.formatted : stack1), depth0))
    + "</h4>\n	<table class=\"table table-striped col-md-8\">\n		<thead>\n			<tr>\n				<td>Currency</td>\n				<td>Amount</td>\n			</tr>\n		</thead>\n		<tbody>\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.currency : depth0)) != null ? stack1.mappedCurrencies : stack1),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "		</tbody>\n	</table>\n</div>";
},"useData":true});

this["templates"]["nav"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div id=\"navContainer\" class=\"col-md-12\">\n	<nav>\n		<ul class=\"nav nav-pills\">\n			<li role=\"presentation\" class=\"active col-md-3 transactions\"><a href=\"#transactions\" role=\"tab\" data-toggle=\"tab\" aria-controls=\"transactions\">Display Transaction History</a></li>\n			<li role=\"presentation\" class=\"col-md-3 exchanges\"><a href=\"#exchanges\" role=\"tab\" data-toggle=\"tab\" aria-controls=\"exchanges\">Exchange Rates</a></li>\n			<li role=\"presentation\" class=\"col-md-3 currencies\"><a href=\"#conversions\" role=\"tab\" data-toggle=\"tab\" aria-controls=\"conversions\">Convert Currencies</a></li>\n		</ul>\n	</nav>\n</div>";
},"useData":true});

this["templates"]["transactions"] = Handlebars.template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression, alias3=this.lambda;

  return "				<tr>\n					<td>"
    + alias2(((helper = (helper = helpers.create_time || (depth0 != null ? depth0.create_time : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"create_time","hash":{},"data":data}) : helper)))
    + "</td>\n					<td>"
    + alias2(alias3(((stack1 = ((stack1 = (depth0 != null ? depth0.transactions : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.description : stack1), depth0))
    + "</td>\n					<td colspan=\"1\">"
    + ((stack1 = alias3(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.transactions : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.amount : stack1)) != null ? stack1.symbol : stack1), depth0)) != null ? stack1 : "")
    + alias2(alias3(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.transactions : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.amount : stack1)) != null ? stack1.total : stack1), depth0))
    + "</td>\n					<td class=\"conversionDropdown\">"
    + ((stack1 = (helpers.dropdown || (depth0 && depth0.dropdown) || alias1).call(depth0,((stack1 = (depths[1] != null ? depths[1].currency : depths[1])) != null ? stack1.rates : stack1),((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.transactions : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1.amount : stack1)) != null ? stack1.currency : stack1),{"name":"dropdown","hash":{},"fn":this.program(2, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</td>\n				</tr>\n";
},"2":function(depth0,helpers,partials,data) {
    return this.escapeExpression(this.lambda(depth0, depth0));
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<div id=\"transactions\" class=\"col-md-12\">\n	<h1>Transaction History</h1>\n	<h3>There are "
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.transactions : depth0)) != null ? stack1.count : stack1), depth0))
    + " results</h3>\n	<table class=\"table table-striped col-md-8\">\n		<thead>\n			<tr>\n				<td>Date</td>\n				<td>Description</td>\n				<td>Amount</td>\n				<td>Convert</td>\n			</tr>\n		</thead>\n		<tbody>\n"
    + ((stack1 = helpers.each.call(depth0,((stack1 = (depth0 != null ? depth0.transactions : depth0)) != null ? stack1.payments : stack1),{"name":"each","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "		</tbody>\n	</table>\n</div>";
},"useData":true,"useDepths":true});

return this["templates"];

});