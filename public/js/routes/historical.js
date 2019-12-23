function doHistoricalActions(pageContent, responseStatus) {

    if (responseStatus === 200) {
        // await replaceContent(pageContent, 'app');
        replaceContent(pageContent, 'app');

    } else if(responseStatus === 403) {
        redirectionAction('#error');
        return console.log('You must be log in.')

    } else {
        return new Error(responseStatus);
    }
}