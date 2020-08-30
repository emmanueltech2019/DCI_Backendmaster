const Investment = require("../models/investmentPlan/investmentPlan")
const SubInvestments = require("../models/investmentPlan/SubStagePlan")
const SingleSubInvestment = require("../models/investmentPlan/singleSubPlan")

exports.plan=(req,res,next)=>{
    const investment =new Investment({
        name:req.body.name
    })
    investment.save()
    .then(data=>{
        res.status(201).json({
            investment,
            message:"created"
        })
    })
    .catch(error => {
        res.status(500).json({
        error: error
        });
      }
    )
}
exports.plans=(req,res,next)=>{
    Investment.find({},(err,user)=>{
        res.send(user)
      })
}
exports.subplans=(req,res,next)=>{
    Investment.findOne({ _id: req.params.id })
        .then(plan => {
        let subInvestments = new SubInvestments({
            name: req.body.name
        });
        plan.subPlans.push(subInvestments);
        subInvestments.save(error => {
            if (error) return res.send(error);
        });
        plan.save((error, plandata) => {
            if (error) return res.send(error);
            res.send(plandata);
        });
    });
}

exports.singlePlan=(req,res,next)=>{
    Investment.findById({ _id: req.params.id })
    .populate({ path: "subPlans", model: SubInvestments })
    .exec((err, post) => {
      if (err) return res.status(505).send(err);

      res.send(post);
    });
}
exports.CreatesingleSubPlan=(req,res,next)=>{
    SubInvestments.findOne({ _id: req.params.id })
        .then(plan => {
        let singlesubInvestments = new SingleSubInvestment({
            name: req.body.name
        });
        plan.singlesubplans.push(singlesubInvestments);
        singlesubInvestments.save(error => {
            if (error) return res.send(error);
        });
        plan.save((error, plandata) => {
            if (error) return res.send(error);
            res.send(plandata);
        });
    });
}
exports.getsingleSubPlan=(req,res,next)=>{
    SubInvestments.findById({ _id: req.params.id })
    .populate({ path: "singlesubplans", model: SingleSubInvestment })
    .exec((err, post) => {
      if (err) return res.status(505).send(err);
      res.json(post);
    });
}
