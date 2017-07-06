
import {ButterList} from '../butter.js'

ButterList.then((data)=>{		// .data 
		// this.getPosts(Resp);
	data.data.data.map(
		(obj)=>{
			// console.log(obj)
			Meteor.call('add-entry',obj)
		})
})

		
