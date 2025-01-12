var express = require('express');
var bodyParser = require("body-parser");
var app = express();

const PORT = process.env.PORT || 5050
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./instrumented"));


const { addCourse, viewCourses, editCourses } = require("./utils/CoursesUtil")
app.post("/add-course", addCourse);
app.get("/view-courses", viewCourses);
app.put('/edit-course/:id', editCourses);

const { addStudent, viewStudents, editStudent} = require('./utils/AddStudentUtils')
app.post('/add-students', addStudent);
app.get('/view-students', viewStudents);
app.put('/edit-student/:id', editStudent);

app.get('/', (req, res) => {
res.sendFile(__dirname + "/instrumented/" + startPage);
})

server = app.listen(PORT, function () {
const address = server.address();
const baseUrl = `http://${address.address == "::" ? 'localhost' :
address.address}:${address.port}`;
console.log(`Demo project at: ${baseUrl}`);
});

module.exports = {app, server}