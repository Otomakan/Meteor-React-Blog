import { Meteor } from 'meteor/meteor';
import '../imports/api/blogs.js'
import '../imports/api/public/webhooks.js'
//Should I leave Butterlist.then in the startup function 
//or should I keeap it as an import 
// import '../imports/api/server/fetchblog.js'
'use strict'

const contentful = require('contentful')

const SPACE_ID = 'ago4yxk9fm5e'
const ACCESS_TOKEN = 'b56f7e83cffc4353acd92d4ce0d40e70b562c68adc667bcbc3a7c81d47b849a7'

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: ACCESS_TOKEN
})




Meteor.startup(() => {
	// Meteor.call('remove-all')
	// let blob=0
	// // This content type is posts so that only posts get added to the db
	// client.getEntries({content_type: '2wKn6yEnZewu2SCCkus4as'})
	// .then((res)=> {
	// 	res.items.map((entry, index)=> {
	// 		if(blob===0)
	// 			console.log(entry)
	// 		blob+=1;
	// 		//Delete created entriea because it creates a maximum stack call problem
	// 		delete entry.fields.author[0].fields.createdEntries
			
	// 		Meteor.call('add-entry', entry)})
	// })
	// .catch((err)=> console.log(err))
});

Meteor.setInterval(()=>{


},30000)
