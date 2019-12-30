//https://medium.com/frontend-fun/js-vanilla-script-spa-1b29b43ea475
"use strict";

//Constructor
function Router(routes) {
    try {
        if (!routes) {
            throw 'Error : routes param is not defined.';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);
    }
}

/**
 *
 * @type {{routes: *, init: Router.init, hasChanged: Router.hasChanged, rootElem: *, constructor: Router.constructor, loadView: Router.loadView}}
 */
Router.prototype = {
    // routes is an array containing the Routes of our app.
    routes: undefined,
    // rootElem is the root element of our application, the place where other HTML’s gets rendered. In our case, it's #app in index.html
    rootElem: undefined,
     constructor: function (routes) {
        this.routes = routes;
        // this.rootElem = document.getElementById('app');
    },
    //creates a listener to the hashchange event of window.
    //hashchange event is fired when the fragment identifier of the URL has changed.
    init: function () {
        var r = this.routes;

        //scope is the scope of the Router instance
        (function (scope, r) {
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);

        try{
            this.hasChanged(this, r);

        } catch {
            throw new Error('hasChanged error');
        }

    },
    //If the window location change then hasChanged loads the correct active Route and call another function to load its HTML.
    // If the window location is empty then hasChanged loads the default Route.
    hasChanged: async function (scope, r) {

        for (var i = 0, length = r.length; i < length; i++) {

            var route = r[i];

            var pageContent = {
                content: undefined,
                error: undefined
            };

            if (((window.location.hash.length > 0) && (route.isActiveRoute(window.location.hash.substr(1))))
                || (window.location.hash.length === 0 && route.default)) {

                try{
                    pageContent.content = await scope.loadView(route.htmlName);

                    if (route.callback) {
                        route.callback(pageContent.content);
                    }
                } catch (e) {
                    pageContent.error = e;
                }
            }
        }
    },

    // loadView gets and loads the correct HTML for the active route.
    loadView: async function (htmlName) {
        let response = await fetch('/public/views/' + htmlName);
        let data = await response.text();
        return data;

    }
};