function viewStudents() {
    var response = '';
    var request = new XMLHttpRequest();
    request.open('GET', '/view-students', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        var html = '';
        for (var i = 0; i < response.length; i++) {
            html += '<tr>' +
                        '<td>' + (i + 1) + '</td>' +
                        '<td>' + response[i].name + '</td>' +
                        '<td>' + response[i].email + '</td>' +
                        '<td>' + response[i].group + '</td>' +
                        '<td>' +
                            '<button type="button" class="btn btn-warning" onclick="editStudent(\'' + JSON.stringify(response[i]).replaceAll('\"', '&quot;') + '\')">Edit</button> ' +
                        '</td>' +
                    '</tr>';
        }
        document.getElementById('tableContent').innerHTML = html;
    };
    request.send();
}

function editStudent(data) {
    var selectedResource = JSON.parse(data);
    document.getElementById("editName").value = selectedResource.name;
    document.getElementById("editEmail").value = selectedResource.email;
    document.getElementById("editGroup").value = selectedResource.group;
    document.getElementById("updateButton").setAttribute("onclick", 'updateStudent("' + selectedResource.id + '")');
    $('#editResourceModal').modal('show');
}

function updateStudent(id) {
    console.log(id);
    var response = "";
    var jsonData = new Object();
    jsonData.name = document.getElementById("editName").value;
    jsonData.group = document.getElementById("editGroup").value;
    jsonData.email = document.getElementById("editEmail").value;

    if (jsonData.name == "" || jsonData.email == "" || jsonData.group == "") {
        document.getElementById("editMessage").innerHTML = 'All fields are required!';
        document.getElementById("editMessage").setAttribute("class", "text-danger");
        return;
    }

    if (!jsonData.email.includes('@') || !jsonData.email.includes('.')) {
        document.getElementById("editMessage").innerHTML = 'Invalid Email!';
        document.getElementById("editMessage").setAttribute("class", "text-danger");
        return;
    }

    if (jsonData.group.length > 15){
        document.getElementById("editMessage").innerHTML = 'Invalid group input length!';
        document.getElementById("editMessage").setAttribute("class", "text-danger");
        return;
    }

    var symbols = /^[a-zA-Z0-9 ]+$/;
    if (!symbols.test(jsonData.group)){
        document.getElementById("editMessage").innerHTML = 'Invalid group input characters!';
        document.getElementById("editMessage").setAttribute("class", "text-danger");
        return;
    }

    var request = new XMLHttpRequest();
    request.open("PUT", "/edit-student/" + id, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "Student updated successfully!") {
            document.getElementById("editMessage").innerHTML = 'Edited Student: ' + jsonData.name + '!';
            document.getElementById("editMessage").setAttribute("class", "text-success");
            window.location.href = 'index.html';
        }
    };
    request.send(JSON.stringify(jsonData));
}


