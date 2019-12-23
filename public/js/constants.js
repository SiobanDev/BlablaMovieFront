// const blablamovieApiUrl = "http://api.blablamovie.local:8000";
const blablamovieApiUrl = "http://127.0.0.1:8000";
const checkConnexionApiUrl = `${blablamovieApiUrl}/users/me`;
const apiMoviesUrl = `${blablamovieApiUrl}/movies`;
const apiConnexionUrl = `${blablamovieApiUrl}/login_check`;
const apiInscriptionUrl = `${blablamovieApiUrl}/user`;
const apiSignOutUrl = `${blablamovieApiUrl}/logout`;
const token = localStorage.getItem("token");