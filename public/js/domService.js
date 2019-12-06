function addDomElement
(
    id,
    type,
    container,
    classesArray,
    attributesObject,
    content
) {
    let $container = document.querySelector(`#${container}`);

    let $element = document.createElement(type);

    if (id) {
        $element.id = id;
    }

    if (classesArray) {
        $element.classList.add(classesArray.join(""));
    }

    if (attributesObject) {
        for (const Attribute in attributesObject) {
            $element.setAttribute(Attribute, attributesObject[Attribute]);
        }
    }

    if (content) {
        $element.innerHTML = content;
    }

    $container.appendChild($element);
    return null;
}

function removeDomElement(elmtId) {
    //Test if the  already exists and if it is the case, we need to remove it.

    if (elmtId) {
        const $element = document.querySelector(elmtId);
        $element.parentElement.removeChild($element);
    }

    return null;
}

function removeDomElementList(idsArray) {
    idsArray.forEach((id) => {
        removeDomElement(null, id);
    });

    return null;
}