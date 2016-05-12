 'use strict';

/*var Instagram = require('instagram-node').instagram();

var config = require('../../../config/environment');
Instagram.use({ client_id: config.instagram.client_id,
         client_secret: config.instagram.client_secret});*/

var Instagram = require('instagram-node').instagram();
var config = require('../../../config/environment');
Instagram.use({ client_id: config.instagram.client_id,
         client_secret: config.instagram.client_secret,
         access_token: '561490372.5b9e1e6.c8448ce3e4c741c68ba76795e6435655'});

//3195009044.5b9e1e6.b7b998413c614f9dbad3071d12a4f7c5
var ACCESS_TOKEN = '561490372.5b9e1e6.c8448ce3e4c741c68ba76795e6435655';
exports.getMediaFromHashTag = function(req, res) {

	var hashtag = req.params.hashtag;
	// hashtag = '#'+hashtag;
	console.log(hashtag);

	//https://api.instagram.com/v1/tags/{tag-name}/media/recent?access_token=ACCESS-TOKEN
	
	var http = require('https');
	var options = {
	  host: 'api.instagram.com',
	  path: '/v1/tags/'+hashtag+'/media/recent?access_token='+ACCESS_TOKEN
	};

	var callback = function(response) {
	  var str = '';
	  response.on('data', function (chunk) {
	    str += chunk;
	  });
	  //the whole response has been recieved, so we just print it out here
	  response.on('end', function () {
	    var resJson = JSON.parse(str);
	    var medias = [];

			for (var i=0; i < resJson['data'].length; i++){
				var type = '';
				var url='';
				var caption='';
				var hashtags=[];
				var user_name = '';
				
				
				//user name
				if (resJson['data'][i]['user']['username'] != undefined)
					user_name = resJson['data'][i]['user']['username'];
				// Type
				type = resJson['data'][i]['type'];
				if (type == 'image'){
					var image = resJson['data'][i]['images']['standard_resolution'];
					if (image != undefined){
						if (resJson['data'][i]['images']['standard_resolution']['url'] != undefined)
							{
								url = resJson['data'][i]['images']['standard_resolution']['url'];
							}
					}
				}
				else if (type =='video'){
					var video = resJson['data'][i]['videos']['standard_resolution'];
					if (image != undefined){
						if (resJson['data'][i]['videos']['standard_resolution']['url'] != undefined)
							url = resJson['data'][i]['videos']['standard_resolution']['url'];
					}
				}
				// Caption
				if (resJson['data'][i]['caption'] != undefined){
						caption = resJson['data'][i]['caption']['text']
				}
				// Hash Tag
				if (resJson['data'][i]['tags'] != undefined){
						 
						 for(var hashtag in resJson['data'][i]['tags'])
						 {
						 		hashtags.push('#'+resJson['data'][i]['tags'][hashtag]);
						 }

				}
				
				if (user_name != '' && url != '' && type !='' && caption != '' && hashtags != undefined){
					var media = {
						media_url: url,
	          type:'instagram',
	          media_type:type,
	          text:caption,
	          hashtags: hashtags,
	          username: user_name
					}
					medias.push(media);
					if (medias.length > 5){
						break;
					}
				}
			}	
      return res.json({'data':medias});
	  });
	}

	http.request(options, callback).end();
}