async function doDeconnexionActions (pageContent) {

    if (sessionStorage.getItem('user') !== "null") {

        try {
            showLoader(true, 'app');
            await signOut();
            updateTemplatesForUserStatus(false);
            replaceContent(pageContent, 'app');

        } catch (e) {
            let eMessage = e.toString();
            throw new Error(`signOut failed ${eMessage}`);
        }

    } else {
        redirectionAction('#error');
    }
}