function AddUser() {
    var url = "http://localhost:8080/dashboard";
    document.getElementById("message_admin").innerHTML = "";
    if (getCookie('role') === "ROLE_1") { //admin
        var title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            releaseDate = document.getElementById('releaseDate').value;

        http_request = new XMLHttpRequest();
        http_request.onload = function (xhr) {
            if (xhr.target.status == 200) {
                var data = JSON.parse(xhr.target.response);
                document.getElementById("modify_animals_table_header").style.visibility = "visible";
                document.getElementById("modify_animals_table_title").textContent = "Dodano nową książkę:";

                document.getElementById("table_modified_animals").innerHTML =
                    "<tr>" + "<th>" + "Tytuł" + "</th>" + "<th>" + "Autor" + "</th>" + "<th>" + "Data wydania" + "</th>" + "</tr>" +
                    "<tr>" + "<td>" + data.book.title + "</td>" + "<td>" + data.book.author + "</td>" + "<td>" + data.book.releaseDate + "</td>" + "</tr>";
                loadFromApi(true);

            } else {
                if (xhr.target.status == 401) {
                    document.getElementById("message_admin").innerHTML = "Dodawanie książek jest dostępne jedynie dla administratorów."
                } else {
                    document.getElementById("message_admin").innerHTML = "Wystąpił problem przy próbie dodania książki."
                }
            }
        };
        const params = {
            "title": title,
            "author": author,
            "releaseDate": releaseDate,
        }
        http_request.open('POST', url, true);
        http_request.setRequestHeader("Authorization", "Basic " + btoa( getCookie("username") + ":" +  getCookie("password")));
        http_request.setRequestHeader('Content-type', 'application/json');
        http_request.send(JSON.stringify(params));
    } else {
        document.getElementById("message_dashboard").innerHTML = "Dodawanie zwierząt jest dostępna jedynie dla administratorów."
    }
}

function RemoveUser(userId) {
    var url = "http://localhost:8080/dashboard/";
    document.getElementById("message_admin").innerHTML = "";
    if (getCookie('role') === "ROLE_1") { //admin

        http_request = new XMLHttpRequest();
        http_request.onload = function (xhr) {
            if (xhr.target.status == 200) {
                var val = JSON.parse(xhr.target.response);
                document.getElementById("modify_users_table_header").style.visibility = "visible";
                document.getElementById("modify_users_table_title").textContent = "Usunięto pozycję:";
                document.getElementById("table_modified_users").innerHTML =
                    "<tr>" + "<th class='user_row'>" + "Username" + "</th>" + "<th class='user_row'>" + "Email" + "</th>" + "<th class='user_row'>" + "Data utworzenia" + "</th>"+ "<th class='user_row'>" + "Rola" + "</th>" + "</tr>" +
                    "<tr>" + "<td class='user_row'>" + val.username + "</td>" + "<td class='user_row'>" + val.email + "</td>" + "<td class='user_row'>" + val.created_at + "</td>"+ "<td class='user_row'>" + val.role + "</td>" + "</tr>";
                loadUsers(false);

            } else {
                if (xhr.target.status == 401) {
                    document.getElementById("message_admin").innerHTML = "Usuwanie zwierząt jest dostępne jedynie dla administratorów."
                } else {
                    document.getElementById("message_admin").innerHTML = "Wystąpił problem przy próbie usunięcia pozycji."
                }
            }
        };
        http_request.open('DELETE', url + bookId, true);
        http_request.setRequestHeader("Authorization", "Basic " + btoa(getCookie("username") + ":" + getCookie("password")));
        http_request.setRequestHeader('Content-type', 'application/json');
        http_request.send();
    } else {
        document.getElementById("message_dashboard").innerHTML = "Usuwanie zwierząt jest dostępna jedynie dla administratorów."
    }
}

function loadUsers(onlyNewUsers) {
    if (getCookie('role') === "ROLE_1")
    {
        var url = getUserLoadUrl(onlyNewUsers);
        http_request = new XMLHttpRequest();
        http_request.onload = function(xhr) {
            console.log(xhr.target.status);

            if (xhr.target.status == 200) {
                var data = JSON.parse(xhr.target.response);
                console.log(data);
                buildUsersTable(data);
            } else {
                if (xhr.target.status == 401) {
                    document.getElementById("message_users").innerHTML = "Lista użytkowników jest dostępna jedynie dla administratorów."
                } else {
                    document.getElementById("message_users").innerHTML = "Wystąpił problem przy próbie pobrania listy użytkowników."
                }
            }
        };
        http_request.open('GET', url, true);
        http_request.setRequestHeader("Authorization", "Basic " + btoa(getCookie("username") + ":" +  getCookie("password")));
        http_request.send(null);
    } else {
        document.getElementById("message_users").innerHTML = "Lista użytkowników jest dostępna jedynie dla administratorów."
    }
}

function getUserLoadUrl(onlyNewUsers) {
    if (onlyNewUsers) {
        path = 'all';
    } else {
        path = 'newones';
    }
    return "http://localhost:8080/users/" + path;
}

function buildUsersTable(data) {
    if (getCookie('role') === "ROLE_1") {
        document.getElementById("table_users").innerHTML =
            "<tr>" + "<th class='user_row'>" + "Username" + "</th>" + "<th class='user_row'>" + "Email" + "</th>" + "<th class='user_row'>" + "Data utworzenia" + "</th>"+ "<th class='user_row'>" + "Rola" + "</th>" + "<th class='user_row'>" + "Edytuj" + "</th>" + "<th class='user_row'>" + "Usuń" + "</th>" + "</tr>" +
            data.map(
                function(val) {
                    return "<tr>" + "<td class='user_row'>" + val.username + "</td>" + "<td class='user_row'>" + val.email + "</td>" + "<td class='user_row'>" + val.created_at + "</td>"+ "<td class='user_row'>" + val.role + "</td>"+ "<td><button type=\"button\" class=\"btn btn-primary\" onClick={ModifyUser(" + val.id + ")}>Edytuj</button></td>"+ "<td><button type=\"button\" class=\"btn btn-primary\" onClick={RemoveUser(" + val.id + ")}>Usuń</button></td>" + "</tr>";
                }).join('')
    }
}
