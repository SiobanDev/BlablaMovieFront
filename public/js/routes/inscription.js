function doInscriptionActions(pageContent) {

    if (sessionStorage.getItem('user') === "null") {
        replaceContent(pageContent, 'app');

        const $signInForm = document.getElementById('inscription-form');
        var submitButton = document.getElementById('connexion-button');
        var allInputsValidated = undefined;

        submitButton.addEventListener('click', (e) => {
            allInputsValidated = getFillingStateOfInputs('inscription');
        });

        if(allInputsValidated) {
            $signInForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                // feedbackAfterSubmitForm(false, "inscription");

                var user = getFormData(['login', 'password', 'birth_date', 'mail']);
                let $form = document.getElementById('form-content');

                try {
                    await signIn(user);
                    feedbackAfterSubmitForm(1, $form);

                } catch (error) {
                    if (error.message === "403") {
                        feedbackAfterSubmitForm(3, $form);
                    } else {
                        throw new Error(error);
                    }
                }
            });
        }
    } else {
        throw new Error("Problème de sessionsStorage");
    }
}