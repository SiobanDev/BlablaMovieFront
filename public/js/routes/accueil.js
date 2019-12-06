'use strict';

function doAccueilActions(pageContent) {
    replaceContent(pageContent, 'app');
    updateHomeIfUserConnectedOrNot();
}
