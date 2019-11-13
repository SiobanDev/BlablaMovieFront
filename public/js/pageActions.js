function showLoader(show, divName) {
    const $container = document.getElementById(`${divName}`);

    if (show) {
        const $div = document.createElement('div')

        $container.innerHTML = "";
        $div.id = 'loader'
        $div.innerHTML = 'loading...'
        $container.appendChild($div)
    }
}

function checkIfUserIsConnected(connected) {


    let $logoutItem = document.getElementById('logout-item');
    let $connexionButton = document.getElementById('connexion-btn');
    let $inscriptionButton = document.getElementById('inscription-btn');
    //$movieItemList is an HtmlCollection
    let $movieItemList = document.getElementsByClassName('movies-item');
    let $historicalItemList = document.getElementsByClassName('historical-item');

    if($logoutItem) {
        $logoutItem.style.display = connected ? "block" : "none";
    }

    if($connexionButton) {
        $connexionButton.style.display = connected ? "none" : "block";
    }

    if($inscriptionButton) {
        $inscriptionButton.style.display = connected ? "none" : "block";

    }

    if($movieItemList) {
        //forEarch does not work with HtmlCollections, so I use Array.from
        Array.from($movieItemList).forEach(($movieItem) => {
            console.log('okok')
            $movieItem.style.display = connected ? "block" : "none";
        });
    }

    if($historicalItemList) {
        Array.from($historicalItemList).forEach(($historicalItem) => {
            $historicalItem.style.display = connected ? "block" : "none";
        });
    }
}

function addToDOM(res, parentElementId) {
    document.getElementById(`${parentElementId}`).innerHTML = res;
}

function redirectionAction(path) {
    document.location.href=`.${path}`;
}

function doInscriptionStuff () {

    const $signUpForm = document.getElementById('inscription-form');

    if($signUpForm) {
        const callback = async (e) => {
            //I didn't precise method or action in the inscription form, so symfony does something with the event by default that I don't want.
            //To avoid that :
            e.preventDefault();

            var user = getDataFromForm(['login', 'password', 'birth_date', 'mail']);
            console.log(user);

            try {
                await myFetch('http://api.blablamovie.local:8000/user', 'POST', {'Content-type': 'application/json'}, JSON.stringify(user));

            $signUpForm.addEventListener('submit', callback);
            showLoader(true, 'app');
            checkIfUserIsConnected(true);
            redirectionAction('#accueil');

            } catch (e) {
                throw Error(`myFetch in InscriptionFormAction doesn't work ${e}`);
            }
        }

        $signUpForm.removeEventListener('submit', callback);

    } else {
        throw Error('#inscriptionForm undefined');
    }
}

async function doConnexionStuff () {

    var connectedUser = getDataFromForm(['mail', 'password']);

    try {
        //JSON.stringify allow to sent the array object connectedUser
        await myFetch('http://api.blablamovie.local:8000/login', 'POST', {'Content-type': 'application/json'}, JSON.stringify(connectedUser));

        sessionStorage.setItem('user', await getUser());

        showLoader(true, 'app');
        checkIfUserIsConnected(true);
        redirectionAction('#movies');

    } catch (e) {
        throw Error(`myFetch in connexionFormAction doesn't work ${e}`);
    }

}

async function doDeconnexionStuff() {

    try {
        await myFetch('http://api.blablamovie.local:8000/logout');
        sessionStorage.setItem('user', null);

        showLoader(true);
        checkIfUserIsConnected(false);
        redirectionAction('#accueil');

    } catch (e) {
        throw Error(`myFetch in deconnexionAction doesn't work ${e}`);
    }
}

async function displayMovies() {
    showLoader(true, 'all-movies-items');

    try {
        //moviesData is a string !
        var moviesData = await myFetch('http://api.blablamovie.local:8000/movies', 'GET', {'Content-type': 'application/json'}, null);

        var movieList = JSON.parse(moviesData.body);

        //I would have written movieData.search if the key search was a variable or does not contain any special character (including caps)
        for(var i = 0; i < movieList["Search"].length; i++) {

            var movie = movieList["Search"][i];

            movieConstruct(movie, i);

        }

    } catch (e) {
        throw Error(`myFetch in displayMovies doesn't work ${e}`);
    }
}

function movieConstruct(movieData, i) {
    let movieContent = document.getElementById('all-movies-items');

    let movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');
    movieContent.appendChild(movieItem);

    let movieView = document.createElement('div');
    movieView.classList.add('movie-view');
    movieItem.appendChild(movieView);

    let movieOrder = document.createElement('p');
    movieOrder.classList.add('movie-order');
    movieOrder.innerHTML = i;
    movieView.appendChild(movieOrder);

    let moviePoster = document.createElement('img');
    moviePoster.classList.add('movie-poster');
    moviePoster.setAttribute('src', movieData['Poster']);
    movieView.appendChild(moviePoster);

    let movieYear = document.createElement('p');
    movieYear.classList.add('movie-year');
    movieYear.innerHTML = movieData['Year'];
    movieView.appendChild(movieYear);

    let movieInfos = document.createElement('div');
    movieInfos.classList.add('movie-infos');
    movieItem.appendChild(movieInfos);

    let movieTitle = document.createElement('p');
    movieTitle.classList.add('movie-title');
    movieTitle.innerHTML = movieData['Title'];
    movieInfos.appendChild(movieTitle);

    let movieVoteButton = document.createElement('button');
    movieVoteButton.classList.add('movie-vote-button');
    movieInfos.appendChild(movieVoteButton);

    let movieVoteIcon = document.createElement('img');
    movieVoteIcon.classList.add('vote-icon');
    movieVoteIcon.setAttribute('src', '/public/images/clap-clap.png');
    movieVoteButton.appendChild(movieVoteIcon);

    let movieVoteNumber = document.createElement('p');
    movieVoteNumber.classList.add('vote-number');
    movieVoteNumber.innerHTML = "12";
    movieVoteButton.appendChild(movieVoteNumber);

}

