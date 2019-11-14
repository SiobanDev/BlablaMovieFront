function showLoader(show, divName) {
    const $container = document.getElementById(`${divName}`);

    if (show && $container) {
        const $div = document.createElement('div')

        $container.innerHTML = "";
        $div.id = 'loader'
        $div.innerHTML = 'loading...'
        $container.appendChild($div)
    }
}

function updateTemplatesForUserStatus(userIsConnected) {

    let $logoutItem = document.getElementById('logout-item');
    let $homeButton = document.getElementById('home-buttons');
    //$movieItemList is an HtmlCollection
    let $movieItemList = document.getElementsByClassName('movies-item');
    let $historicalItemList = document.getElementsByClassName('historical-item');

    if ($logoutItem) {
        $logoutItem.style.display = userIsConnected ? "block" : "none";
    }

    if ($homeButton) {
        $homeButton.style.display = userIsConnected ? "none" : "flex";
    }

    if ($movieItemList) {
        //forEarch does not work with HtmlCollections, so I use Array.from
        Array.from($movieItemList).forEach(($movieItem) => {
            console.log('okok')
            $movieItem.style.display = userIsConnected ? "block" : "none";
        });
    }

    if ($historicalItemList) {
        Array.from($historicalItemList).forEach(($historicalItem) => {
            $historicalItem.style.display = userIsConnected ? "block" : "none";
        });
    }
}


async function signIn(user) {

    await myFetch('http://api.blablamovie.local:8000/user', 'POST', {'Content-type': 'application/json'}, JSON.stringify(user));

    showLoader(true, 'app');
    updateTemplatesForUserStatus(true);
    redirectionAction('#accueil');
}

async function connect(userData) {

    //JSON.stringify allow to sent the array object connectedUser
    await myFetch('http://api.blablamovie.local:8000/login', 'POST', {'Content-type': 'application/json'}, JSON.stringify(userData));

    sessionStorage.setItem('user', await getUser());
    showLoader(true, 'app');
    updateTemplatesForUserStatus(true);

    redirectionAction('#movies');
}

async function signOut() {

    await myFetch('http://api.blablamovie.local:8000/logout');
    sessionStorage.setItem('user', null);

    // redirectionAction('#accueil');
}

async function displayMovies() {
    showLoader(true, 'all-movies-items');

    try {
        //moviesData is a string !
        var moviesData = await myFetch('http://api.blablamovie.local:8000/movies', 'GET', {'Content-type': 'application/json'}, null);

        var movieList = JSON.parse(moviesData.body);
        let movieContent = document.getElementById('all-movies-items');

        //I would have written movieData.search if the key search was a variable or does not contain any special character (including caps)
        for (var i = 0; i < movieList["Search"].length; i++) {

            var movie = movieList["Search"][i];
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

