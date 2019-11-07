function getDataFromForm(fieldsList) {

    var data = {};
    
    fieldsList.forEach((field) => {
        //If I write data.field, it would seek for a key called field. However I don't have yet this key.
        //So data[field] get the VALUE of the key field.
        data[field] = document.getElementById(`${field}`).value;

    }) 
    
    return data;
}
