async function doDeconnexionActions (pageContent) {

    if (sessionStorage.getItem('user') !== "null") {

        try {
            await signOut();
            replaceContent(pageContent, 'app');

        } catch (e) {
            let eMessage = e.toString();
            throw new Error(`signOut failed ${eMessage}`);
        }

    } else {
        redirectionAction('#error');
    }
}