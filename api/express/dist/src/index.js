import express from "express";
var app = express();
var port = 3000;
var z = function() {
    return 0;
};
var todo = {
    title: "[Bug] report 1",
    body: "Bug description"
};
app.get("/todos", function(req, res) {
    res.json([
        todo
    ]);
});
app.post("/todos", function(req, res) {
    res.status(201).send(todo);
});
app.listen(port, function() {
    z();
    console.log("Example app listening on port ".concat(port));
});
