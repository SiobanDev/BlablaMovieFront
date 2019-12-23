async function doConnexionActions(pageContent) {
    if (!await isUserConnected()) {
        showLoader(false, 'app');
        replaceContent(pageContent, 'app');

        const $signInForm = document.getElementById('connexion-form');

        $signInForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (validateConnexionForm()) {
                showLoader(true, 'app');

                try {
                    const apiUserConnected = await connect(getFormData(['mail', 'password']));
                    showLoader(false, 'app');

                    if (apiUserConnected) {
                        displayFeedbackAfterSubmit(2);
                        setTimeout(() => {
                            redirectionAction('#movies');
                        }, 2000);
                        return true;
                    }
                    displayFeedbackAfterSubmit(4);
                    return false;

                } catch (error) {
                    throw new Error(error);
                }
            } else {
                validateConnexionForm();
                return false;
            }
        });
    } else {
        console.log('You are already connected.')
        redirectionAction('#error');
        return false;
    }
}