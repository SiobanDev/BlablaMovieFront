async function doContactActions(pageContent) {

    if (await isUserConnected()) {
        replaceContent(pageContent, 'app');

    } else {
        redirectionAction('#error');
    }

}