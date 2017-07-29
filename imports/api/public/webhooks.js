import BodyParser from 'body-parser'
import {Picker} from 'meteor/meteorhacks:picker'
import ContentfulServer from 'contentful-webhook-server'
import bodyParse from'body-parser'
import { Meteor } from 'meteor/meteor';
// server = ContentfulServer({
// 	path: '/bob',
// 	username: 'bob',
// 	password: 'mark'
// })


// server.on('ContentManagement.*', function(req){
//   console.log('A content type was published!');
// });

// server.listen(3010, function(){
//   console.log('Contentful webhook server running on port ' + 3010)
// });

const contentful = require('contentful')

const SPACE_ID = 'ago4yxk9fm5e'
const ACCESS_TOKEN = 'b56f7e83cffc4353acd92d4ce0d40e70b562c68adc667bcbc3a7c81d47b849a7'

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: ACCESS_TOKEN,
  resolveLinks: false
})


Picker.middleware(BodyParser.json({type: 'application/*'}))
// Picker.route('/'), ()=> console.log('route')

Picker.route('/api/webhooks', (params, request, response) =>{
	if(request.headers.authorization ==='Basic Ym9iOm1hcms='){
		console.log('contentful webhook coming in')
		client.getEntry(request.body.sys.id).then(
			// Fore Some reason I cant resolve links from contetnful so I have to do an extra query to get image and author names client.getEntries({'sys.id': request.body.sys.id}, 'include':10).then((res)=>console.log(res.items[0].fields.author.fields.name)

			(res)=> {

			console.log(res.fields.author)
			let newPost = res

			let insertFeaturedImage = client.getAsset(res.fields.featuredImage.sys.id)
			.then((featuredImage)=> {newPost.fields.featuredImage=featuredImage})
			.catch(()=> console.log('there was an error fetching the image'))
			
			let insertAuthor = client.getEntry(res.fields.author[0].sys.id)
			.then((author)=>{newPost.fields.author = [author]})
			.catch(()=>console.log('there was an error fetching the author'))

			Promise.all([insertFeaturedImage, insertAuthor]).then((entries)=>{
				console.log('Adding New Entry')
				Meteor.call('add-entry', newPost)
				console.log('added')
		
			})
			
		}
		)
		.catch((err)=> console.log(error))
		response.setHeader( 'Content-Type', 'application/json' );
 		response.statusCode = 200;
  		response.end( 'success' );
	}
	else{
		console.log('Unknow request')
		response.setHeader( 'Content-Type', 'application/json' );
 		response.statusCode = 403;
  		response.end( 'You are not authorized to send us a webhook my friend' );
	}
})