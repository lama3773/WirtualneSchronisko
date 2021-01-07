function loadFromApi(isAdmin) {
    var url = "http://localhost:8080/animals";
    if (getCookie('role') === "ROLE_2" || getCookie('role') === "ROLE_1")
    {
        http_request = new XMLHttpRequest();
        http_request.onload = function(xhr) {
            if (xhr.target.status == 200) {
                var data = JSON.parse(xhr.target.response);
                if (isAdmin && getCookie('role') === "ROLE_1") {
                    document.getElementById("table_animals").innerHTML =
                        "<tr>" +
                        "<th class='animal_row'>" + "Zdjęcie" + "</th>" +
                        "<th class='animal_row'>" + "Id" + "</th>" +
                        "<th class='animal_row'>" + "Nazwa" + "</th>" +
                        "<th class='animal_row'>" + "Rasa" + "</th>" +
                        "<th class='animal_row'>" + "Wiek" + "</th>"+
                        "<th class='animal_row'>" + "Edytuj" + "</th>" +
                        "<th class='animal_row'>" + "Usuń" + "</th>" +
                        "</tr>" +
                        data.map(
                            function(val) {
                                return "<tr>" +
                                    "<td class='animal_row'><div class='imageContainer'><img class='animal_image' id='animal_img_" + val.id + "' src='data:image/png;base64," + val.image + "'/></div</td>" +
                                    "<td class='animal_row'>" + val.id + "</td>" +
                                    "<td class='animal_row'>" + val.name + "</td>" +
                                    "<td class='animal_row'>" + val.breed + "</td>" +
                                    "<td class='animal_row'>" + val.age + "</td>"+
                                    "<td><button type=\"button\" class=\"btn btn-primary\" onClick={EditAnimalForm(" + val.id + ")}>Edytuj</button></td>" +
                                    "<td><button type=\"button\" class=\"btn btn-primary\" onClick={RemoveAnimal(" + val.id + ")}>Usuń</button></td>" +
                                    "</tr>";
                            }).join('')
                } else {
                    console.log(data);
                    document.getElementById("table_animals").innerHTML =
                        "<tr>" +
                        "<th class='animal_row'>" + "Zdjęcie" + "</th>" +
                        "<th class='animal_row'>" + "Nazwa" + "</th>" +
                        "<th class='animal_row'>" + "Rasa" + "</th>" +
                        "<th class='animal_row'>" + "Wiek" + "</th>" +
                        "<th class='animal_row'>" + "Akcja" + "</th>" +
                        "</tr>" +
                        data.map(
                            function(val) {
                                return "<tr>" +
                                    "<td class='animal_row'><div class='imageContainer'><img class='animal_image' id='animal_img_" + val.id + "' src='data:image/png;base64," + val.image + "'/></div</td>" +
                                    "<td class='animal_row'>" + val.name + "</td>" +
                                    "<td class='animal_row'>" + val.breed + "</td>" +
                                    "<td class='animal_row'>" + val.age + "</td>" +
                                    "<td><button type=\"button\" class=\"btn btn-primary\" onClick={OrderAnimal(" + val.id + ")}>Adoptuj</button></td>" +
                                    "</tr>";
                            }).join('')
                }
            } else {
                if (xhr.target.status == 401) {
                    document.getElementById("message_dashboard").innerHTML = "Lista książek jest dostępna jedynie dla zalogowanych użytkowników."
                } else {
                    document.getElementById("message_dashboard").innerHTML = "Wystąpił problem przy próbie pobrania listy książek. Proszę skontaktować się z administratorem."
                }
            }
        };
        let onlyNonAdopted = 1;

        if (isAdmin) {
            onlyNonAdopted = 0;
        }
        http_request.open('GET', url + "?onlyNonAdopted=" + onlyNonAdopted, true);
        http_request.setRequestHeader("Authorization", "Basic " + btoa(getCookie("username") + ":" +  getCookie("password")));
        http_request.send(null);
    } else {
        document.getElementById("message_dashboard").innerHTML = "Lista książek jest dostępna jedynie dla zalogowanych użytkowników."
    }
}

function OrderAnimal(animal_id) {
    var user_id = getCookie("user_id");
    var url = "http://localhost:8080/orders";
    document.getElementById("message_dashboard").innerHTML = "";
    http_request = new XMLHttpRequest();
    http_request.onload = function (xhr) {
        if (xhr.target.status == 200) {
            alert('Wysłano prośbę o adopcję. Nasz pracownik wkrótce się z Tobą skontaktuje');
        } else {
            alert('Wystąpił problem podczas wysyłania prośby o adopcję. Skontaktuj się z administratorem.');
        }
    };
    const params = {
        "userId": user_id,
        "animalsId": animal_id,
    }
    http_request.open('POST', url, true);
    http_request.setRequestHeader('Content-type', 'application/json');
    http_request.send(JSON.stringify(params));
}


function EditAnimalForm(user_id) {
    document.getElementById("modify_animals_container").style.visibility = "hidden";
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
