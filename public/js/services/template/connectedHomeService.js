function addButtonsForConnectedUser(container) {
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
    return null;
}