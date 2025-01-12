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

async function editStudent(req, res) {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const email = req.body.email;
        const group = req.body.group;
        const allResources = await readJSON('utils/student.json');
        var modified = false;

        for (var i = 0; i < allResources.length; i++) {
            var curcurrResource = allResources[i];
            if (curcurrResource.id == id) {
                allResources[i].name = name;
                allResources[i].email = email;
                allResources[i].group = group;
                modified = true;
            }
        }

        var symbols = /^[a-zA-Z0-9 ]+$/;

        if (name == "" || email == "" || group == ""){
            return res.status(500).json({ message: 'All fields are required' });
        }
        else if (!email.includes('@') || !email.includes('.')){
            return res.status(500).json({ message: 'Invalid email format' });
        }
        else if (group.length > 15){
            return res.status(500).json({ message: 'Invalid group input length' })
        }
        else if (!symbols.test(group)) {
            return res.status(500).json({ message: 'Invalid group input characters'})
        }
        else if (modified) {
            await fs.writeFile('utils/student.json', JSON.stringify(allResources), 'utf8');
            return res.status(201).json({ message: 'Student updated successfully!' });
        } 
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    readJSON,
    editStudent,
};
