function navItemsConstruct() {
        addDomElement(
            null,
            'li',
                [],
                {},
                null,
                "nav"
        );

    //Movie Nav Item
    addDomElement(
        null,
        null,
        [
            'li',
            [
                "movies-item",
                "nav-item",
                "col-s-1"
            ],
            null,
            [],
            [],
            null,
            "nav"
        ]
    );

    //Movie Nav Item Link
    addDomElement(
        null,
        null,
        [
            'a',
            [],
            null,
            [
                "href",
                "#movies"
            ],
            [],
            "#movies",
            null,
            "movies-item"
        ]
    );

    //Historical Nav Item
    addDomElement(
        null,
        null,
        [
            'li',
            [
                "historical-item",
                "nav-item",
                "col-s-1"
            ],
            null,
            [],
            [],
            null,
            "nav"
        ]
    );

    //Historical Nav Item Link
    addDomElement(
        null,
        null,
        [
            'a',
            [],
            null,
            [
                "href",
                "#historical"
            ],
            [],
            "#historical",
            null,
            "historical-item"
        ]
    );

    return null;
}
