const bcrypt = require('bcrypt')
const User = require('../models/user/User')
const nodeMailer = require('nodemailer')
const securePin = require("secure-pin");
const jwt=require('jsonwebtoken');

const {SECRET_KEY} =require("../config")
// console.log(SECRET_KEY) 
exports.alluser=(req,res,next)=>{
  User.find({},(err,user)=>{
    res.send(user)
  })
}
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
      (hash) => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save().then(
          () => {
            res.status(201).json({
              message: 'User added successfully!',
              user
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    );
  };

exports.updatePersonalDetails = (req, res, next) => {
  const {fullname,phonenumber,occupation,gender} = req.body

  User.findByIdAndUpdate(req.params.id,{fullname,phonenumber,occupation,gender}, (err, user)=>{
    if (err) return next(err);
    res.status(200).send({
        user,
        message: "Update Successful"
    });
    })
};

exports.verify=(req,res,next)=>{
  let accesscode =securePin.generatePinSync(4);
  let transporter = nodeMailer.createTransport({
    service:"gmail",
    auth:{
      user: 'emmanueltech2019@gmail.com',
      pass: 'emmanueltech2020.com'
    }
  })
  template=(`<h1>thats your verification code</h1><br/><h3>${accesscode}<h3/>`)
  let mailOptions = {
      from:"double coin",
      to:req.body.email,
      subject:"Verification code from double coin registration",
      html:template
  }

  transporter.sendMail(mailOptions,function(err,data) {
    if(err){
      console.log("error occurs")
    }
    else{
      console.log("sent")
    }
    
    User.findOneAndUpdate({email:req.body.email},{accesscode},(err,user)=>{
      if(err) throw err
      res.send(user)
    })
  })

    //   let transporter = nodeMailer.createTransport({
    //     host: "iplayfootball.org",
    //     port: 587,
    //     secure: false,
    //     auth: {
    //         // should be replaced with real sender's account
    //         // user: 'emmanueltech2019@gmail.com',
    //         // pass: 'emmanueltech2020.com'
    //         user: 'mail@iplayfootball.org',
    //         pass: "ipfpass2020_DInJune"
    //     },
    //     tls:{
    //         rejectUnauthorized:false
    //     }
    // });
    // let mailOptions = {
    //     // should be replaced with real recipient's account
    //     to: req.body.email,
    //     subject: req.body.subject,
    //     text: req.body.message
    // };
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Message %s sent: %s', info.messageId, info.response);
    // });
    // // res.writeHead(301, { Location: 'index.html' });
    // res.end("sent");

}
exports.getverified=(req,res,next)=>{
  const {email,accesscode} = req.body
  User.findOne({email},(err,user)=>{
    if(err) console.log(err)
    if(user.accesscode===accesscode){
      user.verified=true
      res.json({
        status:true
      })
    }
    
  })
}

exports.login=(req,res,next)=>{
  const {email,password} = req.body;
    User.findOne({email},(err,user)=>{
        if(err){
            return res.status(500)
            .json({
                message:"login error",
                status:false
            })
        }
        if(!user){
            return res.status(404)
            .json({
                message:"user does not exist",
                status:false
            })
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(403).json({
                 message: 'login invalid',
                 status:false,
             });
        }
        const token = jwt.sign({ id: user._id }, SECRET_KEY, {expiresIn: "86400s"});
        // const token = jwt.sign({ id: user._id },
        //    SECRET_KEY, { algorithm: 'RS256' },(err, token) =>{
        //      if (err) {
        //        console.log(err)
        //      }
        //   console.log(token);
        // });

        res.status(200).json({
        user,
        message: 'Authenticated',
        token,
        });
        
    })
}
exports.dashboarduser=(req,res,next)=>{
  User.findOne({ _id: req.params.id })
  .then(user=>{
      jwt.verify(req.token,SECRET_KEY,(err,authData)=>{
          if (err) {
              res.sendStatus(403);
          } else {
              res.json({
                  message: 'successfully access protected route',
                  authData,
                  user,
              });
          }
      })
  })
  .catch(err=>{
      res.send(err)
  })
}
exports.updateDetails1=(req,res,next)=>{
    const {MaritalStatus,DateOfBirth,ResidentialAddress,NearestBusStop,CityTown,State,Nationality} =req.body;
    User.findByIdAndUpdate({_id:req.params.id},{MaritalStatus,DateOfBirth,ResidentialAddress,NearestBusStop,CityTown,State,Nationality},(err,user)=>{
      if(err) throw next(err)
      res.json({
        message:"updated successfull",
        user,
        status:true
      })
    })

}
exports.updateDetails2=(req,res,next)=>{
    const {referralsId,referralsName,identificationMeans,identificationNo,nameOfOrgnisation,lga,stateOfOrigin} =req.body;
    User.findByIdAndUpdate({_id:req.params.id},{referralsId,referralsName,identificationMeans,identificationNo,nameOfOrgnisation,lga,stateOfOrigin},(err,user)=>{
      if(err) throw next(err)
      res.json({
        message:"updated successfull",
        user,
        status:true
      })
    })

}
exports.uploadimage=(req,res,next)=>{
    User.findByIdAndUpdate({_id:req.params.id},{image: req.file,upToDate:true},(err,user)=>{
      if(err) throw next(err)
      res.json({
        message:"updated successfull",
        user,
        file:req.file,
        status:true
      })
    })
}