require('dotenv').config()   

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const Thing = require('./models/Thing');

const dns = require('node:dns')
dns.setServers([
  '8.8.8.8',
]);

//https://www.reddit.com/r/node/comments/1qg5o7e/node_process_unable_to_perform_dns_queries_on/

//nslookup cluster0.nmtspzs.mongodb.net

// mongoose.connect('mongodb+srv://dom971MongoDB:1234@cluster0.nmtspzs.mongodb.net/test?retryWrites=true&w=majority',
//   { useNewUrlParser: true,
//     useUnifiedTopology: true }) 
//   .then(() => console.log('Connexion à MongoDB réussie !'))
//   .catch(() => console.log('Connexion à MongoDB échouée !'));


mongoose.connect(process.env.MONGODB_URI) 
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// const uri = "mongodb+srv://dom971MongoDB:1234@cluster0.nmtspzs.mongodb.net/test?retryWrites=true&w=majority";

// mongoose.connect(uri)
//   .then(() => {
//     console.log("✅ Connecté à MongoDB !");
//   })
//   .catch((error) => {
//     console.error("❌ Erreur de connexion :", error);
//   });

const app = express();

 app.use(express.json());




app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());


app.post('/api/stuff', (req, res, next) => {
  // console.log(req.body);
  // res.status(201).json({
  //   message: 'Objet créé !'
  // });

  delete req.body._id;

  const  thing = new Thing({
    ...req.body
  });

  thing.save()
  .then(() => res.status(201).json({message : 'Objet enregistré !'}))
  .catch(error => res.status(400).json({ error }));

 });


app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});

app.get('/api/stuff', (req, res, next) => {

  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));

});

app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});




module.exports = app;