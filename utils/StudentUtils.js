const { Student } = require('../models/Student');
const fs = require('fs').promises;

async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);
        await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
        return allObjects;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function addStudent(req, res) {
    try {
        const name = req.body.name;
        const id = req.body.id;
        const group = req.body.group;
        const email = req.body.email;

        if (!email.includes('@') || !email.includes('.')) {
            return res.status(500).json({ message: 'Validation error' });
        } else {
            const newStudent = new Student(name, id, group, email);
            const updatedStudent = await writeJSON(newStudent, 'utils/student.json');
            return res.status(201).json(updatedStudent);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function viewStudents(req, res) {
    try {
        const allResources = await readJSON('utils/student.json');
        return res.status(201).json(allResources);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    readJSON,
    writeJSON,
    addStudent,
    viewStudents
};
