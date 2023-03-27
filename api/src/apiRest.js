const app = require('./app')
require("./database")

app.listen(app.get("port"), function() {
    console.log("Server listening on port " + app.get("port"));
})