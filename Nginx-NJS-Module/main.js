const main = (r) => {
    r.return(200, "Hello, world!");
}

//Choose the URL by the authorization header

const setUrlByAuthorization = (r) => {
    if (r.headersIn.authorization == "Bearer Oct0c4t!"){
        return "http://http.cat/410";
    }else{
        return "https://api.github.com/octocat";
    }
}

export default { main, setUrlByAuthorization };