// Create web server

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var Comments = require('../models/comments');

router.get('/', function(req, res){
    //res.send('Comments page');
    Comments.getComments(function(err, comments){
        if(err){
            console.log(err);
        }
        res.json(comments);
    });
});

router.post('/', urlencodedParser, function(req, res){
    //res.send('Comments page');
    var comment = req.body;
    Comments.addComment(comment, function(err, comment){
        if(err){
            console.log(err);
        }
        res.json(comment);
    });
});

router.put('/:id', urlencodedParser, function(req, res){
    var id = req.params.id;
    var comment = req.body;
    Comments.updateComment(id, comment, {}, function(err, comment){
        if(err){
            console.log(err);
        }
        res.json(comment);
    });
});

router.delete('/:id', urlencodedParser, function(req, res){
    var id = req.params.id;
    Comments.removeComment(id, function(err, comment){
        if(err){
            console.log(err);
        }
        res.json(comment);
    });
});

module.exports = router;