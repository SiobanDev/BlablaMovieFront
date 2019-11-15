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
    return document.location.href=`.${path}`;
}

function closePopUp(div, container) {
    if (div) {
        container.remove(div);
        return true;
    }
    return false;
}
