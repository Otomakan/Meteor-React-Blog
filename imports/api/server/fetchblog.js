
import {ButterList} from '../butter.js'

ButterList.then((data)=>{		// .data 
		// this.getPosts(Resp);
		
			Meteor.call('remove-all')
	data.data.data.map(
		(obj)=>{
			// console.log(obj)
			Meteor.call('remove-all')
		})
})

		
