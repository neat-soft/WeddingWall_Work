/**
 * Created by Oliver on 1/31/2016.
 */

'use strict';

var Twitter = require('twitter-node-client').Twitter;

var config = require('../../../config/environment');
var configure = {
   "consumerKey": config.twitter.consumerKey,
   "consumerSecret": config.twitter.consumerSecret,
   "accessToken": config.twitter.accessToken,
   "accessTokenSecret": config.twitter.accessTokenSecret,
   "callBackUrl": config.twitter.callbackURL
};

var twitter = new Twitter(configure);
var error = function (err, response, body) {
    console.log('err');
    console.log('ERROR [%s]', err);
    };
var success = function (data) {
    console.log('scc');
    console.log('Data [%s]', data);
    };

exports.getMediaFromHashTag = function(req, res) {
    var medias = [];
    var hashtag = req.params.hashtag;
    hashtag = '#'+hashtag;
    console.log(hashtag);
    console.log(twitter);
    twitter.getSearch({'q':hashtag },function (err,response,body) {
      if (err){
        console.log(err);
        return handleError(res, err);
        }
    },function (data) {
      if(!data){return res.status(404).send('no data');}
      var tempJson = JSON.parse(data);
      for(var k = 0 ; k< tempJson['statuses'].length; k++ )
        {
          
          if (tempJson['statuses'][k]['entities']['media'] != undefined)
            {
              if (tempJson['statuses'][k]['entities']['media'][0]['media_url'] != undefined && tempJson['statuses'][k]['entities']['user_mentions']!= undefined)
                {
                  if (tempJson['statuses'][k]['entities']['user_mentions'][0] !=undefined)
                  {
                    if (findById(medias,tempJson['statuses'][k]['entities']['media'][0]['media_url']) == false)
                      {
                         console.log('entities',tempJson['statuses'][k]['entities']);
                         var hashtags=[];
                         for (var i = 0; i < tempJson['statuses'][k]['entities']['hashtags'].length; i++)
                         {
                            hashtags.push('#'+tempJson['statuses'][k]['entities']['hashtags'][i]['text']);
                         }
                         var media = {
                          media_url:tempJson['statuses'][k]['entities']['media'][0]['media_url'],
                          type:'twitter',
                          media_type: 'image',
                          text:tempJson['statuses'][k]['text'],
                          hashtags: hashtags,
                          username: tempJson['statuses'][k]['entities']['user_mentions'][0]['name']
                         }
                         medias.push(media);
                        if (medias.length > 20){
                          break;
                        }
                      }
                  }
                  
                }
            }
        }
      return res.json({'data':medias});
    });

};

// FUNCTION DEFINITION
var findById = function(medias, fItem){
    for(var i = 0; i<medias.length; i++){
        var item = medias[i].media_url;
        if(item == fItem) return true;
    }
    return false;
};
function handleError(res, err) {
  return res.status(500).send(err);
}