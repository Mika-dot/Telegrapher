const express = require("express");
const http = require("http");
const fs = require("fs");
var md5 = require('md5');
supb = require('@supabase/supabase-js');



const app = express();
const jsonParser = express.json();


app.use(express.static('public'));

const supabaseUrl = "https://llijaqvkqfkapxlvzlln.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsaWphcXZrcWZrYXB4bHZ6bGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkyOTExMzQsImV4cCI6MTk4NDg2NzEzNH0.M85u93e9goTgBkvlnxkDMhyW8bdjNLcfictvmRltMAA";

const supabase = supb.createClient(supabaseUrl, supabaseKey)
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑



// Обращение к картам
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
AddCard = async function (author, name, body, pass, geometry, teg) {
    console.log('\x1b[33m%s\x1b[0m', 'Вошел в функцию AddCard ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓');
    console.log(author, name, body, pass, geometry, teg);
    const { data, error } = await supabase
        .from('articles')
        .insert([{
            author: author,
            body: body,
            name: name,
            md5: md5(author + name + body),
            password: pass,
            geometry: geometry,
            teg: teg
        }])
    console.log('Ошибка - ', data, error);
    console.log('\x1b[33m%s\x1b[0m', 'Вышел из функции AddCard ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑');
}

GetCards = async function () {
    console.log('\x1b[33m%s\x1b[0m', 'Вошел в функцию GetCards ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓');
    let { data: Card, error } = await supabase
        .from('articles')
        .select('id, author, name');
    console.log(`Ответ от БД: ${JSON.stringify(Card)}`);
    console.log('\x1b[33m%s\x1b[0m', 'Вышел из функции GetCards ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑');
    return Card;
}

GetCardsGet = async function () {
    console.log('\x1b[33m%s\x1b[0m', 'Вошел в функцию GetCards ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓');
    let { data: Card, error } = await supabase
        .from('articles')
        .select('id, teg');
    console.log(`Ответ от БД: ${JSON.stringify(Card)}`);
    console.log('\x1b[33m%s\x1b[0m', 'Вышел из функции GetCards ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑');
    return Card;
}

GetCardsByAuthorName = async function (column, name) {
    console.log('\x1b[33m%s\x1b[0m', 'Вошел в функцию GetCardsByAuthorName ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓');
    console.log(`Пришло в БД: ${column}, ${name}`);
    let { data: Card, error } = await supabase
        .from('articles')
        .select('*')
        // .eq('name', author); // автор
        // .eq('author', author);
        .eq(column, name);
    console.log(`Ответ от БД 1: ${JSON.stringify(Card)}`);
    console.log('\x1b[33m%s\x1b[0m', 'Вышел из функции GetCardsByAuthorName ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑');
    return Card;
}

UpdateCard = async function (id, author, name, body, geometry) {
    let { data: Card, error } = await supabase
        .from('articles')
        .update({
            author: author,
            name: name,
            body: body,
            geometry: geometry
        })
        .eq('id', id);
}

//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑



// Админки 
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
app.post("/api/Article", jsonParser, function (req, res) { // Запись в базу

    if (!req.body) return res.sendStatus(400);

    console.log(req.body);

    AddCard(req.body.author, req.body.name, req.body.body, req.body.pass, req.body.geometry, req.body.teg);


});

app.post("/zero/api/ArticleUpdate", jsonParser, function (req, res) { // Запись в базу обновление

    if (!req.body) return res.sendStatus(400);

    console.log(req.body);

    let r = GetCardsByAuthorName('id', req.body.id);

    r.then(resss => Update(resss)); // отправка данных


    function Update(resss) {
        console.log('\x1b[33m%s\x1b[0m', "Сравнение: " + resss[0].password + " и " + req.body.pass)
        if (resss[0].password == req.body.pass) {
            //id, author, name, body
            UpdateCard(req.body.id, req.body.author, req.body.name, req.body.body, req.body.geometry, req.body.get);
        }
    }

});

app.get("/api/Requests", function (req, res) {  // запрос всей базы

    console.log('\x1b[33m%s\x1b[0m', 'Все записи');
    let r = GetCards();
    r.then(resss => res.send(`{"data":` + JSON.stringify(resss) + "}")); // отправка данных

});

app.get("/api/RequestsGet", function (req, res) {  // запрос всей базы

    console.log('\x1b[33m%s\x1b[0m', 'Все записи');
    let r = GetCardsGet();
    r.then(resss => res.send(`{"data":` + JSON.stringify(resss) + "}")); // отправка данных

});
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑



// Айдишники
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
app.get("/api/Request/:id", function (req, res) {  // запрос базы от пользователя 

    // http://localhost:5500/api/Request/Reque=name&Search=Md5

    console.log(req.url);

    let options = String(req.url).split(/\Request=|\&Search=/);
    console.log('\x1b[33m%s\x1b[0m', `Иследуемый пункут: ${options[1]} и Запрашиваемая информация: ${options[2]}`);

    let r;
    switch (options[1]) {
        case 'ID':
            r = GetCardsByAuthorName('id', options[2]);
            r.then(resss => res.send(`{"data":` + JSON.stringify(resss) + "}")); // отправка данных
            break;
        case 'Author':
            r = GetCardsByAuthorName('author', options[2]);
            r.then(resss => res.send(`{"data":` + JSON.stringify(resss) + "}")); // отправка данных
            break;
        case 'Name':
            r = GetCardsByAuthorName('name', options[2]);
            r.then(resss => res.send(`{"data":` + JSON.stringify(resss) + "}")); // отправка данных
            break;
        default:
            console.log('\x1b[33m%s\x1b[0m', 'Ошибка ... ');
    }

    console.log('\x1b[33m%s\x1b[0m', 'Запрос по значениям ... ');
}); // Поиск выбор

app.get("/pages/:id", function (req, res) {  // запрос базы от пользователя   

    // страница
    console.log(req.params["id"]);
    let r = GetCardsByAuthorName('id', req.params["id"]);
    //r.then(resss => res.send(`{"data":` + JSON.stringify(resss) + "}")); // отправка данных

    r.then(resss => res.send(' <!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta http-equiv="content-type" content="text/html; charset=utf-8"> <title>Страница</title> <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"> <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/core.min.js"></script> <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/md5.js"></script> <meta http-equiv="content-type" content="text/html; charset=utf-8"> <script src="../lib/three.min.js"></script> <script src="../lib/orbitcontrols.js"></script> <script src="../lib/jquery-2.1.3.min.js"></script> <script src="../src/csg.js"></script> <script src="../src/threecsg.js"></script> <script src="../src/openjscad.js"></script> <script src="../src/formats.js"></script> <script src="../lib/projector.js"></script> <script src="../lib/canvasrenderer.js"></script> <script> var gProcessor = null; OpenJsCad.AlertUserOfUncaughtExceptions(); function onload() { gProcessor = new OpenJsCad.Processor(document.getElementById("viewer")); updateSolid(); } function updateSolid() { gProcessor.setJsCad(document.getElementById("code").value); } </script> <style> canvas { display: block; margin: 5% auto; max-width: 700px; background: #ffffff; border-radius: 5px; } .statusdiv { display: block; margin: 5% auto; max-width: 700px; } label { margin: auto 15px auto 5px; } button { border: 0; border-radius: 5px; } select { margin: auto 20px; } .parametersdiv { display: block; margin: 5% auto; max-width: 700px; } pre { display: none; } </style> </head> <body onload="onload()"> <div style="margin: 10% 10%; flex-direction: column; justify-content: center; align-items: center"> <div style="margin: 10% 10%; flex-direction: row; justify-content: space-around; align-items: center"> <label style="font-size: 250%;"> ' +
        resss[0].name + ' </label> <label style="margin: 10% 10%; font-size: 250%;"> ' +
        resss[0].author + ' </label> </div> <div style="margin: 10% 10%; font-size: 150%;"> ' +
        resss[0].body + ' </div> </div> <div class="b-example-divider"></div> <div id="viewer"></div> <textarea style="display: none;" style=" display: block; margin: 0px auto; resize: both; width: 700px; background: #ffffff; border-radius: 5px; " id="code">' +
        resss[0].geometry + ' </textarea> <input  style="display: none;" style=" display: block; margin: 5% auto; max-width: 700px; " class="p-2" type="submit" value="Update" onclick="updateSolid(); return false;"> </body> </html>'));

        //style="display: none;"
}); // Просмотр стати

app.get("/zero/:id", function (req, res) {  // запрос базы от пользователя   

    // редактор страницы
    console.log(req.params["id"]);
    let r = GetCardsByAuthorName('id', req.params["id"]);
    //r.then(resss => res.send(`{"data":` + JSON.stringify(resss) + "}")); // отправка данных

    r.then(resss => res.send('<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <title>Страница</title> <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"> <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/core.min.js"></script> <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/md5.js"></script> <meta http-equiv="content-type" content="text/html; charset=utf-8"> <script src="../lib/three.min.js"></script> <script src="../lib/orbitcontrols.js"></script> <script src="../lib/jquery-2.1.3.min.js"></script> <script src="../src/csg.js"></script> <script src="../src/threecsg.js"></script> <script src="../src/openjscad.js"></script> <script src="../src/formats.js"></script> <script src="../lib/projector.js"></script> <script src="../lib/canvasrenderer.js"></script> <script> var gProcessor = null; OpenJsCad.AlertUserOfUncaughtExceptions(); function onload() { gProcessor = new OpenJsCad.Processor(document.getElementById("viewer")); updateSolid(); } function updateSolid() { gProcessor.setJsCad(document.getElementById("code").value); } </script> <style> canvas { display: block; margin: 5% auto; max-width: 700px; background: #ffffff; border-radius: 5px; } .statusdiv { display: block; margin: 5% auto; max-width: 700px; } label { margin: auto 15px auto 5px; } button { border: 0; border-radius: 5px; } select { margin: auto 20px; } .parametersdiv { display: block; margin: 5% auto; max-width: 700px; } pre { display: none; } </style> </head> <body onload="onload()">  <form name="userForm"> <div class="m-auto" style="max-width: 700px;"> <div style="margin-top: 5%; margin-bottom: 5%;"> <button style="margin-right: 5%;" type="button" class="btn btn-light" onclick="Publish()">Publish</button> <input style="margin-top: 5%; border: none;" class="p-2" name="password" placeholder="Пароль" /> </div> </div> <div class="m-auto" style="max-width: 700px;"> <input style="margin-bottom: 5%;" class="p-2" name="name" placeholder="Название" /> <input class="p-2" name="author" placeholder="Автор" /> </div> <div class="m-auto" style="max-width: 700px;"> <textarea name="content" class="editor"></textarea> </div> <div class="b-example-divider"></div> </form> <div class="b-example-divider"></div> <div id="viewer"></div> <textarea style=" display: block; margin: 0px auto; resize: both; width: 700px; background: #ffffff; border-radius: 5px; " id="code">' +
        resss[0].geometry + ' </textarea> <input style=" display: block; margin: 5% auto; max-width: 700px; " class="p-2" type="submit" value="Update" onclick="updateSolid(); return false;"></body> <script src="https://dl.dropboxusercontent.com/s/hb9vf8r4vz7imyy/ckeditor.js"></script> <script> let text = `' +
        resss[0].body + '`; let author = `' +
        resss[0].author + '`; let name = `' +
        resss[0].name + '`; let id = `' +
        resss[0].id + '`;' +
        'var myEditor; ClassicEditor.create(document.querySelector(".editor"), { toolbar: { items: [ "heading", "|", "bold", "italic", "|", "link",  "bulletedList",  "numberedList",  "|", "imageUpload",  "blockQuote", "mediaEmbed", "undo", "redo", ], }, language: "es", image: { toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"], }, licenseKey: "", }) .then(editor => { editor.setData(text); editor.model.document.on("change:data", () => { console.log("Данные изменились!"); }); myEditor = editor; }) .catch(error => { console.error(error); }); document.forms["userForm"].elements["author"].value = author; document.forms["userForm"].elements["name"].value = name; function Publish() { Sending(); } async function Sending() { let temp = myEditor.getData(); const response = await fetch("api/ArticleUpdate", { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify({ author: document.forms["userForm"].elements["author"].value, name: document.forms["userForm"].elements["name"].value, body: temp, pass: document.forms["userForm"].elements["password"].value, id: id }) }); document.cookie = "Card=" + CryptoJS.MD5( document.forms["userForm"].elements["author"].value + document.forms["userForm"].elements["name"].value + temp ); } </script> </html>'
    ));
}); // Изменения статьи
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑



// Сайты
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
app.get('/zero', function (request, response) { // Запрос к статики страницы
    response.sendFile(__dirname + '/public/zero.html');
    console.log('флаг zero');
}); // Создание статьи

app.get('/search', function (request, response) {  // Запрос к статики страницы
    response.sendFile(__dirname + '/public/search.html');
    console.log('флаг search');
}); // Поиск
//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑



// Активация сервера
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
app.listen(5500, () => console.log("Сервер запущен по адресу http://localhost:5500"));