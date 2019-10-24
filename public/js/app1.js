// window.addEventListener('load', () => {
//     const app = window.querySelector('#app');
// }

const app = {
    init() {
        this.myHttpRequest();
    },

    async myHttpRequest() {

        const inscriptionResponse = await this.myFetch('https://blablamovieapi/user', 'POST', null, null, $loginForm);

        const inscriptionJsonResponse = JSON.stringify(inscriptionResponse,  null, '\t');

        let $button = document.querySelector('#button')

        $button.addEventListener('submit', async () => {

            inscriptionJsonResponse.forEach((user, id) => {
                user.username
            })
        })
    },

    myFetch(url, method, headersName, headersValue, body) {
        //dans une arrow fonction, le scope du this remonte au parent (et continue de remonter si le parent est aussi un arrow fonction
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            req.open(method, url, true);
            req.send(body);
            req.setRequestHeader(headersName, headersValue);

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