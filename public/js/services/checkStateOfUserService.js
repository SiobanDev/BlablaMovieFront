function isUserConnected() {
    console.log("getCookie('PHPSESSID')", getCookie("PHPSESSID"));
    console.log("document.cookie", document.cookie);
    if(getCookie("PHPSESSID")) {
        console.log("getCookie('PHPSESSID')", getCookie("PHPSESSID"));
        console.log("document.cookie", document.cookie);

        return true;
    }
    console.log("getCookie('PHPSESSID')", "nuuuuul")
    return false;
}

function isUserConnected() {
    const sessionCookie = browser.cookies.get({name: "PHPSESSID"});
    sessionCookie.then(logCookie);

    return (sessionCookie ? true : false);
}

