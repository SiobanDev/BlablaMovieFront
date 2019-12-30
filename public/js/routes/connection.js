async function doConnectionActions(pageContent) {
    if (!await isUserConnected()) {
        replaceContent(pageContent, 'app');

        const $signInForm = document.getElementById('connexion-form');

        $signInForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (validateConnectionForm()) {
                showLoader(true, 'app');

                try {
                    const apiConnectionResponse = await connect(getFormData(['username', 'password']));

                    showLoader(false, 'app');

                    if (apiConnectionResponse.status >= 200 && apiConnectionResponse.status < 400) {
                        let jsonResponse = await apiConnectionResponse.json();
                        localStorage.setItem("token", jsonResponse.token);

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
                validateConnectionForm();
                return false;
            }
        });
    } else {
        console.log('You are already connected.')
        redirectionAction('#error');
        return false;
    }
}