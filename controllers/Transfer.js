const User = require("../models/user/User");
const Transfer = require("../models/investmentPlan/Transfer/Transfer");

exports.proof=(req,res,next)=>{
    // const {Payerdetails,DCIdetails,date,amount,image} =req.body
    // User.findOneAndUpdate({_id:req.params.id},{paid:"pending"},(err,user)=>{
        
    //     if(err) res.send(err)
    //     else{
    //         Transfer.create(
    //             {
    //                 Payerdetails,
    //                 DCIdetails,
    //                 date,
    //                 amount,
    //               image
    //             },
    //             (err, data) => {
    //               if (err) {
    //                 return res.status(500).send(err);
    //               }
    //               res.status(200).json({
    //                   data,
    //                 });
    //             }
    //         );
    //     }
    // })
    console.log(req.body)
    res.send("vool")
}