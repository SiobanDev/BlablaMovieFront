function addDomElement
(
    elementId,
    elementType,
    elementClassesArray,
    elementAttributesObject,
    elementContainerId,
    elementContainerClass
)
{
    let $elementContainerList;

    if (elementContainerId) {
        $elementContainerList = [document.getElementById(elementContainerId)];
    } else if (elementContainerClass) {
        $elementContainerList = Array.from(document.getElementsByClassName(elementContainerClass));
    }

    let $element = document.createElement(elementType);

    if (elementId) {
        $element.id = elementId;

        $elementContainerList.forEach(($elementContainer) => {
            $elementContainer.appendChild($element);
        })
    }

    if(elementClassesArray) {
        $element.classList.add(elementClassesArray.join(", "));
    }

    if(elementAttributesObject) {
        elementAttributesObject.map((elementAttribute) => {
            $element.setAttribute(elementAttribute, elementAttribute.value);
        });
    }
}

//This function is so long because of the different treatment depending on whether the element and the container have got an id or a class
function removeDomElement(elementId, elementClass) {
    //Test if the element already exists and if it is the case, we need to remove it.
    let $elementsList;

    if (elementId) {
        $elementsList = [document.getElementById(elementId)];
    } else if (elementClass) {
        $elementsList = Array.from(document.getElementsByClassName(elementClass));
    }

    //To remove element with class if the container has an ID
    //In this hook, $element is an Html Collection !
    $elementsList.forEach(($element) => {
        $element.parentElement.removeChild($element);
    })

}