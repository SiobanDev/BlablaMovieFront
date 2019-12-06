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

function updateNavIfUserConnectedOrNot() {
    if (!isUserConnected()) {
        try {
            //Add nav items Movies and Historical
            removeDomElementList
            (
                [
                    "header-nav__movies-item",
                    "header-historical-item",
                    "footer-nav__movies-item",
                    "footer-historical-item",
                    'logout-item'
                ]
            );

            return false;

        } catch (e) {
            throw new Error(e);
        }

    } else {
        try {
            addNavItemsForConnectedUser("header-nav");
            addNavItemsForConnectedUser("footer-nav");

            //LogoutItem
            addDomElement(
                'logout-item',
                'a',
                "search-logout-item",
                null,
                {
                    href: '#deconnexion'
                },
                "Déconnexion",
            );
            return true;

        } catch (e) {
            throw new Error(e);
        }
    }
}

function updateHomeIfUserConnectedOrNot() {
    let $mainHook = document.getElementById("main-hook");

    if (!isUserConnected()) {
        try {
            if ($mainHook) {
                addButtonsForConnectedUser($mainHook);
            }
            return false;

        } catch (e) {
            throw new Error(e);
        }
    } else {
        try {
            if ($mainHook) {
                removeDomElement("home-buttons");
            }
            return true;

        } catch (e) {
            throw new Error(e);
        }
    }
}

async function signIn(userData) {
    try {
        const apiConnexionResponse = await fetch
        (
            apiInscriptionUrl,
            {
                method: 'POST',
                headers:
                    {
                        'Content-type': 'application/json'
                    },
                credentials: 'include',
                body: JSON.stringify(userData)
            }
        );

        if (apiConnexionResponse.status === 200) {
            showLoader(true, 'app');
            redirectionAction('#accueil');
            updateHomeIfUserConnectedOrNot();

            return true;
        }
        return false;

    } catch (e) {
        throw new Error(e);
    }
}

async function connect(userData) {
    try {
        let apiConnexionResponse = await fetch
        (
            apiConnexionUrl,
            {
                method: 'POST',
                headers:
                    {
                        'Content-type': 'application/json'
                    },
                credentials: 'include',
                body: JSON.stringify(userData)
            }
        );

        // await fetch(checkConnexionApiUrl,{
        //     method: 'get',
        //     headers:
        //         {
        //             'Content-type': 'application/json'
        //         },
        //     credentials: 'include'
        // })

        return ((apiConnexionResponse.status === 200) ? true : false);

    } catch (e) {
        throw new Error(e);
    }
}

async function signOut() {
    const response = await fetch(apiSignOutUrl);

    return ((response.status === 200) ? true : false);
}

async function displayMovies() {
    showLoader(true, 'all-movies-items');

    try {
        //// moviesData with MyFetchis a string !
        // var moviesData = await myFetch(apiMoviesUrl, 'GET', {'Content-type': 'application/json'}, null);
        const response = await fetch(
            apiMoviesUrl,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
                credentials: 'include',
            }
        );

        const movieList = await response.json();

        let movieContent = document.getElementById('all-movies-items');

        //I would have written movieData.search if the key search was a variable or does not contain any special character (including caps)
        for (let i = 0; i < movieList["Search"].length; i++) {

            const movie = movieList["Search"][i];
            const movieItem = movieConstruct(movie, i);

            if (movieContent) {
                movieContent.appendChild(movieItem);
            }
        }
    } catch (e) {
        throw new Error(e);
    }
}

