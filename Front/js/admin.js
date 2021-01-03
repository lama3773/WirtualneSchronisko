function AddItem() {
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

function RemoveBook(bookId) {
    var url = "http://localhost:8080/dashboard/";
    document.getElementById("message_admin").innerHTML = "";
    if (getCookie('role') === "ROLE_1") { //admin

        http_request = new XMLHttpRequest();
        http_request.onload = function (xhr) {
            if (xhr.target.status == 200) {
                var data = JSON.parse(xhr.target.response);
                document.getElementById("modify_animals_table_header").style.visibility = "visible";
                document.getElementById("modify_animals_table_title").textContent = "Usunięto pozycję:";
                document.getElementById("table_modified_animals").innerHTML =
                    "<tr>" + "<th>" + "Tytuł" + "</th>" + "<th>" + "Autor" + "</th>" + "<th>" + "Data wydania" + "</th>" + "</tr>" +
                    "<tr>" + "<td>" + data.book.title + "</td>" + "<td>" + data.book.author + "</td>" + "<td>" + data.book.releaseDate + "</td>" + "</tr>";
                loadFromApi(true);

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

function ImageUpload() {
    var formData = new FormData();
    var file = document.getElementById("file-input-image").files[0];
    formData.append("file", file);

    var url = "http://localhost:8080/upload";
    if (getCookie('role') === "ROLE_1") { //admin
        http_request = new XMLHttpRequest();
        http_request.onload = function (xhr) {
            console.log(xhr.target.status);
            if (xhr.target.status == 200) {
                console.log('success2');
                console.log(xhr.returnValue);
                document.getElementById("preview img").style.visibility = "visible";
                document.getElementById("preview img").src = xhr.target.response;
                document.getElementById("file-input-image-src").value = xhr.target.response;
                // $("#img").attr("src", xhr.returnValue);
                // $(".preview img").show(); // Display image element
            } else {
                console.log('else');
                alert('file not uploaded');
            }
        };
        http_request.open('POST', url, true);
        http_request.setRequestHeader("Authorization", "Basic " + btoa(getCookie("username") + ":" + getCookie("password")));
        http_request.send(formData);
    } else {
        document.getElementById("message_dashboard").innerHTML = "Dodawanie zwierząt jest dostępna jedynie dla administratorów."
    }
}