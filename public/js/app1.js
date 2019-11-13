'use strict';

function showLoader(show) {
    const $container = document.querySelector('#app')
    if (show) {
        showTemplate(false)
        const $div = document.createElement('div')
        $div.id = 'loader'
        $div.innerHTML = 'loading...'
        $container.appendChild($div)
    } else {
        const $div = document.querySelector('#loader')
        if ($div) {
            $container.removeChild($div)
        }
        showTemplate(true)
    }

}

function showTemplate(show) {
    if(document.querySelector('#app > div')) {
        document.querySelector('#app > div').style.display = show ? 'flex' : 'none'
    }
}

(function () {
    async function init() {
        showLoader(true)
        window.sessionStorage.setItem('user', await getUser())
        showLoader(false)
        new Router([

            //ROUTE ACCUEIL
            new Route('accueil', 'home.html', async (pageContent) => {
                try{
                    addToDOM(pageContent, 'app');

                } catch (e) {
                    throw Error(`addToDom failed ${e}`);
                };

                //myFetch is the first called function, because it's the only one returning a promise.
                //Then comes userConnected, because it's in the same try{}.
                //That means that the template is not yet download ! checkIfUserIsConnected uses some elements of the template though.
                //That's why I need to add conditions in checkIfUserIsConnected to manage the case where some elements are undefined or null.
                showLoader(true)
                try {
                    await myFetch('http://api.blablamovie.local:8000/users/me');
                    checkIfUserIsConnected(true);

                } catch (e) {
                    console.log(e);
                    checkIfUserIsConnected(false);
                    // throw new Error(JSON.stringify(e));
                }
                showLoader(false)

            }, true),

            //ROUTE CONNEXION
            new Route('connexion', 'connexionForm.html', (pageContent) => {
                try{
                    addToDOM(pageContent, 'app');

                } catch (e) {
                    throw Error(`addToDom failed ${e}`);
                };

                try {
                    doConnexionStuff();

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
                    doDeconnexionStuff();
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
                    doInscriptionStuff();


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