const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Amberita:9CGRjtJCe0zhhLEp@cluster0.rqbwt4k.mongodb.net/school',
    { useNewUrlParser: false, useUnifiedTopology: false })

const teacherSchema = new mongoose.Schema({
    teacher_first_name: String,
    teacher_last_name: String
})

const marksSchema = new mongoose.Schema({
    // id: Object_id,
    date: Date,
    mark: Number,
    student_first_name: String,
    student_last_name: String,
    group_name: String,
    subject_name: String,
    teachers: [teacherSchema]
})

let Teacher = mongoose.model("Teacher", teacherSchema);
let Mark = mongoose.model("Mark", marksSchema)

// let teacher1 = new Teacher({teacher_first_name: "Edna", teacher_last_name:"Krabapple"});
// let teacher2 = new Teacher({teacher_first_name: "Seymour", teacher_last_name:"Skinner"});
// let teacher3 = new Teacher({teacher_first_name: "Elizabeth", teacher_last_name:"Hoover"});
// let teacher4 = new Teacher({teacher_first_name: "Dewey", teacher_last_name:"Largo"});
// let teacher5 = new Teacher({teacher_first_name: "Mike", teacher_last_name:"Benzie"});

// let mark1 = new Mark({
//     date: "2023-03-24",
//     mark: 10,
//     student_first_name: "Lisa",
//     student_last_name: "Simpson",
//     group_name: "4th grade",
//     subject_name: "Math",
//     teachers: [teacher1, teacher2]
// })

// let mark2 = new Mark({
//     date: "2023-03-24",
//     mark: 9,
//     student_first_name: "Lisa",
//     student_last_name: "Simpson",
//     group_name: "4th grade",
//     subject_name: "History",
//     teachers: [teacher2, teacher3]
// })

// let mark3 = new Mark({
//     date: "2021-03-24",
//     mark: 3,
//     student_first_name: "Bart",
//     student_last_name: "Simpson",
//     group_name: "5th grade",
//     subject_name: "Math",
//     teachers: [teacher3, teacher4]
// })

// let mark4 = new Mark({
//     date: "2023-03-24",
//     mark: 4,
//     student_first_name: "Nelson",
//     student_last_name: "Muntz",
//     group_name: "5th grade",
//     subject_name: "Math",
//     teachers: [teacher3, teacher4]
// })

// let mark5 = new Mark({
//     date: "2023-03-24",
//     mark: 6,
//     student_first_name: "Milhouse",
//     student_last_name: "Van Houten",
//     group_name: "5th grade",
//     subject_name: "Arts",
//     teachers: [teacher5, teacher2]
// })

// Teacher.insertMany([teacher1, teacher2, teacher3, teacher4, teacher5]).then( function() {
//     console.log("Teachers saved");
// })
// .catch( function() {
//     console.log("Teachers not saved");
// })

// Mark.insertMany([mark1, mark2, mark3, mark4, mark5]).then( function() {
//     console.log("marks saved");
// })
// .catch( function() {
//     console.log("marks not saved");
// })

// get avg by subject

Mark.aggregate([{
    $group:
    {
        "_id": { "Subject": "$subject_name" },
        "Average mark": { "$avg": "$mark" }
    }
}])
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })

// Total students

Mark.aggregate([{
    $count:
        "Number of students"
}]).then((res) => {
    console.log(res);
})
    .catch((err) => {
        console.log(err);
    })

// Show name of students

Mark.aggregate([{
    $project:
    {
        "First Name": "$student_first_name",
        "Last name": "$student_last_name",
        _id: 0
    }
}]).then((res) => {
    console.log("Students:");
    console.log(res);
})
    .catch((err) => {
        console.log(err);
    })

// Show name of teachers

Teacher.aggregate([{
    $project:
    {
        "First Name": "$teacher_first_name",
        "Last name": "$teacher_last_name",
        _id: 0
    }
}]).then((res) => {
    console.log("Teachers:");
    console.log(res);
})
    .catch((err) => {
        console.log(err);
    })

// Show count of students per group in desc alphabetic order

Mark.aggregate([{
    $group: {
        "_id": { "Group name": "$group_name" },
        "Number of students": { "$sum": 1 }
    }
},
{ $sort: { "Group Name": -1 } }]).then((res) => {
    console.log(res);
})
    .catch((err) => {
        console.log(err);
    })

// get avg grade of subjects and get the top 5

Mark.aggregate([{
    $group: {
        "_id": { "Subject": "$subject_name" },
        "Average mark": { "$avg": "$mark" }
            }
        },
        { $match: { "Average mark": { "$gte": 5 } } },
        { $limit: 5 }
        ]).then((res) => {
        console.log("Top 5 marks per subject above 5");
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })

// Mark.aggregate([{$unwind: "$teachers",
//     $group: { "_id": { "Subject": "$subject_name" } },
//     "Number of teachers": { "$sum": 1 }
// }]).then((res) => {
//     console.log(res);
// })
//     .catch((err) => {
//         console.log(err);
//     })

Mark.aggregate([{$match: {"$or":[{mark: {"$gte": 8}},
                                {date: {"$gte": "2021-0101"}}]}},
                {$project:{"First name": "$student_first_name",
                            "Last name": "$student_last_name",
                            "Mark": "$mark",
                            "_id": 0}}]).then((res) => {
                                console.log("Mark over 8 or in the last 2 years");
                                console.log(res);
                            })
                            .catch((err) => {
                                console.log(err);
                            })

// get avg by subject of last year

Mark.aggregate([{$match: {date: {"$gte": "2021-12-31"}}}
// ,{$group:
//     {
//         "_id": { "Subject": "$subject_name" },
//         "Average mark": { "$avg": "$mark" }
//     }}
])
    .then((res) => {
        console.log("Marks avg of last year");
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })

// student's avg mark last year

Mark.aggregate([{$match: {date: {"$gte": "2021-12-31"}}}
,{$group:
    {
        "_id": { "Student": "$student_first_name" },
        "Average mark": { "$avg": "$mark" }
    }}
])
    .then((res) => {
        console.log("Each Student\'s marks avg of last year");
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })

// Get Seymour's students and subjects

Mark.aggregate([{$unwind: "$teachers"}, 
                {$match: {"teachers.teacher_first_name": "Seymour"}},
                {$group: {_id: {"First name": "$student_first_name",
                                "Last name": "$student_last_name"}, "Subjects": {$sum: 1}}}]).then((res) => {
    console.log("Get Seymour's students and subjects");
    console.log(res);
})
.catch((err) => {
    console.log(err);
})