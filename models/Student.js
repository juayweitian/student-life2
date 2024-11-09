class Student {
    constructor(name, id, group, email) {
        this.name = name;
        this.id = id;
        this.group = group;
        this.email = email;
        
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        this.id = timestamp + "" + random.toString().padStart(3, '0');
     }
}

module.exports = { Student };