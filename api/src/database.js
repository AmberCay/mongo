const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Amberita:9CGRjtJCe0zhhLEp@cluster0.rqbwt4k.mongodb.net/test", {useNewUrlParser: true, useUnifiedTopology: true}).then((db) => {
    console.log("database connected on " + db.connection.host);
})
.catch((error) => {
    console.log(error);
})