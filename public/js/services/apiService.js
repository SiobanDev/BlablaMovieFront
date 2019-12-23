async function isUserConnected() {
    try {
        const response = await fetch(checkConnexionApiUrl, {
                method: 'GET',
                headers:
                    {
                        'Content-type': 'application/json'
                    },
                credentials: 'include'
            }
        );
        updateNavIfUserConnectedOrNot(response.status);
        updateHomeIfUserConnectedOrNot(response.status);

        return response;

    } catch (e) {
        throw new Error(e);
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

        return (apiConnexionResponse.status === 200);

    } catch (e) {
        throw new Error(e);
    }
}

async function signOut() {
    const response = await fetch(apiSignOutUrl);

    return response;
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
            showLoader(false, 'all-movies-items');

            if (movieContent) {
                movieContent.appendChild(movieItem);
            }
        }
    } catch (e) {
        throw new Error(e);
    }
}

