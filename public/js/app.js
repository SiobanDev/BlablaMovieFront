'use strict';

(function () {
    showLoader(true, 'app');
    localStorage.setItem("token", null);

    async function init() {
        try {
            await updateNavIfUserConnectedOrNot();

            new Router([
                new Route('accueil', 'home.html', doAccueilActions, true),

                new Route('inscription', 'inscription.html', doInscriptionActions),

                new Route('connexion', 'connexion.html', doConnexionActions),

                new Route('deconnexion', 'home.html', doDeconnexionActions),

                new Route('movies', 'movies.html', doMoviesActions),

                new Route('historical', 'historical.html', doHistoricalActions),

                new Route('contact', 'contact.html'),

                new Route('infos', 'infos.html'),

                new Route('error', 'error.html', doErrorActions)
            ]);

        } catch (e) {
            console.error(e);
        }
    }

    init().then();

}());