async function doHistoricalActions(pageContent) {

    if (await isUserConnected()) {
        replaceContent(pageContent, 'app');

    } else {
        redirectionAction('#error');
    }

}