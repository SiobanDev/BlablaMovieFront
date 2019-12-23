async function doMoviesActions (pageContent) {

    if (!await isUserConnected()) {
        replaceContent(pageContent, 'app');

        try {
            return await displayMovies();
        } catch (e) {
            throw new Error(e);
        }
    } else {
        return redirectionAction('#error');
    }
}