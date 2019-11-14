function doConnexionActions (pageContent) {

    if (sessionStorage.getItem('user') === "null") {
        replaceContent(pageContent, 'app');

        const $signInForm = document.getElementById('connexion-form');

        $signInForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // formValidation(false, "connexion");

            try {
                await connect(getFormData(['mail', 'password']));
                formValidation(true, "connexion");

            } catch (error) {
                console.log(error.status);

                if (error.status === 403) {
                    const $signUpForm = document.getElementById('connexion-form');

                    console.log('nooo invalidate message')
                } else {
                    throw new Error(error.body);

                }
            }
        });

    } else {
        console.log('No connected user')
    }
}