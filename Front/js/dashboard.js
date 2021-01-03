function loadFromApi(isAdmin) {
    var url = "http://localhost:8080/dashboard";
    if (getCookie('role') === "ROLE_2" || getCookie('role') === "ROLE_1")
    {
        http_request = new XMLHttpRequest();
        http_request.onload = function(xhr) {
            if (xhr.target.status == 200) {
                var data = JSON.parse(xhr.target.response);
                if (isAdmin && getCookie('role') === "ROLE_1") {
                    document.getElementById("table_books").innerHTML =
                        "<tr>" + "<th class='book_row'>" + "Tytuł" + "</th>" + "<th class='book_row'>" + "Autor" + "</th>" + "<th class='book_row'>" + "Data wydania" + "</th>"+ "<th class='book_row'>" + "Akcja" + "</th>" + "</tr>" +
                        data.books.map(
                            function(val) {
                                return "<tr>" + "<td class='book_row'>" + val.title + "</td>" + "<td class='book_row'>" + val.author + "</td>" + "<td class='book_row'>" + val.releaseDate + "</td>"+ "<td><button type=\"button\" class=\"btn btn-primary\" onClick={RemoveBook(" + val.id + ")}>Usuń</button></td>" + "</tr>";
                            }).join('')
                } else {
                    document.getElementById("table_books").innerHTML =
                        "<tr>" + "<th>" + "Tytuł" + "</th>" + "<th>" + "Autor" + "</th>" + "<th>" + "Data wydania" + "</th>" + "</tr>" +
                        data.books.map(
                            function(val) {
                                return "<tr>" + "<td class='book_row'>" + val.title + "</td>" + "<td class='book_row'>" + val.author + "</td>" + "<td class='book_row'>" + val.releaseDate + "</td>" + "</tr>";
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
        http_request.open('GET', url, true);
        http_request.setRequestHeader("Authorization", "Basic " + btoa(getCookie("username") + ":" +  getCookie("password")));
        http_request.send(null);
    } else {
        document.getElementById("message_dashboard").innerHTML = "Lista książek jest dostępna jedynie dla zalogowanych użytkowników."
    }
}