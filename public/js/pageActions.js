function showLoader(show, divId) {
    const $container = document.getElementById(`${divId}`);

    if ($container) {
        if (show) {
            const $loaderContainer = document.createElement('div');
            $loaderContainer.id = 'loader';
            $loaderContainer.classList.add('spinner-grow', 'text-light');
            $loaderContainer.role = "status";

            const $loaderText = document.createElement('span');
            $loaderText.classList.add('sr-only');
            $loaderText.innerHTML = 'loading...';

            $loaderContainer.appendChild($loaderText);
            $container.appendChild($loaderContainer);

        } else {
            const $div = document.querySelector('#loader');
            if ($div) {
                $container.removeChild($div)
            }
            showTemplate(true)
        }
    }
}

function updateTemplatesWhetherUserConnectedOrNot() {
    let $mainHook = document.getElementById("main-hook");

    if ($mainHook) {
        if (sessionStorage.getItem('user') === null) {

            try {
                //Add nav items Movies and Historical
                navItemsConstruct();
                homeButtonsConstruct();

                removeDomElement('logout-item', null);
            } catch (e) {
                throw new Error(e);
            }
        } else {
            try {
                removeDomElement("home-buttons", null);

                removeDomElement("movies-item", null);

                removeDomElement("historical-item", null);

                addDomElement(
                    'logout-item',
                    'a',
                    [],
                    {
                        href: '#deconnexion'
                    },
                    "search-logout-item",
                    null
                );

            } catch (e) {
                throw new Error(e);
            }
        }
    }
}

async function signIn(user) {

    try {
        await myFetch(apiInscriptionUrl, 'POST', {'Content-type': 'application/json'}, JSON.stringify(user));

        showLoader(true, 'app');
        updateTemplatesWhetherUserConnectedOrNot();
        redirectionAction('#accueil');

    } catch (e) {
        throw new Error(e.status);
    }
}

async function connect(userData) {
    try {
        let apiConnexionResponse = await fetch(apiConnexionUrl, {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(userData)
        });

        if (apiConnexionResponse.status === 200) {
            let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

            sessionStorage.setItem('user', token);
            showLoader(true, 'app');
            updateTemplatesWhetherUserConnectedOrNot();

            redirectionAction('#movies');
        }


    } catch (e) {
        throw new Error(e.status);
    }
}

async function signOut() {

    await fetch(apiSignOutUrl);

    sessionStorage.setItem('user', null);

    redirectionAction('#accueil');
}

async function displayMovies() {
    showLoader(true, 'all-movies-items');

    try {
        //moviesData with MyFetchis a string !
        // var moviesData = await myFetch(apiMoviesUrl, 'GET', {'Content-type': 'application/json'}, null);
        var moviesData = await fetch(
            apiMoviesUrl,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
                credentials: 'include'
            });

        // var movieList = JSON.parse(moviesData.body);
        var movieList = await moviesData.json();
        var movieListObject = JSON.parse(movieList);
        console.log('movieListObject', movieListObject);

        let movieContent = document.getElementById('all-movies-items');

        //I would have written movieData.search if the key search was a variable or does not contain any special character (including caps)
        for (var i = 0; i < movieListObject["Search"].length; i++) {

            var movie = movieListObject["Search"][i];
            const movieItem = movieConstruct(movie, i);

            if (movieContent) {
                movieContent.appendChild(movieItem);
            }
        }
    } catch (e) {
        let eMessage = e.toString();
        throw new Error(`myFetch in displayMovies doesn't work ${eMessage}`);
    }
}

