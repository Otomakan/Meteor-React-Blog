
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'


export const Posts = new Mongo.Collection('posts')

// // Get page content

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('posts', function postsPublication() {
    return Posts.find();
  });
}
// Redo the way you update data to get shorter queries

Meteor.methods({
	'add-entry'(object){
		// See if the database is empty
		if(Posts.find({}).fetch().length === 0 && object !== undefined){
			console.log('First database initialisation')
			Posts.insert(object)
		}
		// if not see if the post already exists in the database
		else if(Posts.find({"title": object.title}).fetch().length>0){
			return
		}
		else{
			console.log("Inserting Post: "+object.title)
			Posts.insert(object)
		}

	},

	'remove-all'(){
		Posts.remove({})
	}
})

// checkIfTrue(value){

// 	for(let x=0; x<array.length;x++)
// }