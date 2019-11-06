'use strict';

(function () {
    function init() {
        new Router([
            new Route('accueil', 'home.html', (res) => {
                try{
                    homeAction(res);
                } catch {
                    throw Error('homeAction failed');
                };

            }, true),
            new Route('movies', 'movies.html'),
            new Route('historical', 'historical.html'),
            new Route('contact', 'contact.html'),
            new Route('infos', 'infos.html'),
            new Route('inscription', 'inscriptionForm.html', (pageContent) => {
                try{
                    addToDOM(pageContent);
                } catch {
                    throw Error('addToDom failed');
                };

                try {
                    inscriptionAction();
                } catch {
                    throw Error('inscriptionAction failed');
                };

            }),
            new Route('error', 'error.html')
        ]);
    }
    init();

    // {
    //      "content-type" : "application/json",
    //      "content-type" : "application/json",
    //      "content-type" : "application/json",
    //      "content-type" : "application/json",
    // }

    function myFetch(url, method, headersList, body) {
        //dans une arrow fonction, le scope du this remonte au parent (et continue de remonter si le parent est aussi un arrow fonction
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            //dans les functions "normales", le scope du this est celui de la fonction-même
            req.onreadystatechange = function () {
                if ((this.readyState === XMLHttpRequest.DONE) && (this.status === 200)) {
                    console.log("Réponse reçu: %s", this.responseText);
                    resolve(this.responseText);
                } else {
                    console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
                    reject(this.status, this.statusText);
                }
            }

            req.open(method, url);

            //On JS object of type Object, you can not use foreach, so object.keys allows to make an array of the object's keys
            Object.keys(headersList).forEach(header => {
                req.setRequestHeader(header, headersList[header]);
            })

            req.send(body);

        })
    }

    function addToDOM(res) {
        document.querySelector('#app').innerHTML = res;
    }

    function homeAction (res) {
        addToDOM(res);
    }

    function inscriptionAction () {

        const $signUpForm = document.querySelector('#inscription-form');

        console.log('$signUpForm', $signUpForm);

        if($signUpForm) {
            $signUpForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                var user = getDataFromForm($signUpForm, ['login', 'password', 'birth_date', 'mail']);
                console.log(user);

                try{
                    await myFetch('http://blablamovie.local:8000/user', 'POST', {'Content-type' : 'application/json'}, JSON.stringify(user));

                } catch {
                    throw Error('myFetch doesn\'t work');
                }
            })
        } else {
            throw Error('#inscriptionForm undefined');
        }

    }
}());