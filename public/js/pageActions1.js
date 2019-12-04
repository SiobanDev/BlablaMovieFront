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
    //Containers
    let $searchLogoutItem = document.getElementById('search-logout-item');
    let $mainHook = document.getElementById('main-hook');
    //I can't use ID because there is a nav both in header and footer
    let $navBarList = document.getElementsByClassName("nav");

    if (sessionStorage.getItem('user') === null) {

        //Movie Nav Item
        addOrRemoveDomElement(
            null,
            [
                'li',
                [
                    "movies-item",
                    "nav-item",
                    "col-s-1"
                ],
                null,
                null,
                null,
                null,
                "nav"
            ]
        );

        //Movie Nav Item Link
        addOrRemoveDomElement(
            null,
            [
                'a',
                null,
                null,
                [
                    "href",
                    "#movies"
                ],
                null,
                "#movies",
                null,
                "movies-item"
            ]
        );

        //Historical Nav Item
        addOrRemoveDomElement(
            null,
            [
                'li',
                [
                    "historical-item",
                    "nav-item",
                    "col-s-1"
                ],
                null,
                null,
                null,
                null,
                "nav"
            ]
        );

        //Historical Nav Item Link
        addOrRemoveDomElement(
            null,
            [
                'a',
                null,
                null,
                [
                    "href",
                    "#historical"
                ],
                null,
                "#historical",
                null,
                "historical-item"
            ]
        );

        // Home buttons
        addOrRemoveDomElement(
            "home-buttons",
            [
                "div",
                null,
                null,
                null,
                null,
                'main-hook',
                null
            ]
        );

        //Connexion Button
        addOrRemoveDomElement(
            'connexion-btn',
            [
                'a',
                [
                    "btn"
                ],
                null,
                [
                    "href",
                    '#connexion'
                ],
                null,
                "home-buttons",
                null
            ]
        );

        //Inscription Button
        addOrRemoveDomElement(
            'inscription-btn',
            [
                'a',
                [
                    "btn"
                ],
                null,
                [
                    "href",
                    '#inscription'
                ],
                null,
                "home-buttons",
                null
            ]
        );

        // let $movieItem = document.createElement('li');
        // $movieItem.classList.add("movies-item", "nav-item", "col-s-1");
        // let $movieItemLink = document.createElement('a');
        // $movieItemLink.setAttribute("href", "#movies");
        // $movieItem.appendChild($movieItemLink);

        // //Historical Item
        // let $historicalItem = document.createElement('li');
        // $historicalItem.classList.add("historical-item", "nav-item", "col-s-1");
        // let $historicalItemLink = document.createElement('a');
        // $historicalItemLink.setAttribute("href", "#historical");
        // $historicalItem.appendChild($historicalItemLink);

        // //$navBarList is an HtmlCollection !
        // Array.from($navBarList).forEach(($navBar) => {
        //     $navBar.appendChild($movieItem);
        //     $navBar.appendChild($historicalItem);
        // });

        // //Home buttons
        // let $homeButtons = document.createElement('div');
        // $homeButtons.id = 'home-buttons';

        // //Connexion button
        // let $connexionButton = document.createElement('a');
        // $connexionButton.id = 'connexion-btn';
        // $historicalItem.classList.add("btn");
        // $connexionButton.setAttribute('href', '#connexion');
        //
        // //Inscription button
        // let $inscriptionButton = document.createElement('a');
        // $inscriptionButton.id = 'inscription-btn';
        // $historicalItem.classList.add("btn");
        // $inscriptionButton.setAttribute('href', '#inscription');
        //
        // $homeButtons.appendChild($inscriptionButton);
        // $homeButtons.appendChild($connexionButton);
        // $mainHook.appendChild($homeButtons);

        //LogOut button
        let $logoutItem = document.getElementById("logout-item");
        $searchLogoutItem.removeChild($logoutItem);
    }

    let $movieItemList = document.getElementsByClassName("movies-item");
    let $historicalItemList = document.getElementsByClassName("historical-item");
    let $homeButtons = document.getElementById("home-buttons");

    if ($movieItemList && $historicalItemList && $homeButtons) {

        addOrRemoveDomElement(
            "home-buttons",
            null
        );

        addOrRemoveDomElement(
            "movies-item",
            null
        );

        addOrRemoveDomElement(
            "historical-item",
            null
        );

        // $mainHook.removeChild($homeButtons);
        // Array.from($navBarList).forEach(($navBar) => {
        //     $navBar.removeChild($movieItemList);
        //     $navBar.removeChild($historicalItemList);
        // });

        //Logout Button
        addOrRemoveDomElement(
            'logout-item',
            [
                'a',
                null,
                null,
                [
                    "href",
                    '#deconnexion'
                ],
                null,
                "search-logout-item",
                null
            ]
        );

        // //Logout Item
        // let $logoutItem = document.createElement('a');
        // $logoutItem.id = 'logout-item';
        // $logoutItem.setAttribute('href', '#deconnexion');
        // $searchLogoutItem.appendChild($logoutItem);
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

