async function doHistoricalActions(pageContent) {

    if (!await isUserConnected()) {
        // await replaceContent(pageContent, 'app');
        replaceContent(pageContent, 'app');

    } else {
        redirectionAction('#error');
    }

}