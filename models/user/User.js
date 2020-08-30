const {model,Schema} =require("mongoose");
const  uniqueValidator = require('mongoose-unique-validator');
const { verify } = require("../../controllers/user");

const UserSchema = new Schema({
    fullname:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phonenumber:{
        type:Number,
    },
    occupation:{
        type:String,
    },
    gender:{
        type:String,
    },
    accesscode:{
        type:String,
    },
    verified:{
        type:Boolean,
        default:false
    },
    upToDate:{
        type:Boolean,
        default:false
    },
    MaritalStatus:{
        type:String,
    },
    DateOfBirth:{
        type:String,
    },
    ResidentialAddress:{
        type:String,
    },
    NearestBusStop:{
        type:String,
    },
    CityTown:{
        type:String,
    },
    State:{
        type:String,
    },
    Nationality:{
        type:String,
    },
    image:{
        type:Object,
    },
    stateOfOrigin:{
        type:String,
    },
    lga:{
        type:String,
    },
    nameOfOrgnisation:{
        type:String,
    },
    identificationNo:{
        type:String,
    },
    identificationMeans:{
        type:String,
    },
    referralsName:{
        type:String,
    },
    referralsId:{
        type:String,
    },
    paid:{
        type:String,
        default:false
    }

})
UserSchema.plugin(uniqueValidator);
module.exports=model("User",UserSchema)