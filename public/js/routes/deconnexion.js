async function doDeconnexionActions() {

    try {
        await signOut();
        setTimeout(redirectionAction('#accueil'), 1000);

    } catch (e) {
        throw new Error(`signOut failed ${e}`);
    }
}

// async function doDeconnexionActions(pageContent) {
//
//     if (sessionStorage.getItem('user') !== "null") {
//
//         try {
//             await signOut();
//             sessionStorage.setItem('user', null);
//             redirectionAction('#accueil');
//
//         } catch (e) {
//             let eMessage = e.toString();
//             throw new Error(`signOut failed ${eMessage}`);
//         }
//
//     } else {
//         redirectionAction('#error');
//     }
// }