//https://medium.com/frontend-fun/js-vanilla-script-spa-1b29b43ea475
"use strict";

/**
 *
 * @param name, is the name of our route, we are going to use it to check if the route is the active one.
 * @param htmlName, is the name of the HTML to load with the route.
 * @param callback
 * @param defaultRoute, true if the route is the default route of our app.
 * @constructor
 */
function Route(name, htmlName, callback, defaultRoute) {
    try {
        if (!name || !htmlName) {
            throw 'Error : name or htmlName params is not defined.';
        }
        this.constructor(name, htmlName, callback, defaultRoute);
    } catch (e) {
        console.error(e);
    }
}

//A function provided by each route to check if it’s the active one. It receives the actual window location
Route.prototype = {
    name: undefined,
    htmlName: undefined,
    default: undefined,
    callback: undefined,

    constructor: function (name, htmlName, callback, defaultRoute) {
        this.name = name;
        this.htmlName = htmlName;
        this.default = defaultRoute;
        this.callback = callback;
    },
    isActiveRoute: function (hashedPath) {
        return hashedPath.replace('#', '') === this.name;
    }
}