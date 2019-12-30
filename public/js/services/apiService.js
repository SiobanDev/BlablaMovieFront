async function signIn(userData) {
    try {
        const apiResponse = await fetch
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

        return apiResponse.status >= 200 && apiResponse.status < 400;

    } catch (e) {
        throw new Error(e);
    }
}

async function connect(userData) {
    try {
        let apiResponse = await fetch
        (
            apiConnectionUrl,
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

        return apiResponse;
    } catch (e) {
        throw new Error(e);
    }
}

async function signOut() {
    const response = await fetch(apiSignOutUrl);

    return ((response.status === 200));
}

async function displayMovies() {
    let getToken = localStorage.getItem("token");

    showLoader(true, 'all-movies-items');

    try {
        const response = await fetch(
            apiMoviesUrl,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${getToken}`
                },
                credentials: 'include',
            }
        );

        const movieList = await response.json();

        showLoader(false, 'all-movies-items');

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