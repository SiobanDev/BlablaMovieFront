function movieConstruct(movieData, index) {

    let movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');

    let movieView = document.createElement('div');
    movieView.classList.add('movie-view');
    movieItem.appendChild(movieView);

    let movieOrder = document.createElement('p');
    movieOrder.classList.add('movie-order');
    movieOrder.innerHTML = index;
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

    return movieItem;
}