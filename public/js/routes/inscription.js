async function doInscriptionActions(pageContent) {
    replaceContent(pageContent, 'app');

    if (!await isUserConnected()) {
        const $signInForm = document.getElementById('inscription-form');

        $signInForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (validateInscriptionForm()) {
                var user = getFormData(['login', 'password', 'birth_date', 'mail']);

                try {
                    showLoader(true, 'app');

                    const apiUserExists = await signIn(user);

                    if (apiUserExists) {
                        showLoader(false, 'app');

                        displayFeedbackAfterSubmit(1);
                        setTimeout(() => {
                            redirectionAction('#accueil');
                        }, 2000);
                        return true;
                    }
                    showLoader(false, 'app');
                    displayFeedbackAfterSubmit(3);
                    return false;

                } catch (error) {
                    throw new Error(error);
                }
            } else {
                validateInscriptionForm();
                return false;
            }
        });
    } else {
        console.log('You must log out to sign in.')
        redirectionAction('#error');
        return false;
    }
}