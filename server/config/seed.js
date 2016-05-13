'use strict';

var User = require('../api/user/user.model');
var AMVS = require('../api/amvs/amvs.model');
var UserCtrl = require('../api/user/user.controller');
var AVmCtrl = require('../api/amvs/amvs.controller');
var seedUsers = [
  {
    name: 'Admin',
    email: 'admin@admin.com',
    role: 'admin',
    hashedPassword: 'admin'
  },
  {
    name: 'Test User',
    email: 'test@test.com',
    role: 'user',
    hashedPassword: 'test'
  }
];

var seedAMV = [
  {
    Promo_Tag: 'Summer sale! Only $199! Promo code: Summer2016',
    SilverCross: 29,
    SilverFinal : 0,
    GoldCross: 89,
    GoldFinal: 49,
    PlatinumCross: 100,
    PlatinumFinal: 79,
    VideoUrl: 'https://www.youtube.com/watch?v=aBYWGjIzvyw',
    SilverFeatures: ["Display Content Live from Twitter, Instagram and Snapchat",
                "Guests can upload via website"],
    GoldFeatures : ["Display Content Live from Twitter, Instagram and Snapchat",
                "Share pictures to social media(i.e share album to FB)",
                "A wedding video created with all content posted",
                "Guests can upload via website"],
    PlatinumFeatures : ["Display Content Live from Twitter, Instagram and Snapchat",
                "No Social Wedding Wall Branding",
                "Upto 5 hastags",
                "Cutomizable video created with all posted content",
                "Image moderated by a human moderator",
                "Share pictures to social media(i.e share album to FB)",
                "Guests can upload via website"],
    Questions : ["How do you guests know how to use Wedding Wall?",
              "What if I don't find a theme that goes with my wedding theme?",
              "What equiments is needed to operate the Wedding Wall?",
              "Can I access the pictures and messages after the wedding?",
              "How do I choose a unique hastag?"],
    Answers : ["You will receive 30 theme coordinated instructional table cards to educate your guests on how to use the Wedding Wall. Instructions will also be included on the pictures and messages on the actual Wedding Wall. It is also likely that guests who do use Twitter and Instagram will understand how to use wall at first glance"],
    
    SocialImpact:{
      title:"Social Impact",
      tag_line: "social wedding wall will donate a percentage of the profist to the place for name of charity charity",
      description: "Alone amongst the Ikuntji artists, Daisy Jugadai worked at an easel. She cited the Hermannsburg School, a group of Indigenous artists Albert Namatijira who began painting at Hermannsburg Mission in the 1930s, as an influence on her work. Memory and Five Mile Creek(1995) repersents the country of her childhood. It shows the hills of the region in elevation rather than in plan, and represents the range of vegetation typical of that country."     
  },
    SocialMediaAccounts : {
      facebook: "weddingwall",
      instagram: "weddingwall",
      twitter: "weddingwall",
      pinterest: "weddingwall"
  }
}
];

var createTheUser = function(userData){
  UserCtrl.createUser(userData, function(err, user){
    if (err) {
      console.log("Error seeding user: " + err);
    }
  });
}
User.find({}).remove(function() {
  for (var i = 0; i < seedUsers.length; i++) {
    createTheUser(seedUsers[i]);
    
  }
});

var createAMVS = function(amvsData){
  AVmCtrl.createAMVS(amvsData, function(err, amvs){
    if (err) {
      console.log("Error seeding avms: " + err);
    }
  });
}
AMVS.find({}).remove(function() {
  for (var i = 0; i < seedAMV.length; i++) {
    createAMVS(seedAMV[i]);
    
  }
});
