async function doMoviesActions(pageContent, responseStatus) {
    if (responseStatus === 200) {
        replaceContent(pageContent, 'app');

        try {
            return await displayMovies();
        } catch (e) {
            throw new Error(e);
        }
    } else if (responseStatus === 403) {
        redirectionAction('#error');
        return console.log('You must log out to sign in.')

    } else {
        return new Error(responseStatus);
    }
}