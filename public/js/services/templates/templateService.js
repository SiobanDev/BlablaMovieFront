function showLoader(show, divId) {
    const $container = document.getElementById(`${divId}`);

    if ($container) {
        if (show) {
            const $loaderContainer = document.createElement('div');
            $loaderContainer.id = 'loader';
            $loaderContainer.classList.add('spinner-grow', 'text-light');
            $loaderContainer.role = "status";

            const $loaderText = document.createElement('span');
            $loaderText.classList.add('sr-only');
            $loaderText.innerHTML = 'loading...';

            $loaderContainer.appendChild($loaderText);
            $container.appendChild($loaderContainer);

        } else {
            const $div = document.querySelector('#loader');
            if ($div) {
                $container.removeChild($div)
            }
            showTemplate(true)
        }
    }
}

function updateNavIfUserConnectedOrNot(responseStatus) {
    //If user is not connected
    if (responseStatus === 403) {
        try {
            removeDomElementList
            (
                [
                    "header-nav__movies-item",
                    "header-nav__historical-item",
                    "footer-nav__movies-item",
                    "footer-nav__historical-item",
                    'logout-item'
                ]
            );

            return false;

        } catch (e) {
            throw new Error(e);
        }
        //If user is connected
    } else if (responseStatus === 200) {
        try {
            addNavItemsForConnectedUser("header-nav");
            addNavItemsForConnectedUser("footer-nav");

            //LogoutItem
            addDomElement(
                'logout-item',
                'a',
                "search-logout-item",
                null,
                {
                    href: '#deconnexion'
                },
                "Déconnexion",
            );
            return true;

        } catch (e) {
            throw new Error(e);
        }
    }
}

function updateHomeIfUserConnectedOrNot(responseStatus) {
    let $mainHook = document.getElementById("main-hook");

    //If user is not connected
    if (responseStatus === 403) {
        try {
            if ($mainHook) {
                addButtonsForConnectedUser($mainHook);
                return true;
            }
            return false;

        } catch (e) {
            throw new Error(e);
        }
        //If user is connected
    } else if (responseStatus === 200) {
        try {
            if ($mainHook) {
                removeDomElement("home-buttons");
                return true;
            }
            return false;

        } catch (e) {
            throw new Error(e);
        }
    }
}