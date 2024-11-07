function addCourse() {
    var response = "";

    var jsonData = new Object();
    jsonData.name = document.getElementById("name").value;
    jsonData.studentsEnrolled = document.getElementById("studentsEnrolled").value;
    jsonData.description = document.getElementById("description").value;
    jsonData.courseHead = document.getElementById("courseHead").value;

    if (jsonData.name == "" || jsonData.studentsEnrolled == "" || jsonData.description == "") {
        document.getElementById("message").innerHTML = 'All fields are required!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }

    var request = new XMLHttpRequest();
    request.open("POST", "/add-course", true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response);

        if (response.message == undefined) {
            document.getElementById("message").innerHTML = 'Added Course: ' + jsonData.name + '!';
            document.getElementById("message").setAttribute("class", "text-success");
            document.getElementById("name").value = "";
            document.getElementById("studentsEnrolled").value = "";
            document.getElementById("description").value = "";
            document.getElementById("courseHead").value = "";
            window.location.href = 'index.html';
        } else {
            document.getElementById("message").innerHTML = 'Unable to add course!';
            document.getElementById("message").setAttribute("class", "text-danger");
        }
    };

    request.send(JSON.stringify(jsonData));
}

function viewCourses() {
    var response = '';
    var request = new XMLHttpRequest();

    request.open('GET', '/view-courses', true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);

        var html = '';
        for (var i = 0; i < response.length; i++) {
            html += '<tr>' +
                    '<td>' + (i+1) + '</td>' +
                    '<td>' + response[i].name + '</td>' +
                    '<td>' + response[i].studentsEnrolled + '</td>' +
                    '<td>' + response[i].description + '</td>' +
                    '<td>' + response[i].courseHead + '</td>' +
                    '<td>' +
                    '<button type="button" class="btn btn-warning" onclick="editCourse(\'' + 
                    JSON.stringify(response[i]).replaceAll('\"', '&quot;') + '\')">Edit</button> ' +
                    '</td>' +
                    '</tr>';
        }

        document.getElementById('tableContent').innerHTML = html;
    };

    request.send();
}