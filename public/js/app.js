'use strict';

(function () {
    async function init() {

        new Router([

            //ROUTE ACCUEIL
            new Route('accueil', 'home.html', async (pageContent) => {
                try{
                    addToDOM(pageContent, 'app');

                } catch (e) {
                    throw Error(`addToDom failed ${e}`);
                };

                try {
                    await myFetch('http://api.blablamovie.local:8000/users/me');
                    userConnectedOrNot(true);

                } catch (e) {
                    console.log(e);
                    userConnectedOrNot(false);
                    // throw new Error(JSON.stringify(e));
                }

            }, true),

            //ROUTE CONNEXION
            new Route('connexion', 'connexionForm.html', (pageContent) => {
                try{
                    addToDOM(pageContent, 'app');
                } catch (e) {
                    throw Error(`addToDom failed ${e}`);
                };

                try {
                    connexionFormAction();

                } catch (e) {
                    throw Error(`connexionAction failed ${e}`);
                };

            }),

            //ROUTE DECONNEXION
            new Route('deconnexion', 'home.html', (pageContent) => {
                try{
                    addToDOM(pageContent, 'app');
                } catch (e) {
                    throw Error(`addToDom failed ${e}`);
                };

                try {
                    deconnexionAction();
                } catch (e) {
                    throw Error(`deconnexionAction failed ${e}`);
                }
            }),

            //ROUTE INSCRIPTION
            new Route('inscription', 'inscriptionForm.html', (pageContent) => {
                try{
                    addToDOM(pageContent, 'app');
                } catch (e) {
                    throw Error(`addToDom ${e}`);
                };

                try {
                    inscriptionFormAction();


                } catch (e) {
                    throw Error(`inscriptionAction ${e}`);
                };

            }),

            //ROUTE VALIDATION
            new Route('validation', 'validation.html', (pageContent) => {
                try{
                    addToDOM(pageContent, 'app');

                } catch (e) {
                    throw Error(`validation failed ${e}`);
                };
            }),

            //ROUTE MOVIES
            new Route('movies', 'movies.html', async (pageContent) => {
                try{
                    addToDOM(pageContent, 'app');
                } catch (e) {
                    throw Error(`addToDom ${e}`);
                };

                try{
                    await displayMovies();
                } catch (e) {
                    throw Error(`displayMovies failed ${e}`);
                };

            }),

            //ROUTE HISTORIQUE
            new Route('historical', 'historical.html'),

            //ROUTE CONTACT
            new Route('contact', 'contact.html'),

            //ROUTE INFOS
            new Route('infos', 'infos.html'),

            //ROUTE ERROR
            new Route('error', 'error.html')
        ]);

    }
    init().then();

}());