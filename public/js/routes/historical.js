function doHistoricalActions(pageContent) {

    if (sessionStorage.getItem('user') !== "null") {
        replaceContent(pageContent, 'app');

    } else {
        redirectionAction('#error');
    }

}