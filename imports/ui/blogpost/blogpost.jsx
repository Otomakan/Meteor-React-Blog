


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
			console.log('blogpost')
			console.log(blogpost)
			console.log('existing location state')
			this.state={
				title: blogpost.title || null,
				image: blogpost.image || null,
				content: blogpost.body || null,
				author: blogpost.author|| null,
				slug: blogpost.slug || null,
				// created: blog.created,
				// tags: blog.tags,
				// summary:blog.summary
				nextPostslug: ''
			}	
		}
		else{
			this.state={
				title: 'who cares',
				image: null,
				content: null,
				post: null,				
				nextPostslug: ''
			}	
		}	
	}
	componentWillMount(){
	}
	//Collect the data from the create container
	componentWillReceiveProps(props){
		console.log(props.match.params.slug+ ' : ' + this.state.slug)
		if(props.match.params.slug=== this.state.slug){
			console.log('same slug')
			return

		}
console.log(props.relatedPosts)
		console.log('getting props')
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
			this.nextPostSlug(props.relatedPosts[0])
		}
		
	}
	nextPostSlug(post){
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
			image: post.featuredImage.fields.file.url || 'nop',
			content: post.body || "Try looking some other amazing recipes",
			author:  post.author[0].fields.name || 'No Author'
		})

	}


	findPrev(ask){
	
	}
	componentWillUnmount(){
		console.log('unomounting')
		this.setState({

		})
	}

	nextPost(){
		console.log(this.props.relatedPosts)
		let blog = this.props.relatedPosts[0]
		console.log(this.props.relatedPosts[0])
		return 	 {
				title: blog.title,
				image: blog.featuredImage.fields.file.url||'no-image',
				author: blog.author[0].fields.name,
				created: blog.created,
				tags: blog.tags,
				summary:blog.summary,
				body: blog.body,
				slug: blog.slug
			}
	}
	aboutLink(){
		console.log(this.props.relatedPost)
		return (this.props.relatedPost)? 
		<Link  to={{pathname: this.state.nextPostslug, state: this.nextPost()}}>About</Link>
				: <Link  to={{pathname: this.state.nextPostslug}}>About</Link>

	}

	render(){
		return (this.props.dataReady) ? 
			<div className="blog-post">
				<h3> A blog by {this.state.author}</h3>
				{this.aboutLink()}

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
	// console.log(handle)
	if(handle.ready()){

	console.log(doc[0])
		relatedPosts = findRelatedPosts(Posts, 'food', 1, doc[0]._id)
	}
	// console.log(Posts.count())
	let hasnex = Posts.find({'slug':props.match.params.slug})
	console.log(relatedPosts)

	// console.log(relatedPosts)
	return {
		dataReady: handle.ready(),
		blogpost:  doc ? doc : null,
		relatedPosts : relatedPosts ? relatedPosts : null
	}
},BlogPost)


function findRelatedPosts(db, tags, numbPostsNeeded, excludeIds){
	let final =[]
	 sameTagsPosts= db.find({'tags': tags, _id: {$ne:excludeIds}},{limit:30}).fetch()
	
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