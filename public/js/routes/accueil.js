'use strict';

async function doAccueilActions(pageContent) {
    replaceContent(pageContent, 'app');

    showLoader(true, 'app');
    await updateHomeIfUserConnectedOrNot();
    showLoader(false, 'app');

}