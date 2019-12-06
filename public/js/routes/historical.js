function doHistoricalActions(pageContent) {

    if (isUserConnected()) {
        // await replaceContent(pageContent, 'app');
        replaceContent(pageContent, 'app');

    } else {
        redirectionAction('#error');
    }

}