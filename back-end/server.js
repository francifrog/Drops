const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
mongoose.Promise = global.Promise;

    var tone_analyzer = new ToneAnalyzerV3({
        username: 'f856fbb7-5210-4c99-875d-f748895ed512',
        password: '8O5wtqZjDVue',
        version_date: '2017-08-16'
    });
/* -----TONEANALYZER----- 

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var tone_analyzer = new ToneAnalyzerV3({
  username: 'f856fbb7-5210-4c99-875d-f748895ed512',
  password: '8O5wtqZjDVue',
  version_date: '2017-08-16'
});

var params = {
  // Get the text from the JSON file.
  text: 'Do I dare disturb the universe? In a minute there is time for decisions and revisions which a minute will reverse.',
  tones: 'emotion'
};

tone_analyzer.tone(params, function(error, response) {
  if (error)
    console.log('error:', error);
  else
    console.log(JSON.stringify(response, null, 2));
  }
);

--------*/



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + './../front-end/build'));

mongoose.connect('mongodb://localhost/data/db/');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:')); //what's the difference between this and the one we did in class??
db.once('open', function() {
	console.log("Mongoose is connected... yuhuuuuu!")
});

const Messages = require ('./models/Messages');

const seedMessages = require('./seeds/seedMsg');
seedMessages();


/*---------GET!!!!----------*/
app.get('/messages', (req,res) => {
	Messages.find({})
		.then(objectsArray => {
            /*è qui che devo fare qualcosa per mandare sooooolo la propr dell'oggetto che voglio*/
			res.send(objectsArray);
            console.log('OBJARRAY', objectsArray)
		})
		.catch(err => {
			console.log(err);
			res.status(400)
				.json({err});
		})
});


/*------------POST!!!!!!!!!------------*/
app.post('/messages',(req,res) => {
	let obj = req.body;
    let msg = req.body.message;
    console.log('WHAT IM RECEVING FROM REACT',msg)
    delete obj._id;

    var params = {
        text: msg,
        tones: 'emotion'
    };

    tone_analyzer.tone(params, function(error, response) {
        if (error){
            console.log('error:', error);
        }else{
            let tones = response.document_tone.tone_categories[0].tones
            console.log('ARRAY PRIMA DI SORT', tones)
            tones.sort(function (a, b) {
                return a.score - b.score;
            });
            console.log('ARRAY DOPO DI SORT', tones)
            obj.tone =tones[tones.length - 1].tone_name;
           /* console.log(JSON.stringify(response, null, 2)); */
            let newMessage = Messages(obj);
            newMessage.save()
                .then(savedMessage => {
                    console.log('WHAT IM SENDING TO MONGO-BONGO', savedMessage)
                    res.json(savedMessage);
                })
                .catch(err => {
                    console.log(err);
                    res.status(400)
                        .json({err})
                })
        }
        }
    );
});

app.get('*', (req, res) => {
    res.sendFile('index.html',{root: __dirname + './../front-end/build'});
});


const PORT = process.env.PORT || 8080;

app.listen(PORT,() => {
	console.log("Listening on Port:",PORT)
	console.log("Stop with Ctrl+C");
});