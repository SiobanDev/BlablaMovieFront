function myFetch(url, method, headersList, body) {
    //dans une arrow fonction, le scope du this remonte au parent (et continue de remonter si le parent est aussi un arrow fonction
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();

        //dans les functions "normales", le scope du this est celui de la fonction-même
        req.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE)  {
                if (this.status === 200 || this.status === 201) {
                    console.log("Réponse reçu: %s", this.responseText);
                    resolve(this.responseText);
                } else {
                    console.log("Status de la réponse: %d (%s)", this.status, this.statusText, this.responseText);
                    reject(this.status, this.statusText);
                }
            }
        }

        req.open(method, url);

        //To send EXPLICITLY the value of the content-type.
        //On JS object of type Object, you can not use foreach, so object.keys allows to make an array of the object's keys
        Object.keys(headersList).forEach(header => {
            console.log(headersList[header]);
            req.setRequestHeader(header, headersList[header]);
        })

        req.send(body);

    })
}