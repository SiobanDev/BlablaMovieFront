/**
 * getFormData transforms the array of the input ids in an object with the value of each input.
 * @param fieldsList, is an array of the informations sent by the form's request (POST) (format : ['input1Id', 'input2Id', ...])
 *
 * @return something like : data = {input1Id: value1, input2Id: value2, ...}
 */
function getFormData(fieldsList) {

    var data = {};

    fieldsList.forEach((field) => {
        //If I write data.field, it would seek for a key called field. However I don't have yet this key.
        //So data[field] get the VALUE of the key field.
        data[field] = document.getElementById(`${field}`).value;

    })

    return data;
}

function replaceContent(pageContent, elementId) {
    try {
        document.getElementById(elementId).innerHTML = pageContent;
    } catch (e) {
        throw new Error(`addToDom ${e}`);
    }
}

function redirectionAction(path) {
    return document.location.href = path;
}

function closePopUp(divToRemove) {
    if (divToRemove) {
        divToRemove.remove();
        return true;
    }
    return false;
}

// function getCookie(name) {
//     var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
//     var result = regexp.exec(document.cookie);
//     return (result === null) ? null : result[1];
// }

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}