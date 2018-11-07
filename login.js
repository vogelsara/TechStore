
if (!("userList" in localStorage)) {
    localStorage.setItem("userList", "[]");
}

if (!("loggedInAs" in localStorage)) {
    localStorage.setItem("loggedInAs", "");
}

// Here comes the register form
var modal = document.getElementById('id01');

function registerUser() {
    var registerUsername = document.getElementById('registerUsername').value;
    var registerPassword = document.getElementById('registerPassword').value;

    if (!userAlreadyExists(registerUsername)) {
        var userJson = {};
        userJson["name"] = registerUsername;
        userJson["password"] = registerPassword;
        addUserToUserList(userJson);
    } else {
        alert("Username is already taken!");
    }
}

function userAlreadyExists(username) {
    var userList = JSON.parse(localStorage.getItem("userList"));
    for (var i = 0; i < userList.length; i++) {
        if (userList[i]["name"] === username) {
            return true;
        }
    }
    return false;
}

function addUserToUserList(userJson) {
    var userList = JSON.parse(localStorage.getItem("userList"));
    userList.push(userJson);
    localStorage.setItem("userList", JSON.stringify(userList));
}

function usernameMatchesPassword(username, password) {
    var userList = JSON.parse(localStorage.getItem("userList"));
    for (var i = 0; i < userList.length; i++) {
        if (userList[i]["name"] === username) {
            if (userList[i]["password"] === password) {
                return true;
            }
            return false;
        }
    }
    return false;
}

function loginToThePage() {
    var loginUsername = document.getElementById('loginUsername').value;
    var loginPassword = document.getElementById('loginPassword').value;

    if (userAlreadyExists(loginUsername)) {
        if (usernameMatchesPassword(loginUsername, loginPassword)){
            localStorage.setItem("loggedInAs", loginUsername);
        } else {
            alert("Wrong password!");
        }
    } else {
        alert("This username does not exist!");
    }
}