async function getUser () {
    try {
        let userObject = await myFetch('http://api.blablamovie.local:8000/users/me');

        let user = JSON.parse(userObject.body);
        return user;

    } catch (e) {

        if(e.status === 403) {
            return null;
        }

        throw new Error(`getUser failed ${e.body}`);
    }
}
