// window.addEventListener('load', () => {
//     const app = window.querySelector('#app');
// }

let profile = {
    login: undefined,
    pwd: undefined,
    mail: undefined,
    birth_date: undefined,
    votes: undefined
};

let movie = {
    title: undefined,
    year: undefined,
    imdbID: undefined,
    poster: undefined,
    voters: undefined
};

const app = {
    init() {
        console.log('ok')
        this.myHttpRequest();
    },

    async myHttpRequest() {
        //INSCRIPTION
        const $signUpForm = document.querySelector('#inscriptionForm');

        $signUpForm.addEventListener('submit', async () => {

            profile = await this.myFetch('https://localhost:8000/user', 'POST', null, null, $signUpForm);

        })

        //CONNEXION
        const $loginForm = "TO DO";
        const connexionResponse = await this.myFetch('https://localhost:8000/login', 'POST', null, null, $loginForm);

        const connexionJsonResponse = JSON.stringify(connexionResponse,  null, '\t');

        // let $button = document.querySelector('#button')
        //
        // $button.addEventListener('submit', async () => {
        //
        //     connexionJsonResponse.forEach((id) => {
        //         profile.login = id.login;
        //         profile.pwd = id.password;
        //         profile.mail = id.mail;
        //         profile.birth_date = id.birth_date;
        //     })
        // })
    },

    myFetch(url, method, headersName, headersValue, body) {
        //dans une arrow fonction, le scope du this remonte au parent (et continue de remonter si le parent est aussi un arrow fonction
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            req.open(method, url, true);
            req.send(body);

            //dans les functions "normales", le scope du this est celui de la fonction-même
            req.onreadystatechange = function () {
                if ((this.readyState === XMLHttpRequest.DONE) && (this.status === 200)) {
                    console.log("Réponse reçu: %s", this.responseText);
                    resolve(this.responseText);
                } else {
                    console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
                    reject(this.status, this.statusText);
                }
            }

        })
    }
}

app.init();