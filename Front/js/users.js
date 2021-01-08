function AddUser() {
    var url = "http://localhost:8080/users";
    var username = document.getElementById('new_username').value,
        password = document.getElementById('new_password').value,
        role = document.getElementById('new_role').value,
        address = document.getElementById('new_address').value,
        email = document.getElementById('new_email').value;

    http_request = new XMLHttpRequest();
    http_request.onload = function (xhr) {
        if (xhr.target.status == 200) {
            alert("Dodano użytkownika.");
            loadUsers();
        } else {
            document.getElementById("message_users").innerHTML = "Wystąpił problem przy próbie rejestracji użytkownika"
        }
    };
    const params = {
        "username": username,
        "password": password,
        "email": email,
        "role": role,
        "address": address
    }
    http_request.open('POST', url, true);
    http_request.setRequestHeader('Content-type', 'application/json');
    http_request.setRequestHeader("Authorization", "Basic " + btoa(getCookie("username") + ":" + getCookie("password")));
    http_request.send(JSON.stringify(params));
}
function ModifyUser() {
    var url = "http://localhost:8080/users/";
    var username = document.getElementById('edit_username').value,
        password = document.getElementById('edit_password').value,
        role = document.getElementById('edit_role').value,
        email = document.getElementById('edit_email').value,
        address = document.getElementById('edit_address').value,
        user_id = document.getElementById('edit_id').value;

    http_request = new XMLHttpRequest();
    http_request.onload = function (xhr) {
        if (xhr.target.status == 200) {
            alert("Zapsiano użytkownika.");
            loadUsers();
        } else {
            document.getElementById("message_users").innerHTML = "Wystąpił problem przy próbie edycji użytkownika"
        }
    };
    const params = {
        "id": user_id,
        "username": username,
        "password": password,
        "email": email,
        "role": role,
        "address": address
    }
    http_request.open('PUT', url + user_id, true);
    http_request.setRequestHeader('Content-type', 'application/json');
    http_request.setRequestHeader("Authorization", "Basic " + btoa(getCookie("username") + ":" + getCookie("password")));
    http_request.send(JSON.stringify(params));
}
function RemoveUser(userId) {
    document.getElementById("message_users").innerHTML = "";
    if (getCookie('role') === "ROLE_1") { //admin
        var url = "http://localhost:8080/users/";

        http_request = new XMLHttpRequest();
        http_request.onload = function (xhr) {
            if (xhr.target.status == 200 || xhr.target.status == 204) {
                document.getElementById("modify_users_table_header").style.visibility = "visible";
                document.getElementById("modify_users_table_title").textContent = "Usunięto usera z id = " + userId;
                loadUsers();
            } else {
                if (xhr.target.status == 401) {
                    document.getElementById("message_users").innerHTML = "Usuwanie zwierząt jest dostępne jedynie dla administratorów."
                } else {
                    document.getElementById("message_users").innerHTML = "Wystąpił problem przy próbie usunięcia pozycji."
                }
            }
        };
        http_request.open('DELETE', url + userId, true);
        http_request.setRequestHeader("Authorization", "Basic " + btoa(getCookie("username") + ":" + getCookie("password")));
        http_request.send();
    } else {
        document.getElementById("message_users").innerHTML = "Usuwanie zwierząt jest dostępna jedynie dla administratorów."
    }
}

function loadUsers(onlyNewUsers) {
    if (getCookie('role') === "ROLE_1")
    {
        var url = getUserLoadUrl(onlyNewUsers);
        http_request = new XMLHttpRequest();
        http_request.onload = function(xhr) {
            if (xhr.target.status == 200) {
                var data = JSON.parse(xhr.target.response);
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
    let path = 'all';
    if (onlyNewUsers) {
        path = 'newones';
    }
    return "http://localhost:8080/users/" + path;
}

function buildUsersTable(data) {
    if (getCookie('role') === "ROLE_1") {
        document.getElementById("table_users").innerHTML =
            "<tr>" +
            "<th class='user_row'>" + "ID" + "</th>"+
            "<th class='user_row'>" + "Username" + "</th>" +
            "<th class='user_row'>" + "Email" + "</th>" +
            "<th class='user_row'>" + "Data utworzenia" + "</th>"+
            "<th class='user_row'>" + "Rola" + "</th>" +
            "<th class='user_row'>" + "Adres" + "</th>" +
            "<th class='user_row'>" + "Edytuj" + "</th>" +
            "<th class='user_row'>" + "Usuń" + "</th>" +
            "</tr>" +
            data.map(
                function(val) {
                    let isDisabled = "";
                    let content = "<tr>" +
                        "<td class='user_row'>" + val.id + "</td>"+
                        "<td class='user_row'>" + val.username + "</td>" +
                        "<td class='user_row'>" + val.email + "</td>" +
                        "<td class='user_row'>" + new Date(val.created).toGMTString() + "</td>"+
                        "<td class='user_row'>" + getUserFriendlyRole(val.role) + "</td>"+
                        "<td class='user_row'>" + val.address + "</td>"+
                        "<td><button type=\"button\" class=\"btn btn-primary\" onClick={EditUserForm(" + val.id + ")}>Edytuj</button></td>";
                        if (val.role == 1) {
                            isDisabled = " disabled";
                        }
                            content += "<td><button type=\"button\" class=\"btn btn-primary\" onClick={RemoveUser(" + val.id + ")}" + isDisabled +
                                ">Usuń</button></td>";

                    content += "</tr>";
                    return content;
                }).join('')
    }
}

function getUserFriendlyRole(role) {
    var map = new Map();
    map.set(0, "Użytkownik");
    map.set(1, "Admin");
    map.set(2, "Moderator");
    map.set(3, "Blocked");
    $result = map.get(role);
    if ($result == "undefined") {
        return role
    }
    return $result;
}

function EditUserForm(user_id) {
    document.getElementById("modify_user_container").style.visibility = "hidden";
    if (getCookie('role') === "ROLE_1")
    {
        var url = "http://localhost:8080/users/";
        http_request = new XMLHttpRequest();
        http_request.onload = function(xhr) {
            console.log(xhr.target.status);

            if (xhr.target.status == 200) {
                var data = JSON.parse(xhr.target.response);
                console.log(data);
                document.getElementById("modify_user_container").style.visibility = "visible";
                document.getElementById("edit_id").value = user_id;
                document.getElementById("edit_username").value = data.username;
                document.getElementById("edit_password").value = data.password;
                document.getElementById("edit_email").value = data.email;
                document.getElementById("edit_address").value = data.address;
                let options = document.getElementById("edit_role").options;
                options[data.role].selected = true;
            } else {
                if (xhr.target.status == 401) {
                    document.getElementById("message_users_edit").innerHTML = "Edycja użytkowników jest dostępna jedynie dla administratorów."
                } else {
                    document.getElementById("message_users_edit").innerHTML = "Wystąpił problem przy próbie edycji użytkownika."
                }
            }
        };
        http_request.open('GET', url + user_id, true);
        http_request.setRequestHeader("Authorization", "Basic " + btoa(getCookie("username") + ":" +  getCookie("password")));
        http_request.send(null);
    } else {
        document.getElementById("message_users_edit").innerHTML = "Edycja użytkowników jest dostępna jedynie dla administratorów."
    }
}