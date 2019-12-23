// function isUserConnected() {
//     console.log("getCookie('PHPSESSID')", getCookie("PHPSESSID"));
//     console.log("document.cookie", document.cookie);
//
//     if(getCookie("PHPSESSID")) {
//         return true;
//     }
//     return false;
// }

async function isUserConnected() {
    const token = localStorage.getItem("token")

    const res = await fetch(
        checkConnexionApiUrl,
        {
            method: 'GET',
            headers:
                {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            credentials: 'include'
        }
    );

    return res.status === 200;
}

// function isUserConnected() {
//     const sessionCookie = browser.cookies.get({name: "PHPSESSID"});
//     sessionCookie.then(logCookie);
//
//     return (sessionCookie ? true : false);
// }

