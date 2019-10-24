'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('accueil', 'home.html', true),
            new Route('movies', 'movies.html', true),
            new Route('historical', 'historical.html', true),
            new Route('contact', 'contact.html', true),
            new Route('infos', 'infos.html', true),
            new Route('error', 'error.html', true)
        ]);
    }
    init();
}());