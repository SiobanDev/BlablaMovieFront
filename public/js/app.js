'use strict';

(function () {
    function init() {
        new Router([

            new Route('accueil', 'home.html', (pageContent) => {
                try{
                    homeAction(pageContent);
                } catch {
                    throw Error('homeAction failed');
                };

            }, true),

            new Route('movies', 'movies.html', (pageContent) => {
                try{
                    movieAction(pageContent);
                } catch {
                    throw Error('movieAction failed');
                };

            }),
            new Route('historical', 'historical.html'),
            new Route('contact', 'contact.html'),
            new Route('infos', 'infos.html'),

            new Route('connexion', 'connexionForm.html', (pageContent) => {
                try{
                    addToDOM(pageContent);
                } catch {
                    throw Error('addToDom failed');
                };

                try {
                    connexionFormAction();

                } catch {
                    throw Error('connexionAction failed');
                };

            }),

            new Route('inscription', 'inscriptionForm.html', (pageContent) => {
                try{
                    addToDOM(pageContent);
                } catch {
                    throw Error('addToDom failed');
                };

                try {
                    inscriptionFormAction();

                } catch {
                    throw Error('inscriptionAction failed');
                };

            }),

            new Route('validation', 'validation.html', (pageContent) => {
                try{
                    addToDOM(pageContent);

                } catch {
                    throw Error('validation failed');
                };
        }),
            new Route('error', 'error.html')
        ]);
    }
    init();

    function myFetch(url, method, headersList, body) {
        //dans une arrow fonction, le scope du this remonte au parent (et continue de remonter si le parent est aussi un arrow fonction
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            //dans les functions "normales", le scope du this est celui de la fonction-même
            req.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE)  {
                    if (this.status === 200 || this.status === 201) {
                        console.log("Réponse reçu: %s", this.responseText);
                        resolve(this.responseText);
                    } else {
                        console.log("Status de la réponse: %d (%s)", this.status, this.statusText, this.responseText);
                        reject(this.status, this.statusText);
                    }
                }
            }

            req.open(method, url);

            //To send EXPLICITLY the value of the content-type.
            //On JS object of type Object, you can not use foreach, so object.keys allows to make an array of the object's keys
            Object.keys(headersList).forEach(header => {
                console.log(headersList[header]);
                req.setRequestHeader(header, headersList[header]);
            })

            req.send(body);

        })
    }

    function addToDOM(res) {
        document.getElementById('app').innerHTML = res;
    }

    function redirectionAction(path) {
        document.location.href=`.${path}`;
    }

    function homeAction (res) {
        addToDOM(res);
    }

    function inscriptionFormAction () {

        const $signUpForm = document.getElementById('inscription-form');

        if($signUpForm) {
            $signUpForm.addEventListener('submit', async (e) => {
                //I didn't precise method or action in the inscription form, so symfony does something with the event by default that I don't want.
                //To avoid that :
                e.preventDefault();

                var user = getDataFromForm(['login', 'password', 'birth_date', 'mail']);
                console.log(user);

                try{
                    await myFetch('http://api.blablamovie.local:8000/user', 'POST', {'Content-type' : 'application/json'}, JSON.stringify(user));

                    redirectionAction('#validation');

                } catch {
                    throw Error('myFetch doesn\'t work');
                }
            })
        } else {
            throw Error('#inscriptionForm undefined');
        }
    }

    function connexionFormAction () {

        const $signInForm = document.getElementById('connexion-form');

        if($signInForm) {
            $signInForm.addEventListener('submit', async (e) => {
                //I didn't precise method or action in the inscription form, so symfony does something with the event by default that I don't want.
                //To avoid that :
                e.preventDefault();

                var connectedUser = getDataFromForm(['mail', 'password']);
                console.log(connectedUser);

                try{
                    await myFetch('http://api.blablamovie.local:8000/login', 'POST', {'Content-type' : 'application/json'}, JSON.stringify(connectedUser));

                    redirectionAction('#movies');

                } catch {
                    throw Error('myFetch doesn\'t work');
                }
            })
        } else {
            throw Error('#connectionForm undefined');
        }
    }

    function movieAction() {
        displayMovies();
    }

    async function displayMovies() {
        try {
            await myFetch('http://api.blablamovie.local:8000/movies', 'GET', {'Content-type': 'application/json'}, null);

        } catch {
            throw Error('myFetch doesn\'t work');
        }
    }

}());