function addStudent() {
    var response = "";
    var jsonData = new Object();
    jsonData.name = document.getElementById("name").value;
    //jsonData.id = document.getElementById("id").value;
    jsonData.group = document.getElementById("group").value;
    jsonData.email = document.getElementById("email").value;

    if (jsonData.name == "" || jsonData.group == "" || jsonData.email == "") {
        document.getElementById("message").innerHTML = 'All fields are required!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }

    var request = new XMLHttpRequest();
    request.open("POST", "/add-students", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response);

        if (response.message == undefined) {
            document.getElementById("message").innerHTML = 'Added Student: ' + jsonData.name + '!';
            document.getElementById("message").setAttribute("class", "text-success");
            document.getElementById("name").value = "";
            //document.getElementById("id").value = "";
            document.getElementById("group").value = "";
            document.getElementById("email").value = "";
            window.location.href = 'index.html';
        } else {
            document.getElementById("message").innerHTML = 'Unable to add student!';
            document.getElementById("message").setAttribute("class", "text-danger");
            document.getElementById("message").setAttribute("class", "text-danger");
        }
    };
    request.send(JSON.stringify(jsonData));
}
