function homeButtonsConstruct() {
    // Home buttons
    addOrRemoveDomElement(
        "home-buttons",
        null,
        [
            "div",
            [],
            null,
            [],
            [],
            'main-hook',
            null
        ]
    );

    //Connexion Button
    addOrRemoveDomElement(
        'connexion-btn',
        null,
        [
            'a',
            [
                "btn"
            ],
            null,
            [
                "href",
                '#connexion'
            ],
            [
                "role",
                '#button'
            ],
            "home-buttons",
            null
        ]
    );

    //Inscription Button
    addOrRemoveDomElement(
        'inscription-btn',
        null,
        [
            'a',
            [
                "btn"
            ],
            null,
            [
                "href",
                '#inscription'
            ],
            [
                "role",
                '#button'
            ],
            "home-buttons",
            null
        ]
    );
        return null;
}
