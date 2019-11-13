'use strict';

(function () {
    async function init() {

        showLoader(true, 'app');

        sessionStorage.setItem('user', await getUser());

        new Router([
            new Route('accueil', 'home.html', (pageContent) => {
                showLoader(true, 'app');
                //myFetch is the first called function, because it's the only one returning a promise.
                //Then comes userConnected, because it's in the same try{}.
                //That means that the template is not yet download ! checkIfUserIsConnected uses some elements of the template though.
                //That's why I need to add conditions in checkIfUserIsConnected to manage the case where some elements are undefined or null.

                try{
                    addToDOM(pageContent, 'app');

                    if(sessionStorage.getItem('user') !== "null") {
                        checkIfUserIsConnected(true);

                    } else {
                        checkIfUserIsConnected(false);
                    }

                } catch (e) {
                    throw Error(`addToDom failed ${e}`);
                }

            }, true),

            new Route('inscription', 'inscriptionForm.html', (pageContent) => {
                try {
                    addToDOM(pageContent, 'app');
                } catch (e) {
                    throw Error(`addToDom ${e}`);
                }

                try {
                    doInscriptionStuff();

                } catch (e) {
                    throw Error(`doInscriptionStuff ${e}`);
                }
            }),

            new Route('connexion', 'connexionForm.html', async (pageContent) => {

                if(sessionStorage.getItem('user') === "null") {
                    try {
                        addToDOM(pageContent, 'app');

                    } catch (e) {
                        throw Error(`addToDom failed ${e}`);
                    };

                    const $signInForm = document.getElementById('connexion-form');

                    if($signInForm) {

                        $signInForm.addEventListener('submit', async (e) => {
                            e.preventDefault();

                            try {
                                await doConnexionStuff();

                            } catch (e) {
                                throw Error(`doConnexionStuff failed ${e}`);
                            };
                        });

                    } else {
                        throw Error(`#connectionForm undefined`);
                    }
                }
            }),

            new Route('deconnexion', 'home.html', async (pageContent) => {

                if(sessionStorage.getItem('user') !== "null") {
                    try {
                        addToDOM(pageContent, 'app');
                    } catch (e) {
                        throw Error(`addToDom failed ${e}`);
                    }

                    try {
                        await doDeconnexionStuff();

                    } catch (e) {
                        throw Error(`doDeconnexionStuffs failed ${e}`);
                    }

                } else {
                    redirectionAction('#error');
                }
            }),

            new Route('movies', 'movies.html', async (pageContent) => {

                if(sessionStorage.getItem('user') !== "null") {
                    try {
                        addToDOM(pageContent, 'app');
                    } catch (e) {
                        throw Error(`addToDom ${e}`);
                    }

                    try {
                        await displayMovies();
                    } catch (e) {
                        throw Error(`displayMovies failed ${e}`);
                    }
                } else {
                    redirectionAction('#error');
                }
            }),

            new Route('historical', 'historical.html', (pageContent) => {

                if(sessionStorage.getItem('user') !== "null") {
                    try {
                        addToDOM(pageContent, 'app');
                    } catch (e) {
                        throw Error(`addToDom failed ${e}`);
                    }

                } else {
                    redirectionAction('#error');
                }

            }),

            new Route('contact', 'contact.html'),

            new Route('infos', 'infos.html'),

            new Route('error', 'error.html')
        ]);
    }

    init().then();

}());