var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Helloworld */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World!' });
});

/* GET userlist page */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist":docs
        });
    });
});

/* GET New User page */
router.get('/newuser', function(req,res){
    res.render('newuser', {title: 'Add New User'});
});

/* POST New user page */
router.post('/adduser', function(req,res) {
    var db = req.db;

    var userName = req.body.username;
    var userEmail = req.body.useremail;

    var collection = db.get('usercollection');

    collection.insert({
        "username": userName,
        "email": userEmail
    }, function(err, doc) {
        if(err) {
            // if it failed, return error
            res.send('There was a problem adding the information to the database');
        } else {
            // if it worked, set the header so the address bar doesn't still say /adduser
            res.location('userlist');
            // and forward to success page
            res.redirect("userlist");
        }
    })
})

module.exports = router;
