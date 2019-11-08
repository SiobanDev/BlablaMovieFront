function addToDOM(res, parentElementId) {
    document.getElementById(`${parentElementId}`).innerHTML = res;
}

function redirectionAction(path) {
    return new Promise(resolve => resolve(document.location.href=`.${path}`));
}

function homeAction (res) {
    addToDOM(res, 'app');
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

                await redirectionAction('#validation');

            } catch (e) {
                throw Error(`myFetch in InscriptionFormAction doesn't work ${e}`);
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
            //I didn't precise method or action in the inscription form, by defalut, the form manages the redirection.
            // However I want to make the redirection myself, so to avoid that :
            e.preventDefault();

            var connectedUser = getDataFromForm(['mail', 'password']);

            try{
                //JSON.stringify allow to sent the array object connectedUser
                await myFetch('http://api.blablamovie.local:8000/login', 'POST', {'Content-type' : 'application/json'}, JSON.stringify(connectedUser));

                await redirectionAction('#movies');

            } catch (e) {
                throw Error(`myFetch in connexionFormAction doesn't work ${e}`);
            }
        })
    } else {
        throw Error(`#connectionForm undefined`);
    }
}

async function displayMovies() {

    try {
        //moviesData is a string !
        var moviesData = await myFetch('http://api.blablamovie.local:8000/movies', 'GET', {'Content-type': 'application/json'}, null);

        var movieList = JSON.parse(moviesData);

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
    var movieContent = document.getElementById('movies-content');

    var movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');
    movieContent.appendChild(movieItem);

    var movieView = document.createElement('div');
    movieView.classList.add('movie-view');
    movieItem.appendChild(movieView);

    var movieOrder = document.createElement('p');
    movieOrder.classList.add('movie-order');
    movieOrder.innerHTML = i;
    movieView.appendChild(movieOrder);

    var moviePoster = document.createElement('img');
    moviePoster.classList.add('movie-poster');
    moviePoster.setAttribute('src', movieData['Poster']);
    movieView.appendChild(moviePoster);

    var movieYear = document.createElement('p');
    movieYear.classList.add('movie-year');
    movieYear.innerHTML = movieData['Year'];
    movieView.appendChild(movieYear);

    var movieInfos = document.createElement('div');
    movieInfos.classList.add('movie-infos');
    movieItem.appendChild(movieInfos);

    var movieTitle = document.createElement('p');
    movieTitle.classList.add('movie-title');
    movieTitle.innerHTML = movieData['Title'];
    movieInfos.appendChild(movieTitle);

    var movieVoteButton = document.createElement('button');
    movieVoteButton.classList.add('movie-vote-button');
    movieVoteButton.innerHTML = "12";
    movieInfos.appendChild(movieVoteButton);

    var movieVoteIcon = document.createElement('i');
    movieVoteIcon.classList.add('vote-icon', 'far', 'fa-hand-point-up');
    movieVoteButton.appendChild(movieVoteIcon);

}
