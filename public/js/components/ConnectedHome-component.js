function addButtonsForConnectedUser(container) {
    //Home buttons
    addDomElement(
        "home-buttons",
        "div",
        "main-hook"
    );

    //Connection button
    addDomElement(
        "connexion-btn",
        "a",
        "home-buttons",
        ["btn"],
        {
            role: "button",
            href: "#connexion"
        },
        "Connection"
    );
    //Inscription button
    addDomElement(
        "inscription-btn",
        "a",
        "home-buttons",
        ["btn"],
        {
            role: "button",
            href: "#inscription"
        },
        "Inscription"
    );
}
