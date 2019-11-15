function doConnexionActions(pageContent) {

    if (sessionStorage.getItem('user') === "null") {
        replaceContent(pageContent, 'app');

        const $signInForm = document.getElementById('connexion-form');
        var submitButton = document.getElementById('connexion-button');
        var oneInputIsEmpty = false;

        submitButton.addEventListener('click', () => {
            var allFillingStatesOfInputs = getFillingStateOfInputs('connexion');

            for (var i = 0; i < allFillingStatesOfInputs.length; i++) {
                if (allFillingStatesOfInputs[i] === false) {
                    oneInputIsEmpty = true;
                    return oneInputIsEmpty;
                }
            }
        });

        if (oneInputIsEmpty === false) {
            $signInForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                let $form = document.getElementById('form-content');

                try {
                    await connect(getFormData(['mail', 'password']));
                    feedbackAfterSubmitForm(2, $form);

                } catch (error) {
                    if (error.message === "403") {
                        feedbackAfterSubmitForm(4, $form);
                    } else {
                        throw new Error(error);
                    }
                }
            });
        }

    } else {
        console.log('No connected user')
    }
}