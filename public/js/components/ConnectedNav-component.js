function addNavItemsForConnectedUser(container) {
    //Movie Nav Item
    addDomElement(
        `${container}__movies-item`,
        'li',
        container,
        [
            "nav-item",
            "col-s-1"
        ],
        null,
        null,
    );

    //Movie Nav Item Link
    addDomElement(
        null,
        'a',
        `${container}__movies-item`,
        null,
        {
            href: "#movies"
        },
        "Films",
    );

    //Historical Nav Item
    addDomElement(
        `${container}__historical-item`,
        'li',
        container,
        [
            "nav-item",
            "col-s-1"
        ],
        null,
        null,
    );

    //Historical Nav Item Link
    addDomElement(
        null,
        'a',
        `${container}__historical-item`,
        null,
        {
            href: "#historical"
        },
        "Historical",
    );
}
