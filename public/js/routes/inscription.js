function doInscriptionActions(pageContent) {

    if (sessionStorage.getItem('user') === "null") {
        replaceContent(pageContent, 'app');

        const $signInForm = document.getElementById('inscription-form');

        $signInForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // formValidation(false, "inscription");

            var user = getFormData(['login', 'password', 'birth_date', 'mail']);

            try {
                await signIn(user);
                formValidation(true, "inscription");

            } catch (error) {
                console.log(error.status);

                if (error.status === 403) {
                    const $signUpForm = document.getElementById('inscription-form');

                    console.log('nooo invalidate message')
                } else {
                    throw new Error(error.body);

                }
            }
        });

    } else {
        console.log('edfsdfsdf')
    }
}