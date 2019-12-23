function doInscriptionActions(pageContent, responseStatus) {

    replaceContent(pageContent, 'app');

    if (responseStatus === 403) {

        const $signInForm = document.getElementById('inscription-form');

        $signInForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (validateInscriptionForm()) {
                var user = getFormData(['login', 'password', 'birth_date', 'mail']);

                try {
                    const apiUserExists = await signIn(user);

                    if (apiUserExists) {
                        displayFeedbackAfterSubmit(1);

                        return setTimeout(redirectionAction('#accueil'), 4000);
                    }
                    return displayFeedbackAfterSubmit(3);

                } catch (error) {
                    throw new Error(error);
                }
            } else {
                return validateInscriptionForm();
            }
        });

    } else if(responseStatus === 200) {
        redirectionAction('#error');
        return console.log('You must log out to sign in.')

    } else {
        return new Error(responseStatus);
    }
}