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
        $element.classList.add(classesArray.join("\s"));
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
}

function removeDomElement(elmtId) {
    //Test if the  already exists and if it is the case, we need to remove it.

    if (elmtId) {
        const $element = document.getElementById(elmtId);
        $element.parentElement.removeChild($element);
    }

    return null;
}

function removeDomElementList(idsArray) {
    idsArray.forEach((id) => {
        removeDomElement(id);
    });

    return null;
}