const { Course } = require('../models/Courses');
const fs = require('fs').promises;

async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) { console.error(err); throw err; }
}

async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);

        await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
        return allObjects;
    } catch (err) { console.error(err); throw err; }
}
   
async function addCourse(req, res) {
    try {
        const name = req.body.name;
        const studentsEnrolled = req.body.studentsEnrolled;
        const description = req.body.description;
        const courseHead = req.body.courseHead;

    if ( studentsEnrolled <= 0 || description.length < 6) {
        return res.status(500).json({ message: 'Validation error' });
    } else {
        const newCourse = new Course(name, studentsEnrolled, description, courseHead);
        const updatedCourses = await writeJSON(newCourse,'utils/courses.json');
        return res.status(201).json(updatedCourses);
        }
    } catch (error) {
            return res.status(500).json({ message: error.message });
    }
}

async function viewCourses(req, res) {
    try {
        const allCourses = await readJSON("utils/courses.json");
        return res.status(201).json(allCourses);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}
   
module.exports = {
    readJSON, writeJSON, addCourse, viewCourses
};