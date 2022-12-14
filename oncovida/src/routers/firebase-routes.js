const admin = require('firebase-admin')

// var serviceAccount = require(process.env.GOOGLE_APPLICATIONS_CREDENTIALS);
var serviceAccount = require("../../pry2021131-firebase-adminsdk-j59nm-cef894dfec.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://pry2021131-default-rtdb.firebaseio.com/'
});

const db = admin.database();

const { Router}= require('express');
const router = Router();

router.get('/listPatients', (req, res) => {
    db.ref('patients').once('value', (snapshot) => {
       data = snapshot.val();
       res.status(200).send(data)
    });
})

// router.post('/new-contact', (req, res) => {
//     const newContact = {
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         email: req.body.email,
//         phone: req.body.phone
//     }
//     db.ref('contacts').push(newContact);
//     res.redirect('/');
// });

// router.get('/delete-contact/:id', (req, res) => {
//     db.ref('contacts/' + req.params.id).remove();
//     res.redirect('/');
// });

module.exports = router;