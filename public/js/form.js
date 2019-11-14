(function() {
    'use strict';
    window.addEventListener('load', function() {
        console.log('fonction bootstrap works');
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');

        // Loop over them and prevent submission
        Array.from(forms).forEach((form) => {

            form.addEventListener('submit', function(event) {
                console.log('fonction bootstrap works better');

                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);

        });

    }, false);
})();


function formValidation(display, inscriptionOrConnexion) {
    let $form = document.getElementById('form-content');
    let $signInValidationDiv = document.createElement('div');
    $signInValidationDiv.id = 'signInValidation-popup';
    $form.appendChild($signInValidationDiv);

    if(display) {
        if(inscriptionOrConnexion == "inscription")
        {
            $signInValidationDiv.style.display = 'flex';
            $signInValidationDiv.style.opacity = '1';
            let $validationImage = document.createElement('img');
            $validationImage.classList.add('validation-image');
            $validationImage.src = "/public/images/thumb.png";
            $validationImage.alt = "thumb-success";
            $signInValidationDiv.innerHTML = "Félicitations, vous avez bien été enregistré(e) !";
            $signInValidationDiv.appendChild($validationImage);

        } else if (inscriptionOrConnexion == "connexion")
        {
            $signInValidationDiv.style.display = 'flex';
            $signInValidationDiv.style.opacity = '1';
            let $validationImage = document.createElement('img');
            $validationImage.classList.add('validation-image');
            $validationImage.src = "/public/images/thumb.png";
            $validationImage.alt = "thumb-success";
            $signInValidationDiv.innerHTML = "Tu es bien connecté(e).";
            $signInValidationDiv.appendChild($validationImage);
        }
    }

    $signInValidationDiv.style.display = 'none';
}
