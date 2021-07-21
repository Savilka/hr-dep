const express = require("express");
const fs = require("fs");
const multer = require('multer');

const upload = multer({ dest: 'upload/'});
const app = express();
const jsonParser = express.json();

app.use(express.static("dist"));
app.use(express.static("src"));


const filePath = "db.json";
app.get("/", function (req, res) {
    res.send("index.html");
});

app.get("/requests", function (req, res) {
    const content = fs.readFileSync(filePath, "utf8");
    res.send(content);
    console.log("requests GET " + res.statusCode);
});

app.get("/types", function (req, res) {
    const content = fs.readFileSync(filePath, "utf8");
    res.send(content);
    console.log("types GET " + res.statusCode);
});

app.post("/requests", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);
    const CreationDate = new Date();
    const Status = "В обработке";
    const TypeID = req.body.TypeID;
    const Note = req.body.Note;
    let request = {CreationDate: CreationDate, Status: Status, TypeID: TypeID, Note: Note};
    let data = fs.readFileSync(filePath, "utf8");
    let requests = JSON.parse(data);
    const ID = requests.requests.length;
    request.ID = (ID + 1).toString();
    requests.requests.push(request);
    data = JSON.stringify(requests);
    fs.writeFileSync("db.json", data);
    res.send(request);
    console.log("requests POST " + res.statusCode);
});

app.get("/AAERequests", function (req, res) {
    const content = fs.readFileSync(filePath, "utf8");
    res.send(content);
    console.log("AAERequests GET " + res.statusCode);
});

app.get("/buildings", function (req, res) {
    const content = fs.readFileSync(filePath, "utf8");
    res.send(content);
    console.log("buildings GET " + res.statusCode);
});
app.post("/AAERequests",  upload.single("file"), function (req, res) {

    if (!req.body) return res.sendStatus(400);
    const json = JSON.parse(req.body.AAERequest);
    const CreationDate = new Date();
    const Status = "Создана";
    const Building = json.Building;
    const HasFiles = !!req.file;
    const Cabinet = json.Cabinet;
    const Text = json.Text;
    let request = {
        CreationDate: CreationDate,
        Status: Status,
        Building: Building,
        Text: Text,
        Cabinet: Cabinet,
        HasFiles: HasFiles
    };

    let data = fs.readFileSync(filePath, "utf8");
    let requests = JSON.parse(data);

    const id = requests.AAERequests.length;
    request.id = id + 1;
    requests.AAERequests.push(request);
    data = JSON.stringify(requests);
    fs.writeFileSync("db.json", data);
    res.send(request);
    console.log("AAERequests POST " + res.statusCode);
});

app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
});