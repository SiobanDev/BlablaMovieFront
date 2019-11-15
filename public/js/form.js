function getFillingStateOfInputs(name) {
    var $form = document.getElementById(`${name}-form`);
    var inputsList = $form.getElementsByTagName("input");
    var $emptyErrorMessage = document.getElementById('invalid-empty-feedback');
    var submitButton = document.getElementById(`${name}-button`);

    //With a map, the loop does not end with the return !
    let fullInputsValidateList = Array.from(inputsList).map((input) => {

        if (input.value) {
            $emptyErrorMessage.style.display = "none";
            submitButton.disabled = false;
            return true;
        }

        $emptyErrorMessage.style.display = "block";
        submitButton.disabled = true;
        return false;
    });

    return fullInputsValidateList;
};

function validateLogin() {
    let loginValue = document.getElementById("login").value;
    let $loginRegexErrorMessage = document.getElementById("invalid-regex-login-feedback");
    let $loginSizeErrorMessage = document.getElementById("invalid-size-login-feedback");

    let regex = new RegExp('^[a-zA-Z0-9]+$');

    if (regex.test(loginValue)) {
        $loginRegexErrorMessage.style.display = "none";
    } else {
        $loginRegexErrorMessage.style.display = "block";
        return false;
    }

    if (3 <= loginValue.length && loginValue.length <= 18) {
        $loginSizeErrorMessage.style.display = "none";
    } else {
        $loginSizeErrorMessage.style.display = "block";
        return false;
    }

    if (regex.test(loginValue) && 3 <= loginValue.length && loginValue.length <= 18) {
        return true;
    }
}

function validateMail() {
    let $mail = document.getElementById("mail").value;
    let $mailRegexErrorMessage = document.getElementById("invalid-email-login-feedback");

    let regex = new RegExp(/^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/);

    $mailRegexErrorMessage.style.display = "block";

    if (regex.test($mail)) {
        $mailRegexErrorMessage.style.display = "none";
        return true;

    }

    return false;
}

function validatePassword() {
    let $pwd = document.getElementById("password").value;
    let $pwdSizeErrorMessage = document.getElementById("invalid-size-pwd-feedback");

    $pwdSizeErrorMessage.style.display = "block";

    if ($pwd.length >= 12) {
        $pwdSizeErrorMessage.style.display = "none";
        return true;
    }

    return false;
}

function validateAge() {
    var $dateErrorMessage = document.getElementById("invalid-age-feedback");
    var $birthDate = new Date(document.getElementById("birth_date").value);
    var $currentDate = new Date();

    //Check whether the user is 15 years old at least.
    if ((($currentDate.getFullYear() - $birthDate.getFullYear()) <= 18) ||
        ((($currentDate.getFullYear() - $birthDate.getFullYear()) === 18) &&
            ($currentDate.getMonth() < $birthDate.getMonth()) &&
            ($currentDate.getDate() < $birthDate.getDate()))) {
        $dateErrorMessage.style.display = "block";
        return false;
    }

    $dateErrorMessage.style.display = "none";
    return true;
}

function feedbackAfterSubmitForm(feedbackType, $container) {

    let $feedbackDiv = document.createElement('div');
    $feedbackDiv.id = 'feedback-popup';
    $feedbackDiv.style.display = 'flex';
    $feedbackDiv.style.opacity = '1';

    let $feedbackImage = document.createElement('img');

    let $feedbackText = document.createElement('p');
    $feedbackText.classList.add('feedback-text');

    let $cross = document.createElement('button');
    $cross.classList.add('fas', 'fa-times');
    $cross.addEventListener('click', () => {
        closePopUp($feedbackDiv, $popUpDiv);
    });
    $feedbackDiv.appendChild($cross);

    switch (feedbackType) {
        //Inscription
        case 1:
            $feedbackImage.src = "/public/images/thumb.png";
            $feedbackImage.alt = "thumb-success";
            $feedbackImage.classList.add('feedback-image');

            $feedbackText.innerHTML = "Félicitations, vous avez bien été enregistré(e) !";
            $feedbackDiv.appendChild($feedbackText);

            $container.appendChild($feedbackDiv);
            break;

        //Connexion
        case 2:
            $feedbackImage.src = "/public/images/thumb.png";
            $feedbackImage.alt = "thumb-success";
            $feedbackImage.classList.add('feedback-image');

            $feedbackText.innerHTML = "Tu es bien connecté(e).";
            $feedbackDiv.appendChild($feedbackText);
            $container.appendChild($feedbackDiv);
            break;

        //Error inscription
        case 3:
            $feedbackImage.src = "/public/images/error.png";
            $feedbackImage.alt = "error-image";
            $feedbackImage.classList.add('feedback-image');

            $feedbackText.innerHTML = "Il y a déjà un compte enregistré avec ce mail.";
            $feedbackText.style.color = "#dc3545";
            $feedbackDiv.appendChild($feedbackText);
            $container.appendChild($feedbackDiv);
            break;

        //Error Connexion
        case 4:
            $feedbackImage.src = "/public/images/error.png";
            $feedbackImage.alt = "error-image";
            $feedbackImage.classList.add('feedback-image');

            $feedbackText.innerHTML = "Votre email ou votre mot de passe est erroné.";
            $feedbackText.style.color = "#dc3545";
            $feedbackDiv.appendChild($feedbackText);
            $container.appendChild($feedbackDiv);
            break;
            break;

        default:
            $container.removeChild($feedbackDiv);

            break;
    }
}




