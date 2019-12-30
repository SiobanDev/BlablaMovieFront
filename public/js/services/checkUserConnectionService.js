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

        if(getToken !== null && res.status === 401) {
            localStorage.setItem("token", null);
            return false;
        }

        if(res.status === 200){
            return true;
        }

    } catch (e) {
        throw new Error(e);
    }
}
