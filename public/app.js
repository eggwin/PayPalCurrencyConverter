/*global $:true, console:true */
require(['config'], function (config) {
    'use strict';
    require(['router'], function (Router) {
        var app = {
            initialize: function () {
                console.log('app initialized');
            }
        };

        // initialize the instance
        app.initialize();

        // set up the router
        var router = new Router();
    });
});