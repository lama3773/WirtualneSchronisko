function AddItem() {
    var url = "http://localhost:8080/animals";
    document.getElementById("message_admin").innerHTML = "";
    if (getCookie('role') === "ROLE_1") { //admin
        var name = document.getElementById('new_name').value,
            breed = document.getElementById('new_breed').value,
            category = document.getElementById('new_category').value,
            age = document.getElementById('new_age').value;

        http_request = new XMLHttpRequest();
        http_request.onload = function (xhr) {
            if (xhr.target.status == 200) {
                var data = JSON.parse(xhr.target.response);
                data = data.animal;
                ImageUpload(data.id)

                document.getElementById("modify_animals_table_header").style.visibility = "visible";
                document.getElementById("modify_animals_table_title").textContent = "Dodano nowe zwierzę:";

                document.getElementById("table_modified_animals").innerHTML =
                    "<tr>" + "<th>" + "Nazwa" + "</th>" + "<th>" + "Rasa" + "</th>" + "<th>" + "Wiek" + "</th>" + "</tr>" +
                    "<tr>" + "<td>" + data.name + "</td>" + "<td>" + data.breed + "</td>" + "<td>" + data.age + "</td>" + "</tr>";

                loadFromApi(true);

            } else {
                if (xhr.target.status == 401) {
                    document.getElementById("message_admin").innerHTML = "Dodawanie zwierząt jest dostępne jedynie dla administratorów."
                } else {
                    document.getElementById("message_admin").innerHTML = "Wystąpił problem przy próbie dodania zwierzęcia."
                }
            }
        };
        const params = {
            "name": name,
            "breed": breed,
            "category": category,
            "age": age,
        }
        http_request.open('POST', url, false);
        http_request.setRequestHeader("Authorization", "Basic " + btoa( getCookie("username") + ":" +  getCookie("password")));
        http_request.setRequestHeader('Content-type', 'application/json');
        http_request.send(JSON.stringify(params));
    } else {
        document.getElementById("message_dashboard").innerHTML = "Dodawanie zwierząt jest dostępna jedynie dla administratorów."
    }
}

function RemoveAnimal(animalId) {
    var url = "http://localhost:8080/animals/";
    document.getElementById("message_admin").innerHTML = "";
    if (getCookie('role') === "ROLE_1") { //admin

        http_request = new XMLHttpRequest();
        http_request.onload = function (xhr) {
            if (xhr.target.status == 200) {
                var data = JSON.parse(xhr.target.response);
                document.getElementById("modify_animals_table_header").style.visibility = "visible";
                document.getElementById("modify_animals_table_title").textContent = "Usunięto pozycję:";
                document.getElementById("table_modified_animals").innerHTML =
                    "<tr>" + "<th>" + "Nazwa" + "</th>" + "<th>" + "Rasa" + "</th>" + "<th>" + "Wiek" + "</th>" + "</tr>" +
                    "<tr>" + "<td>" + data.name + "</td>" + "<td>" + data.breed + "</td>" + "<td>" + data.age + "</td>" + "</tr>";
                loadFromApi(true);

            } else {
                if (xhr.target.status == 401) {
                    document.getElementById("message_admin").innerHTML = "Usuwanie zwierząt jest dostępne jedynie dla administratorów."
                } else {
                    document.getElementById("message_admin").innerHTML = "Wystąpił problem przy próbie usunięcia zwierzęcia."
                }
            }
        };
        http_request.open('DELETE', url + animalId, true);
        http_request.setRequestHeader("Authorization", "Basic " + btoa(getCookie("username") + ":" + getCookie("password")));
        http_request.setRequestHeader('Content-type', 'application/json');
        http_request.send();
    } else {
        document.getElementById("message_dashboard").innerHTML = "Usuwanie zwierząt jest dostępna jedynie dla administratorów."
    }
}

function ImageUpload(animalId) {
    var formData = new FormData();
    var file = document.getElementById("new_img");
    console.log(file);
    console.log(animalId);
    if (file && animalId) {
        formData.append("file", file.files[0]);

        var url = "http://localhost:8080/upload/"+animalId;
        if (getCookie('role') === "ROLE_1") { //admin
            http_request = new XMLHttpRequest();
            http_request.onload = function (xhr) {
                console.log(xhr.target.status);
                if (xhr.target.status == 200) {
                    console.log('success2');
                    console.log(xhr.returnValue);
                } else {
                    alert('file not uploaded');
                }
            };
            http_request.open('POST', url, false);
            http_request.setRequestHeader("Authorization", "Basic " + btoa(getCookie("username") + ":" + getCookie("password")));
            http_request.send(formData);
        } else {
            document.getElementById("message_dashboard").innerHTML = "Dodawanie zwierząt jest dostępna jedynie dla administratorów."
        }
    }
}