function doConnexionActions(pageContent, responseStatus) {
    replaceContent(pageContent, 'app');

    if (responseStatus === 403) {
        const $signInForm = document.getElementById('connexion-form');

        $signInForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (validateConnexionForm()) {
                try {
                    const apiUserConnected = await connect(getFormData(['mail', 'password']));

                    if (apiUserConnected) {
                        displayFeedbackAfterSubmit(2);
                        return setTimeout(redirectionAction('#movies'), 10000);
                    }
                    return displayFeedbackAfterSubmit(4);

                } catch (error) {
                    throw new Error(error);
                }
            } else {
                return validateConnexionForm();
            }
        });
    } else if(responseStatus === 200) {
        redirectionAction('#error');
        return console.log('You must log out to log in.')

    } else {
        return new Error(responseStatus);
    }
}