'use strict';

function doAccueilActions(pageContent, responseStatus) {

    replaceContent(pageContent, 'app');

    updateHomeIfUserConnectedOrNot(responseStatus);
}
