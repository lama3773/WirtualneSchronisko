function login() {
    var url = "http://localhost:8080/login";
    var username = document.getElementById('username').value,
        password = document.getElementById('password').value;

    http_request = new XMLHttpRequest();
    http_request.onload = function (xhr) {
        if (xhr.target.status == 200) {
            let role = xhr.target.response.replace(/[\[\]']+/g,'');
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
        document.getElementById("div_login").style.visibility = "visible";
        document.getElementById("div_logout").style.visibility = "hidden";
        document.getElementById("button-book-list").style.visibility = "hidden";
        document.getElementById("table_books").style.visibility = "hidden";

    } else {
        if (userRole === 'ROLE_USER') {
            if (page === "admin") {
                window.location = 'index.html';
            }
            //user
            document.getElementById("nav-link-admin").style.visibility = "hidden";
            document.getElementById("div_login").style.visibility = "hidden";
            document.getElementById("div_logout").style.visibility = "visible";
            document.getElementById("button-book-list").style.visibility = "visible";
            document.getElementById("table_books").style.visibility = "visible";
        }

        if (userRole === 'ROLE_ADMIN') {
            //admin
            document.getElementById("nav-link-admin").style.visibility = "visible";
            document.getElementById("div_login").style.visibility = "hidden";
            document.getElementById("div_logout").style.visibility = "visible";
            document.getElementById("button-book-list").style.visibility = "visible";
            document.getElementById("table_books").style.visibility = "visible";
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