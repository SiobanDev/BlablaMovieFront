'use strict';

async function doAccueilActions(pageContent) {
    replaceContent(pageContent, 'app');
    await updateHomeIfUserConnectedOrNot();
}