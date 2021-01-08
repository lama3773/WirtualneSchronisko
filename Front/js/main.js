function login() {
    var url = "http://localhost:8080/login?XDEBUG_SESSION_START=1";
    var username = document.getElementById('username').value,
        password = document.getElementById('password').value;

    http_request = new XMLHttpRequest();
    http_request.onload = function (xhr) {
        if (xhr.target.status == 200) {
            let response = JSON.parse(xhr.target.response);
            let role = response['role'].replace(/[\[\]']+/g,'');
            document.cookie = "user_id=" + response['user_id'];
            document.cookie = "username=" + username;
            document.cookie = "password=" + password;
            document.cookie = "role=" + role;
            addProtectedResources();
        } else {
            if (xhr.target.status == 401) {
                document.getElementById("message_login").innerHTML = "Nieprawidłowy login lub hasło."
            } else {
                document.getElementById("message_login").innerHTML = "Wystąpił problem przy próbie logowania. Skontaktuj się z administratorem"
            }
        }
    };
    const params = "username=" + username + "&password="+password;

    http_request.open('POST', url, true);
    http_request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http_request.send(params);
}
function register() {
    var url = "http://localhost:8080/register";
    var username = document.getElementById('new_username').value,
        password = document.getElementById('new_password').value,
        email = document.getElementById('new_email').value;

    http_request = new XMLHttpRequest();
    http_request.onload = function (xhr) {
        if (xhr.target.status == 200) {
            alert("Wysłano prośbę o zatwierdzenie konta użytkownika.")
        } else {
            document.getElementById("message_register").innerHTML = "Wystąpił problem przy próbie rejestracji. Skontaktuj się z administratorem"
        }
    };
    const params = "username=" + username + "&password="+password + "&email=" + email;

    http_request.open('POST', url, true);
    http_request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http_request.send(params);
}

function logout() {
    let url = "http://localhost:8080/logout";

    http_request = new XMLHttpRequest();
    http_request.onload = function (xhr) {
        if (xhr.target.status == 204) {
            document.cookie = "username=";
            document.cookie = "role=";
            window.location = 'index.html';
            addProtectedResources();
        } else {
            document.getElementById("message_login").innerHTML = "Wystąpił problem przy próbie logowania. Skontaktuj się z administratorem"
        }
    };
    http_request.open('GET', url, true);
    http_request.send(null);
}

function addProtectedResources(page) {
    let userRole = getCookie("role");
    if (userRole === '') {
        if (page === "admin") {
            window.location = 'index.html';
        }
        //guest
        document.getElementById("nav-link-admin").style.visibility = "hidden";
        document.getElementById("nav-link-users").style.visibility = "hidden";
        document.getElementById("nav-link-orders").style.visibility = "hidden";
        document.getElementById("div_login").style.visibility = "visible";
        document.getElementById("div_register").style.visibility = "visible";
        document.getElementById("div_logout").style.visibility = "hidden";
        document.getElementById("button-animals-list").style.visibility = "hidden";
        document.getElementById("table_animals").style.visibility = "hidden";

    } else {
        if (userRole === 'ROLE_0') { //user
            if (page === "admin" || page === "users" || page === "orders") {
                window.location = 'index.html';
            }
            //user
            document.getElementById("nav-link-admin").style.visibility = "hidden";
            document.getElementById("nav-link-users").style.visibility = "hidden";
            document.getElementById("nav-link-orders").style.visibility = "hidden";
            document.getElementById("div_login").style.visibility = "hidden";
            document.getElementById("div_register").style.visibility = "hidden";
            document.getElementById("div_logout").style.visibility = "visible";
            document.getElementById("button-animals-list").style.visibility = "visible";
            document.getElementById("table_animals").style.visibility = "visible";
        }

        if (userRole === 'ROLE_1') { //admin
            //admin
            document.getElementById("nav-link-admin").style.visibility = "visible";
            document.getElementById("nav-link-users").style.visibility = "visible";
            document.getElementById("nav-link-orders").style.visibility = "visible";
            document.getElementById("div_login").style.visibility = "hidden";
            document.getElementById("div_register").style.visibility = "hidden";
            document.getElementById("div_logout").style.visibility = "visible";
            document.getElementById("button-animals-list").style.visibility = "visible";
            document.getElementById("table_animals").style.visibility = "visible";
        }
        if (userRole === 'ROLE_2') { //admin
            //admin
            document.getElementById("nav-link-admin").style.visibility = "hidden";
            document.getElementById("nav-link-users").style.visibility = "hidden";
            document.getElementById("nav-link-orders").style.visibility = "visible";
            document.getElementById("div_login").style.visibility = "hidden";
            document.getElementById("div_register").style.visibility = "hidden";
            document.getElementById("div_logout").style.visibility = "visible";
            document.getElementById("button-animals-list").style.visibility = "visible";
            document.getElementById("table_animals").style.visibility = "visible";
        }

        if (userRole === 'ROLE_3') {
            logout();
            window.location = 'index.html';
            alert('Blocked');
        }
    }
}

function getCookie(name) {
    name = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}