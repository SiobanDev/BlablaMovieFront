'use strict';

(function () {
    async function init() {
        try {
            const response = await isUserConnected();

            new Router([
                new Route('accueil', 'home.html', response.status, doAccueilActions, true),

                new Route('inscription', 'inscription.html', response.status, doInscriptionActions),

                new Route('connexion', 'connexion.html', response.status, doConnexionActions),

                new Route('deconnexion', 'home.html', response.status, doDeconnexionActions),

                new Route('movies', 'movies.html', response.status, doMoviesActions),

                new Route('historical', 'historical.html', response.status, doHistoricalActions),

                new Route('contact', 'contact.html', response.status),

                new Route('infos', 'infos.html', response.status),

                new Route('error', 'error.html', response.status, doErrorActions)
            ]);

        } catch (e) {
            console.error(e);
        }
    }

    init().then();

}());