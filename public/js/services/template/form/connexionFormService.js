function validateConnectionMail() {
    let $mail = document.getElementById("username").value;
    let regex = new RegExp(/^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/);

    return (regex.test($mail));
}

function validateConnectionForm() {
    const $mailRegexErrorMessage = document.getElementById("invalid-email-login-feedback");
    const $emptyErrorMessage = document.getElementById('invalid-empty-feedback');

    if (validateInputsFillingState("connexion")) {
        $emptyErrorMessage.style.display = "none";
    } else {
        $emptyErrorMessage.style.display = "block";
    }

    if (validateConnectionMail()) {
        $mailRegexErrorMessage.style.display = "none";
    } else {
        $mailRegexErrorMessage.style.display = "block";
    }

    return (
        !!(
            validateInputsFillingState("connexion") &&
            validateConnectionMail()
        ));
}