const express = require('express')
const fs = require('fs');
const https = require('https');
const http = require('http');
const multer = require('multer');
const morgan = require('morgan-body');
const cors = require('cors');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');

/*
const cert = fs.readFileSync(__dirname + "/localhost.pem", 'utf-8');
const key = fs.readFileSync(__dirname + "/localhost-key.pem", 'utf-8');
*/
const app = express();
morgan(app);
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ 
    extended: true
}));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

app.get('/', (req, res, next) => {
	res.send("Chart API endpoint", 200);
});

app.get('/:id', function(req, res){
   res.send('The id you specified is ' + req.params.id);
});

app.post('/', (req, res) => {
    let data = req.body;
    res.send('Data Received: ' + JSON.stringify(data));
})

app.post('/build-chart',  (req, res, next) => {
    const files = req.files
    if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(files)
})

//Other routes here
app.get('*', function(req, res){
   res.send('Sorry, this is an invalid URL.');
});

/*
https.createServer({key: key, cert: cert}, app).listen(2324, () => {
    console.log('Server is up on port 2324');
})
*/

http.createServer(app).listen(2324, () => {
    console.log('Server is up on port 2324');
})
