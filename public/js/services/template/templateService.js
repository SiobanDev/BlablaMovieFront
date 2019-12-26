function showLoader(show, divId) {
    const $container = document.getElementById(`${divId}`);

    if ($container) {
        if (show) {
            const $loaderDiv = document.getElementById("loader");

            if($loaderDiv){
                $container.remove();
            }

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
        }
    }
}

async function updateNavIfUserConnectedOrNot() {

    if (localStorage.getItem("token") === null) {
        try {
            //Remove nav items Movies and Historical
            removeDomElementList
            (
                [
                    "header-nav__movies-item",
                    "header-historical-item",
                    "footer-nav__movies-item",
                    "footer-historical-item",
                    'logout-item'
                ]
            );

            return true;

        } catch (e) {
            throw new Error(e);
        }

    } else {
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

function updateHomeIfUserConnectedOrNot() {
    let $mainHook = document.getElementById("main-hook");

    if (localStorage.getItem("token") === null) {
        //If user is not connected
        try {
            if ($mainHook) {
                addButtonsForConnectedUser("home-buttons");
                return true;
            }
            return false;

        } catch (e) {
            throw new Error(e);
        }
        //If user is connected
    } else {
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