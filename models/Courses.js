class Course {
    constructor(name, studentsEnrolled, description, courseHead) {
        this.name = name;
        this.studentsEnrolled = studentsEnrolled;
        this.description = description;
        this.courseHead = courseHead;

        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        this.id = timestamp + "" + random.toString().padStart(3, '0');
    }
}

module.exports = { Course };