import { Meteor } from 'meteor/meteor';
import '../imports/api/blogs.js'

//Should I leave Butterlist.then in the startup function 
//or should I keeap it as an import 
// import '../imports/api/server/fetchblog.js'
// 
import Butter from'buttercms'
	const butter = Butter('2b74c45ce3c54328b1a9d258fd36c831fbc02ff4')
	// const ButterList = butter.post.list()
	// ButterList.then((data)=>{		// .data 
	// 		// this.getPosts(Resp);
	// 		console.log(data.data.data)
	// 	data.data.data.map(
	// 		(obj)=>{
	// 			// console.log(obj)
	// 			Meteor.call('add-entry',obj)
	// 		})
	// })


// import {ButterList} from '../imports/api/butter.js'



Meteor.startup(() => {

	// ButterList.then(function(data){		// .data 
	// 	// this.getPosts(Resp);
	// data.data.data.map(
	// 	(obj)=>{
	// 		Meteor.call('add-entry',obj)
	// 	})
	// })
});

	butter.feed.retrieve('rss')
  .then(function(resp) {
    console.log(resp.data)
  }).catch(function(resp) {
    console.log(resp)
  });


