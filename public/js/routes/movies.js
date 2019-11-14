async function doMoviesActions (pageContent) {

    if (sessionStorage.getItem('user') !== "null") {
        replaceContent(pageContent, 'app');

        try {
            await displayMovies();
        } catch (e) {
            let eMessage = e.toString();
            throw new Error(`displayMovies failed ${eMessage}`);
        }
    } else {
        redirectionAction('#error');
    }
}