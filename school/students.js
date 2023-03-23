const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Amberita:9CGRjtJCe0zhhLEp@cluster0.rqbwt4k.mongodb.net/test', 
    {useNewUrlParser: false, useUnifiedTopology: false})

const teacherSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    groups: [String]
})

const subjectSchema = new mongoose.Schema({
    title: String,
    teachers: [teacherSchema]
})

const marksSchema = new mongoose.Schema({
    date: Date,
    mark: Number,
    subject: subjectSchema
})

const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    marks: [marksSchema]
})

let Teacher = mongoose.model("Teacher", teacherSchema);
let Subject = mongoose.model("Subject", subjectSchema);
let Mark = mongoose.model("Mark", marksSchema);
let Student = mongoose.model("Student", studentSchema);

// let teacher1 = new Teacher({
//     firstName: "Edna",
//     lastName: "Karabapell",
//     groups: ["groupo1"]
// })
// let teacher2 = new Teacher({
//     firstName: "Seymour",
//     lastName: "Skninner",
//     groups: ["groupo1", "groupo2"]
// })
// let teacher3 = new Teacher({
//     firstName: "Dewey",
//     lastName: "Largo",
//     groups: ["groupo3"]
// })
// let teacher4 = new Teacher({
//     firstName: "Elizabeth",
//     lastName: "Hoover",
//     groups: ["groupo4", "groupo2"]
// })

// let subject1 = new Subject({title:"math", teachers:[teacher1, teacher2]})
// let subject2 = new Subject({title:"history", teachers:[teacher2, teacher4]})
// let subject3 = new Subject({title:"music", teachers:[teacher3]})
// let subject4 = new Subject({title:"music", teachers:[teacher4]})

// let mark1 = new Mark({date:"2023-03-23", mark: 10, subject: subject1})
// let mark2 = new Mark({date:"2023-02-23", mark: 9, subject: subject2})
// let mark3 = new Mark({date:"2023-01-23", mark: 8, subject: subject3})
// let mark4 = new Mark({date:"2023-04-23", mark: 7, subject: subject4})

// let student1 = new Student({
//     firstName: "Bart",
//     lastName: "Simpson",
//     marks:[mark1, mark2]
// })
// let student2 = new Student({
//     firstName: "Lisa",
//     lastName: "Simpson",
//     marks:[mark2, mark3]
// })
// let student3 = new Student({
//     firstName: "Nelson",
//     lastName: "Muntz",
//     marks:[mark1, mark2]
// })
// let student4 = new Student({
//     firstName: "Martin",
//     lastName: "Price",
//     marks:[mark2, mark4]
// })

// Teacher.insertMany([teacher1, teacher2, teacher3, teacher4]).then( function() {
//     console.log("teachers saved");
// })
// .catch( function() {
//     console.log("teachers not saved");
// })

// Subject.insertMany([subject1, subject2, subject3, subject4]).then( function() {
//     console.log("subjects saved");
// })
// .catch( function() {
//     console.log("subjects not saved");
// })

// Mark.insertMany([mark1, mark2, mark3, mark4]).then( function() {
//     console.log("marks saved");
// })
// .catch( function() {
//     console.log("marks not saved");
// })

// Student.insertMany([student1, student2, student3, student4]).then( function() {
//     console.log("students saved");
// })
// .catch( function() {
//     console.log("students not saved");
// })

Student.findOne({firstName: "Bart"}).then((student) => {
    console.log(student);
    let answer = student.firstName + "'s grades are: \n"
    student.marks.forEach((markie) => {
        answer += (`${markie.mark} in ${markie.subject.title}, taught by: `);
        markie.subject.teachers.forEach((teacher) => {
            answer += (`${teacher.firstName} ${teacher.lastName} \n`)
        })
    })
    console.log(answer);
})
.catch((err) => {
    console.log(err);
})

// await Student.findOne({firstName: "Bart"}).exec()