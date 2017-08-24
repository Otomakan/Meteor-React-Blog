
import React, {Component} from 'react'

import {Link} from 'react-router-dom'
import Image from './Image.jsx'

import {Posts} from '../../imports/api/blogs.js'

import { createContainer } from 'react-meteor-data'

 class MorePosts extends Component {

  constructor(props){
  	super(props)
  	this.state={
  		visible: 0,
  		picSize:  Math.round(window.innerHeight*0.4),
  	}
  }

  noRelatedPosts(){
	return <h3> We could not find related Posts</h3>
  }
  componentWillReceiveProps(props){

 	console.log(props.relatedPosts)
  	this.setState({visible:0})
  }

  showPosts(){
  		console.log('counting posts')
		return  this.props.relatedPosts.map((nextPost,index)=>{
			console.log(nextPost)
	        	return (<Link key={index} to={{pathname: nextPost.fields.slug, state: nextPost.fields}}> 
	        		<div className="more-posts-image-container">
	        		<Image src={nextPost.fields.featuredImage.fields.file.url} height={this.state.picSize} width={this.state.picSize}/>
	        		</div>
	        	</Link>)
      	})	
	
  }
  render() {
    return (this.props.dataReady)?
     <div className="nextPostLoader">{this.showPosts()}</div>
     :null
  
  }
};

export default MorePostsContainer = createContainer((props)=>{

	let handle = Meteor.subscribe('posts')
	let relatedPosts =null
	if(handle.ready()){
		relatedPosts = findRelatedPosts(Posts, 'food', 3, props.currentPost)
	}
	return {
		dataReady: handle.ready(),
		relatedPosts : relatedPosts ? relatedPosts : null
	}
},MorePosts)




function findRelatedPosts(db, tags, numbPostsNeeded, excludeIds){

	let final =[]
	let sameTagsPosts= Posts.find({"fields.tags": tags, _id: {$ne:excludeIds}},{limit:30}).fetch()
	// console.log(sameTagsPosts)
	let exception=[-1]
	for(let x=0; x<numbPostsNeeded; x++){
		let tagNum = getRandomIntExpt(sameTagsPosts.length, exception)
		exception.push(tagNum)
		final.push(sameTagsPosts[tagNum])
	}
	return final

}

let  getRandomIntExpt= function(range, exception){
	// Check if exception is an array
	if(!Array.isArray(exception))
		return 'not an array'

	var final = null
	while(final===null || exception.includes(final))
		final=Math.floor(Math.random()*range)
	return final
	
	
}






// export default MorePostsContainer = createContainer((props)=>{
// 	let handle = Meteor.subscribe('posts')
// 	let relatedPosts =null
	
// 	let slugIndex = window.location.href.lastIndexOf("/")+1;
// 	let currentSlug = window.location.href.substr(slugIndex)
	
// 	let doc = Posts.find({"fields.slug": currentSlug || props.match.params.slug||props.location.state.slug}).fetch()
// 	if(handle.ready() && doc[0] && doc[0].fields.tags){
// 		relatedPosts = findRelatedPosts(Posts, 'food', 1, doc[0]._id)
// 	}
// 	// console.log(Posts.count())
// 	let hasnex = Posts.find({'slug':props.match.params.slug})
// 	return {
// 		dataReady: handle.ready(),
// 		blogpost:  doc ? doc : null,
// 		relatedPosts : relatedPosts ? relatedPosts : null
// 	}
// },MorePosts)




// function findRelatedPosts(db, tags, numbPostsNeeded, excludeIds){
// 	let final =[]
// 	let sameTagsPosts= Posts.find({"fields.tags": tags, _id: {$ne:excludeIds}},{limit:30}).fetch()
// 	console.log(sameTagsPosts)
// 	let exception=[-1]
// 	for(let x=0; x<numbPostsNeeded; x++){
// 		let tagNum = getRandomIntExpt(sameTagsPosts.length, exception)
// 		exception.push(tagNum)
// 		final.push(sameTagsPosts[tagNum])
// 	}
// 	return final

// }

// let  getRandomIntExpt= function(range, exception){
// 	// Check if exception is an array
// 	if(!Array.isArray(exception))
// 		return 'not an array'

// 	var final = null
// 	while(final===null || exception.includes(final))
// 		final=Math.floor(Math.random()*range)
// 	return final
	
	
// }



