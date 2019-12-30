function validateInscriptionMail() {
    let $mail = document.getElementById("mail").value;
    let regex = new RegExp(/^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/);

    return (regex.test($mail));
}

function validateInscriptionRegexLogin() {
    const loginValue = document.getElementById("login").value;

    const regex = new RegExp('^[a-zA-Z0-9]+$');

    return ((regex.test(loginValue)) ? true : false);
}

function validateInscriptionSizeLogin() {
    const loginValue = document.getElementById("login").value;

    return ((3 <= loginValue.length && loginValue.length <= 18) ? true : false);

}

function validateInscriptionLogin() {
    return ((validateInscriptionRegexLogin() && validateInscriptionSizeLogin()) ? true : false);
}

function validateInscriptionPassword() {
    let $pwd = document.getElementById("password").value;

    return (($pwd.length >= 12) ? true : false)
};

function validateInscriptionAge() {
    var $birthDate = new Date(document.getElementById("birth_date").value);
    var $currentDate = new Date();

    //Check whether the user is 15 years old at least.
    if ((($currentDate.getFullYear() - $birthDate.getFullYear()) <= 18) ||
        ((($currentDate.getFullYear() - $birthDate.getFullYear()) === 18) &&
            ($currentDate.getMonth() < $birthDate.getMonth()) &&
            ($currentDate.getDate() < $birthDate.getDate()))) {
        return false;
    }
    return true;
}

function validateInscriptionForm() {
    var submitButton = document.getElementById("inscription-button");
    let $loginRegexErrorMessage = document.getElementById("invalid-regex-login-feedback");
    let $loginSizeErrorMessage = document.getElementById("invalid-size-login-feedback");
    let $mailRegexErrorMessage = document.getElementById("invalid-format-email-feedback");
    let $pwdSizeErrorMessage = document.getElementById("invalid-size-pwd-feedback");
    var $dateErrorMessage = document.getElementById("invalid-age-feedback");
    var $emptyErrorMessage = document.getElementById('invalid-empty-feedback');

    if (
        validateInputsFillingState("inscription")) {
        $emptyErrorMessage.style.display = "none";
    } else {
        $emptyErrorMessage.style.display = "block";
    }

    if (validateInscriptionRegexLogin()) {
        $loginRegexErrorMessage.style.display = "none";
    } else {
        $loginRegexErrorMessage.style.display = "block";
    }

    if (validateInscriptionSizeLogin()) {
        $loginSizeErrorMessage.style.display = "none";
    } else {
        $loginSizeErrorMessage.style.display = "block";
    }

    if (validateInscriptionMail()) {
        $mailRegexErrorMessage.style.display = "none";
        submitButton.disabled = false;
    } else {
        $mailRegexErrorMessage.style.display = "block";
    }

    if (validateInscriptionPassword()) {
        $pwdSizeErrorMessage.style.display = "none";
        submitButton.disabled = false;
    } else {
        $pwdSizeErrorMessage.style.display = "block";
    }

    if (validateInscriptionAge()) {
        $dateErrorMessage.style.display = "none";
    } else {
        $dateErrorMessage.style.display = "block";
    }

    return (
        !!(
            validateInputsFillingState("inscription") &&
            validateInscriptionLogin() &&
            validateInscriptionMail() &&
            validateInscriptionPassword() &&
            validateInscriptionAge()
        ));
}