'use strict';

function doAccueilActions(pageContent) {

    showLoader(true, 'app');
    //myFetch is the first called function, because it's the only one returning a promise.
    //Then comes userConnected, because it's in the same try{}.
    //That means that the template is not yet download ! updateTemplatesForUserStatus uses some elements of the template though.
    //That's why I need to add conditions in updateTemplatesForUserStatus to manage the case where some elements are undefined or null.
    replaceContent(pageContent, 'app');

    const userIsConnected = sessionStorage.getItem('user') !== "null";

    updateTemplatesForUserStatus(userIsConnected);

};
