async function doInfosActions(pageContent) {

    if (await isUserConnected()) {
        replaceContent(pageContent, 'app');

    } else {
        redirectionAction('#error');
    }

}