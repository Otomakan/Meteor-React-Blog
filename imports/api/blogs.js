
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
// const Resp 


// const Resp = butter.post.list()
// .then(function(respons){
// 	return respons
// });


export const Posts = new Mongo.Collection('posts')

// // Get page content
// let resp = await butter.content.retrieve(['homepage'])
// console.log({content: resp.data.data})
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('posts', function postsPublication() {
    return Posts.find();
  });
}
// Redo the way you update data to get shorter queries

// Re
Meteor.methods({
	'add-entry'(object){
		// if(Posts.)
	if(Posts.find({}).fetch().length === 0 && object !== undefined){
		Posts.insert({object})
	}

	if(Posts.find({"object.title": object.title}).fetch().length==1)
		return

	else
		Posts.insert({object})
// .fetch().map((post)=>{
			
// 			console.log('hap')
// 			// if(post.object.slug === object.slug)
// 				Posts.insert({object})
// 		})
	},
	'remove-all'(){
		
		Posts.remove({})
	}
})

// checkIfTrue(value){

// 	for(let x=0; x<array.length;x++)
// }