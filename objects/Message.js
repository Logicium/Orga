var express = require('express');
var router = express.Router();
var Messages =  require('./../server/Databases').Messages;

var Message = function(dataModel){
    this.members = [];
    this.teams = [];
    this.users = [];
    this.message = "";
    this.media = "";
};

Message.prototype={

};

router.get('/',function(request,response){
  Messages.find({}, function (err, docs) {
    response.send(docs);
  });
});

router.post('/add',function(request,response){
  console.log("Add message request: ");
  console.log(request.body);
  var m = new Message(request.body);
  Messages.insert(m, function (err, newDoc) {
    console.log(newDoc);
    response.send({message:"New message added!",data:newDoc});
  });

  //Special feature coming soon ;)
  // var a = new Activity(request.body.activity);
  // Activities.insert(a,function(err,newDoc){});

});

router.post('/update',function(request,response){
    //Update
});

router.post('/delete',function(request,response){
    //Delete
});

module.exports = router;
