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
        this.rootElem = document.getElementById('app');
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
        this.hasChanged(this, r);
    },
    //If the window location change then hasChanged loads the correct active Route and call another function to load its HTML.
    // If the window location is empty then hasChanged loads the default Route.
    hasChanged: function (scope, r) {
        for (var i = 0, lenght = r.length; i < lenght; i++) {

            var route = r[i];

            if ((window.location.hash.length > 0) && (route.isActiveRoute(window.location.hash.substr(1)))) {

                scope.goToRoute(route.htmlName);

            } else if (route.default) {
                    scope.goToRoute(route.htmlName);
            }
        }
    },
    // loadView gets and loads the correct HTML for the active route.
    loadView: function (htmlName) {
        //Renvoie une promesse OU je rajoute un callback.
        (function (scope) {
            var url = '/public/views/' + htmlName,
                xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {

                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this);
    }
};