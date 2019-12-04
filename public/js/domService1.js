//This function is so long because of the different treatment depending on whether the element and the container have got an id or a class AND the choice to add or remove DOM element.
function addOrRemoveDomElement
(
    elementId,
    elementClass,
    [
        elementType,
        [
            elementClass1ToAdd,
            elementClass2ToAdd,
            elementClass3ToAdd
        ],
        elementClassToRemove,
        [
            elementAttribute1,
            elementAttributeValue1
        ],
        [
            elementAttribute2,
            elementAttributeValue2
        ],
        elementContainerId,
        elementContainerClass
    ]
) {
    //Test if the element already exists and if it is the case, we need to remove it.
    let $element;
    let $elementContainer;

    if (elementId) {
        $element = document.getElementById(elementId);
    } else if (elementClass) {
        $element = document.getElementsByClassName(elementClass);
    }

    if (elementContainerId) {
        $elementContainer = document.getElementById(elementContainerId);
    } else if (elementContainerClass) {
        $elementContainer = document.getElementsByClassName(elementContainerClass);
    }

    if ($element) {
        //To remove element with ID (the container might have an ID)
        if (elementId && elementContainerId) {

            $elementContainer.removeChild($element);
        }

        //To remove element with class if the container has an ID
        else if (elementClass && elementContainerId) {

            //To remove element with class if the container has an ID
            //In this hook, $element is an Html Collection !
            Array.from($element).forEach(($item) => {
                $elementContainer.removeChild($item);
            })
        }

        //To remove element with class if the container has a class
        else if (elementClass && elementContainerClass) {

            //In this hook, $elementContainer is an Html Collection !
            Array.from($elementContainer).forEach(($elementContainer) => {
                //In this hook, $element is an Html Collection !
                Array.from($element).forEach(($item) => {
                    $elementContainer.removeChild($item);
                })
            });
        }
    }
    //To add element
    else {
        let $element = document.createElement(elementType);
        $element.id = elementId;
        $element.classList.add(elementClass1ToAdd);
        $element.classList.add(elementClass2ToAdd);
        $element.classList.add(elementClass3ToAdd);
        $element.classList.remove(elementClassToRemove);
        $element.setAttribute(elementAttribute1, elementAttributeValue1);
        $element.setAttribute(elementAttribute2, elementAttributeValue2);

        //To add element with ID (the container must have an ID)
        if (elementId) {
            $elementContainer.appendChild($element);
        }
        //To add element with class if the container has a class
        else if (elementClass && elementContainerClass) {

            //$elementContainer is an HtmlCollection !
            Array.from($elementContainer).forEach(($elementContainer) => {
                //In this hook, $element is an Html Collection !
                Array.from($element).forEach(($item) => {
                    $elementContainer.appendChild($item);
                })
            });
        }
    }
}

//This function is so long because of the different treatment depending on whether the element and the container have got an id or a class
function removeDomElement (elementId, elementClass, elementContainerClass) {
    //Test if the element already exists and if it is the case, we need to remove it.
    let $elementsList;
    let $elementContainer;

    if (elementId) {
        $elementsList = [document.getElementById(elementId)];
    } else if (elementClass) {
        $elementsList = document.getElementsByClassName(elementClass);

    }

    if (elementContainerId) {
        $elementContainer = document.getElementById(elementContainerId);
    } else if (elementContainerClass) {
        $elementContainer = document.getElementsByClassName(elementContainerClass);
    }

    if ($elementsList) {
        //To remove element with ID (the container might have an ID)
        if (elementId && elementContainerId) {

            $elementContainer.removeChild($elementsList);
        }

        //To remove element with class if the container has an ID
        else if (elementClass && elementContainerId) {

            //To remove element with class if the container has an ID
            //In this hook, $element is an Html Collection !
            Array.from($elementsList).forEach(($item) => {
                $elementContainer.removeChild($item);
            })
        }

        //To remove element with class if the container has a class
        else if (elementClass && elementContainerClass) {

            //In this hook, $elementContainer is an Html Collection !
            Array.from($elementContainer).forEach(($elementContainer) => {
                //In this hook, $element is an Html Collection !
                Array.from($elementsList).forEach(($item) => {
                    $elementContainer.removeChild($item);
                })
            });
        }
    }
    //To add element
    else {
        let $element = document.createElement(elementType);
        $element.id = elementId;
        $element.classList.add(elementClass1ToAdd);
        $element.classList.add(elementClass2ToAdd);
        $element.classList.add(elementClass3ToAdd);
        $element.classList.remove(elementClassToRemove);
        $element.setAttribute(elementAttribute1, elementAttributeValue1);
        $element.setAttribute(elementAttribute2, elementAttributeValue2);

        //To add element with ID (the container must have an ID)
        if (elementId) {
            $elementContainer.appendChild($element);
        }
        //To add element with class if the container has a class
        else if (elementClass && elementContainerClass) {

            //$elementContainer is an HtmlCollection !
            Array.from($elementContainer).forEach(($elementContainer) => {
                //In this hook, $element is an Html Collection !
                Array.from($element).forEach(($item) => {
                    $elementContainer.appendChild($item);
                })
            });
        }
    }
}