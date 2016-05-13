'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AmvSchema = new Schema({

  Promo_Tag: String,
    SilverCross: Number,
    SilverFinal : Number,
    GoldCross: Number,
    GoldFinal: Number,
    PlatinumCross: Number,
    PlatinumFinal: Number,
    SilverFeatures: [],
    GoldFeatures : [],
    PlatinumFeatures : [],
    Questions : [],
    Answers : [],
    
    SocialImpact:{
    	title: String,
    	tag_line: String,
    	description : String
    },
    SocialMediaAccounts : {
    	facebook : String,
    	instagram: String,
    	twitter: String,
    	pinterest: String
    }

  }
);

module.exports = mongoose.model('Amvs', AmvSchema);