// // Les requêtes sont émises de façon asynchrone.
//
// function myFetch(url, method, headersName, headersValue, body) {
//     //dans une arrow fonction, le scope du this remonte au parent (et continue de remonter si le parent est aussi un arrow fonction
//     return new Promise((resolve, reject) => {
//         const req = new XMLHttpRequest();
//
//         //dans les functions "normales", le scope du this est celui de la fonction-même
//         req.onreadystatechange = function () {
//             if ((this.readyState === XMLHttpRequest.DONE) && (this.status === 200)) {
//                 console.log("Réponse reçu: %s", this.responseText);
//                 resolve(this.responseText);
//             } else {
//                 console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
//                 reject(this.status, this.statusText);
//             }
//         }
//
//         req.open(method, url, true);
//         req.send(body);
//         req.setRequestHeader(headersName, headersValue);
//     })
// }
//
//
// let a = {
//     lol: 'yo'
// }
// a.movies[0].title;
//
//
// //Accueil page --------------------------------------------
// accueil.open('GET', 'https://blablamovieapi/', true);
// accueil.send(null);
// accueil.getResponseHeader('Content-Type');
//
// //Inscription
// addUser.open('POST', 'https://blablamovieapi/user', true);
// addUser.send($loginForm);
//
// //A propos page TO DO --------------------------------------------
//
// //Films Page --------------------------------------------
// displayMovies.open('GET', 'https://blablamovieapi/movies', true);
// displayMovies.send(null);
//
// //Add vote (available on the Historique page too)
// addVote.open('POST', 'https://blablamovieapi/vote', true);
// addVote.send($imdbID);
//
// //Delete vote (available on the Historique page too)
// deleteVote.open('DELETE', 'https://blablamovieapi/vote', true);
// deleteVote.setRequestHeader('vote_id', $voteId);
//
// //Historique page --------------------------------------------
// displayVotes.open('GET', 'https://blablamovieapi/votes', true);
// displayVotes.send(null);
//
// //Contact page TO DO --------------------------------------------
//
//
// const init = async () => {
//     const inscriptionResponse = await myFetch('https://blablamovieapi/user', 'POST', null, null,  $loginForm);
//
//     const inscriptionJsonResponse = JSON.parse(inscriptionResponse);
//
//     $boutton = document.querySelector('#boutton')
//
//     $boutton.addEventListener('click', async () => {
//         const inscriptionResponse = await myFetch('https://blablamovieapi/user', 'POST', null, null,  $loginForm);
//         const inscriptionJsonResponse = JSON.parse(inscriptionResponse);
//
//         inscriptionJsonResponse.forEach((user, id) => {
//             user.username
//         })
//
//     })
//
// }
//
// init()
//
//
