function getDataFromForm($form, fieldsList) {

    var data = {}
    
    fieldsList.forEach((field) => {
        //If I write data.field, it would seek for a key called field. However I don't have yet this key.
        //So data[field] get the VALUE of the key field.
        console.log($form.querySelector(`#${field}`))
        data[field] = $form.querySelector(`#${field}`).value;


    }) 
    
    return data;
}
