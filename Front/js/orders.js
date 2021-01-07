function loadOrders() {
    var url = "http://localhost:8080/orders";
    if (getCookie('role') === "ROLE_2" || getCookie('role') === "ROLE_1")
    {
        http_request = new XMLHttpRequest();
        http_request.onload = function(xhr) {
            if (xhr.target.status == 200) {
                var data = JSON.parse(xhr.target.response);
                console.log(data);
                document.getElementById("table_orders").innerHTML =
                    "<tr>" +
                    "<th class='order_row'>" + "Id" + "</th>" +
                    "<th class='order_row'>" + "Użytkownik" + "</th>" +
                    "<th class='order_row'>" + "Zwierzę" + "</th>"+
                    "<th class='order_row'>" + "Data zamówienia" + "</th>" +
                    "<th class='order_row'>" + "Usuń" + "</th>" +
                    "</tr>" +
                    data.map(
                        function(val) {
                            return "<tr>" +
                                "<td class='order_row'>" + val.id + "</td>" +
                                "<td class='order_row'>" + val.userId + "</td>" +
                                "<td class='order_row'>" + val.animalsId + "</td>" +
                                "<td class='order_row'>" + val.createdAt + "</td>" +
                                "<td><button type=\"button\" class=\"btn btn-primary\" onClick={RemoveOrder(" + val.id + ")}>Usuń</button></td>" +
                                "</tr>";
                        }).join('')
            } else {
                if (xhr.target.status == 401) {
                    document.getElementById("message_dashboard").innerHTML = "Lista zamówień jest dostępna jedynie dla zalogowanych użytkowników."
                } else {
                    document.getElementById("message_dashboard").innerHTML = "Wystąpił problem przy próbie pobrania listy zamówień. Proszę skontaktować się z administratorem."
                }
            }
        };

        http_request.open('GET', url, true);
        http_request.setRequestHeader("Authorization", "Basic " + btoa(getCookie("username") + ":" +  getCookie("password")));
        http_request.send(null);
    } else {
        document.getElementById("message_orders").innerHTML = "Lista zamówień jest dostępna jedynie dla zalogowanych użytkowników."
    }
}

function RemoveOrder(order_id) {
    document.getElementById("message_orders").innerHTML = "";
    if (getCookie('role') === "ROLE_1") {
        var url = "http://localhost:8080/orders/";
        http_request = new XMLHttpRequest();
        http_request.onload = function (xhr) {
            if (xhr.target.status == 200) {
                document.getElementById("modify_orders_table_header").style.visibility = "visible";
                document.getElementById("modify_orders_table_title").textContent = "Usunięto zamówienie z id = " + order_id;
                loadOrders();
            } else {
                alert('Wystąpił problem podczas wysyłania prośby o adopcję. Skontaktuj się z administratorem.');
            }
        };

        http_request.open('DELETE', url + order_id, true);
        http_request.setRequestHeader("Authorization", "Basic " + btoa(getCookie("username") + ":" + getCookie("password")));
        http_request.send();
    }  else {
        document.getElementById("message_orders").innerHTML = "Usuwanie zamówień jest dostępne jedynie dla zalogowanych użytkowników."
    }
}