var mongoose = require('mongoose');
var User = mongoose.model('User');
var Patient = mongoose.model('Billing');

module.exports.profileRead = function(req, res) {
  console.log("made it here")
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
          if(err) {
              res.status(401).json({"message" : "UnauthorizedError: no matching record"});
              return;
          }
          Billing.findOne({'email_address':user.email},
            'ballance_due', 
            function(err, billing) {
                if(err) {
                    res.status(404).json({"message" : "No record found"});
                    return;
                }
                res.status(200).json(billing);
          })
      });
  }
  
};

// /* Experimental
module.exports.billingWrite = function(req, res) {  
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
          if(err) {
            console.error(err);
              res.status(401).json({"message" : "UnauthorizedError: no matching record"});
              return;
          }
          Patient.findOneAndUpdate(
          {
            'email_address':user.email},
          {
            $set: { 'ballance_due': req.body.ballance_due},
          },
          {
            new: true
          },
            function(err, patient) {
                if(err) {
                    res.status(404).json({"message" : "No record found"});
                    return;
                }
                res.status(200).json(patient);
          })
      });
  }
};
// */