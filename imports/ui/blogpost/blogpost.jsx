


import React, {Component} from 'react'
import {Posts} from '../../api/blogs.js'

import { createContainer } from 'react-meteor-data'
import Content from './Content.jsx'
import {Link} from 'react-router-dom'

class BlogPost extends Component {

	constructor(props){
		super(props)
		if(this.props.location.state){
			let blogpost = this.props.location.state;
			console.log(blogpost.title)
			this.state={
				title: blogpost.title || 'no-title',
				image: blogpost.image || 'empty',
				content: blogpost.body || 'alternative',
				// author: blog.author,
				// created: blog.created,
				// tags: blog.tags,
				// summary:blog.summary
				nextPostslug: ''
			}	
		}
		else{
			this.state={
				title: null,
				image: null,
				content: null,
				post: null,				
				nextPostslug: ''
			}	
		}	
	}
	componentWillMount(){
		console.log(this.props)
	}
	//Collect the data from the create container
	componentWillReceiveProps(props){
		console.log(props.blogpost[0].tags)
		console.log(props.relatedPosts)
		let that = this
			// Something strang happening if I put else statement aroung the post display a correct sluf search calls unknownPost
		if( !props.dataReady )
			this.noDataAccess()
		
		//If 
		else if( props.blogpost.length===0 )
			this.unknownPost()
		
		//display bldog post if data is ready and if didnt return empty array.  
		else{
			this.displayPost(props.blogpost[0]);
			this.nextPost(props.relatedPosts[0])
		}
		
	}
	nextPost(post){
		this.setState({
			nextPostslug: post.slug
		})
	}
	noDataAccess(){
		this.setState({
				title: "Cant fetch data :(",
				image: '',
				content: "Try looking some other amazing recipes"
			})
	}

	unknownPost(){
		console.log('unknown')
		this.setState({
				title: "Post not Found :(",
				image: '',
				content: "Try looking some other amazing recipes"
			})
	}
	
	displayPost(post){
		this.setState({
			title: post.title||"Post not Found :(",
			image: post.featured_image,
			content: post.body || "Try looking some other amazing recipes"
		})

	}


	findPrev(ask){
	
	}
	componentWillUnmount(){
		console.log('unomounting')
		this.setState({

		})
	}


	render(){
		// console.log(this.props.blogpost)\
		// if(this.props.blogpost !== undefined && this.props.blogpost !== null){
		// console.log(this.props.blogpost)
		return this.props.dataReady ? 
			<div className="blog-post">
				<Link to={{pathname: this.state.nextPostslug, text:'about'}}>About</Link>
				<Content post={this.state}/>

			</div> 
		: <div className="blogpost"> <h1> yoooooooooo</h1><h1>fdsfd</h1></div>
	}

	
}





export default BlogPostContainer = createContainer((props)=>{
	let handle = Meteor.subscribe('posts')
	let relatedPosts
	let doc = Posts.find({slug: props.match.params.slug}).fetch()
	// .fetch()
	console.log(handle)
	if(handle.ready()){
		relatedPosts = findRelatedPosts(Posts, 'food', 1, doc[0]._id)
	}
	// console.log(Posts.count())
	let hasnex = Posts.find({'slug':props.match.params.slug})

	console.log(relatedPosts)
	return {
		dataReady: handle.ready(),
		blogpost:  doc ? doc : null,
		relatedPosts : relatedPosts ? relatedPosts : null
	}
},BlogPost)


function findRelatedPosts(db, tags, numbPostsNeeded, excludeIds){
	let final =[]
	 sameTagsPosts= db.find({'tags.name': tags, _id: {$ne:excludeIds}},{limit:30}).fetch()
	
	//gets a random 
	let exception=[-1]
	for(let x=0; x<numbPostsNeeded; x++){
		let tagNum = getRandomIntExpt(sameTagsPosts.length, exception)
		exception.push(tagNum)
		final.push(sameTagsPosts[tagNum])
	}
	console.log(final)
	
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