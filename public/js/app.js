'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('accueil', 'home.html', true),
            new Route('movies', 'movies.html'),
            new Route('historical', 'historical.html'),
            new Route('contact', 'contact.html'),
            new Route('infos', 'infos.html'),
            new Route('error', 'error.html')
        ]);
    }
    init();
}());