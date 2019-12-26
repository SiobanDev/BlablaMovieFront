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
    let getToken = localStorage.getItem("token");

    try{
        const res = await fetch(
            getLoginUrl,
            {
                method: 'GET',
                headers:
                    {
                        'Authorization': `Bearer ${getToken}`
                    },
                credentials: 'include'
            }
        );

        if(res.status === 200){
            return res;
        }

        return console.log("No connected user");

    } catch (e) {
        throw new Error(e);
    }
}

// function isUserConnected() {
//     const sessionCookie = browser.cookies.get({name: "PHPSESSID"});
//     sessionCookie.then(logCookie);
//
//     return (sessionCookie ? true : false);
// }

