import BodyParser from 'body-parser'
import {Picker} from 'meteor/meteorhacks:picker'
import ContentfulServer from 'contentful-webhook-server'
import { Meteor } from 'meteor/meteor';
import {Publish} from './contentfulRequestType/publish.js'


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
		console.log(request.body)
		if(request.headers['x-contentful-topic']==='ContentManagement.Entry.publish'){
			// We have to use a special Publish function because the webhooks doesnt send detailed body information, to so we fetch the Links that are given by the webhook and build the object to be added to our database
			Publish(request.body.sys.id,client)

	}

	else if(request.headers['x-contentful-topic']==='ContentManagement.Entry.delete' || 'ContentManagement.Entry.unpublish' ){
		console.log('deleting')
		Meteor.call('remove-entry', request.body.sys.id)
	}

	else
		console.log('Not handling this hook yet')


		response.setHeader( 'Content-Type', 'application/json' );
 		response.statusCode = 200;
  		response.end( 'success' );
	}
	else{
		console.log('Unknow request')
		response.setHeader( 'Content-Type', 'application/json' );
 		response.statusCode = 403;
  		response.end( 'You are not authorized to send us a webhook my friend' )
	}
})