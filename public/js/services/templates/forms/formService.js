function validateMail() {
    let $mail = document.getElementById("mail").value;
    let regex = new RegExp(/^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/);

    return (regex.test($mail));
}

function validateInputsFillingState() {
    const $form = document.getElementById("connexion-form");
    const inputsList = $form.getElementsByTagName("input");

    //With a map, the loop does not end with the return !
    let inputsFillingStateList = Array.from(inputsList).map((input) => {

        return (input.value.length > 0);
    });

    //Return false if one input is empty
    return ((inputsFillingStateList.filter(filledInput => filledInput === false).length <= 0));
};

function displayFeedbackAfterSubmit(feedbackType) {
    let $container = document.getElementById("app");

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
        closePopUp($feedbackDiv);
    });
    $feedbackDiv.appendChild($cross);

    switch (feedbackType) {
        //Inscription
        case 1:
            $feedbackDiv.style.background = "#f7b436";

            $feedbackImage.src = "/public/images/thumb.png";
            $feedbackImage.alt = "thumb-success";
            $feedbackImage.classList.add('feedback-image');

            $feedbackText.innerHTML = "Félicitations, vous avez bien été enregistré(e) !";

            $feedbackDiv.appendChild($feedbackText);
            $container.appendChild($feedbackDiv);
            break;

        //Connexion
        case 2:
            $feedbackDiv.style.background = "#f7b436";

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
            $feedbackDiv.appendChild($feedbackText);
            $container.appendChild($feedbackDiv);
            break;

        //Error Connexion
        case 4:
            $feedbackImage.src = "/public/images/error.png";
            $feedbackImage.alt = "error-image";
            $feedbackImage.classList.add('feedback-image');

            $feedbackText.innerHTML = "Votre email ou votre mot de passe est erroné.";
            $feedbackDiv.appendChild($feedbackText);
            $container.appendChild($feedbackDiv);
            break;

        default:
            $container.removeChild($feedbackDiv);

            break;
    }
}