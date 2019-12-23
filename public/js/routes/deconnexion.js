async function doDeconnexionActions(pageContent, responseStatus) {
    if (responseStatus === 200) {
        try {
            const response = await signOut();

            //Log out success
            if(response.status === 200) {
                // setTimeout(redirectionAction('#accueil'), 1000);
                updateNavIfUserConnectedOrNot(403);
                updateHomeIfUserConnectedOrNot(403);
                return true;
            }

            return false;

        } catch (e) {
            throw new Error(`signOut failed ${e}`);
        }
    } else if(responseStatus === 403) {

        redirectionAction('#error');
        return console.log('You are already disconnect.')

    } else {
        return new Error(responseStatus);
    }
}