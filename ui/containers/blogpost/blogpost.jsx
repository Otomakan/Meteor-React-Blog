


import React, {Component} from 'react'
import {Posts} from '../../../imports/api/blogs.js'

import { createContainer } from 'react-meteor-data'
import Content from './Content.jsx'
import {Link} from 'react-router-dom'

class BlogPost extends Component {

	constructor(props){
		super(props)
		if(this.props.location.state){
			let blogpost = this.props.location.state;
			this.state={
				title: blogpost.title || null,
				image: blogpost.image || null,
				content: blogpost.body || null,
				author: blogpost.author|| null,
				slug: blogpost.slug || null,
				// created: blog.created,
				// tags: blog.tags,
				// summary:blog.summary
				nextPost:{
					title: null,
					image: null,
					author: null,
					created: null,
					tags: null,
					summary: null,
					body: null,
					slug: null
				}
			}	
		}
		else{
			this.state={
				title: 'who cares',
				image: null,
				content: null,
				post: null,				
				nextPost:{
					title: null,
					image: null,
					author: null,
					created: null,
					tags: null,
					summary: null,
					body: null,
					slug: null
				}
			}	
		}
	}

	componentWillMount(){
	}
	//Collect the data from the create container
	componentWillUpdate(){
		// console.log('componentWillUpdate')
	}
	componentWillReceiveProps(props){
		//Displays the current post and gets the next one. This doesn't make great use of the props
		// console.log(props.location.state)
		//Check if it is a direct link if not display the props thanks to the previous loading of the post
		if(props.location.state)
			this.displayPreviousProps(props.location.state)
		//if it is a direct link go use the db data
		else
			this.displayFetchedPost(props.blogpost[0])

		//Load future posts Maybe put that later in the app.
			this.nextPostSlug(props.relatedPosts[0])

		// console.log(props.match)
		// console.log(props.match.params.slug+ ' : ' + this.state.slug)
		// if(props.match.params.slug=== this.state.slug){
		// 	console.log('same slug')

		// 	this.nextPostSlug(props.relatedPosts[0])
		// 	return
		// }

		// else if( props.blogpost.length===0 )
		// 	this.unknownPost()
		
		// //display bldog post if data is ready and if didnt return empty array.

		// else{
		// 	this.displayPost(props.blogpost[0]);
		// 	this.nextPostSlug(props.relatedPosts[0])
		// }
	

		
	}
	displayPreviousProps(blogpost){
		this.setState({
			title: blogpost.title || null,
			image: blogpost.image || null,
			content: blogpost.body || null,
			author: blogpost.author|| null,
			slug: blogpost.slug || null,
		})

	}

	nextPostSlug(blog){
		this.setState({
			nextPost:{
				title: blog.title,
				image: blog.featuredImage.fields.file.url||'no-image',
				author: blog.author[0].fields.name,
				created: blog.created,
				tags: blog.tags,
				summary:blog.summary,
				body: blog.body,
				slug: blog.slug
			}
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
	
	displayFetchedPost(post){
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
		// console.log(this.props.relatedPosts)
		let blog = this.props.relatedPosts[0]
		// console.log(this.props.location.state.title)
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

	// If the data fatched is ready this will display a link to the next post
	aboutLink(){
	

		console.log(this.props.location.state)
		return (this.state.nextPost)? 
		<Link  to={{pathname: this.state.nextPost.slug, state: this.state.nextPost}}>About</Link>
				: <Link  style={{background:'blue'}}to={{pathname: this.state.nextPost.slug}}>Aboutee</Link>

	}
	// Related Post not Found
	noRelatedPosts(){
		return <h3> We could not find related Posts</h3>
	}

	render(){
		// If we get stuff from the props we might as well use them if not then we go use the data we fetched
		return (this.props.location.state) ? 
			<div className="blog-post">
				<h1> This props location state</h1>
				<h3> A blog by  {this.state.author}</h3>
				{(this.props.relatedPosts)? this.aboutLink(): this.noRelatedPosts()}

				<Content post={this.state}/>


			</div> 
		: (this.props.dataReady)? <div className="blog-post">
				<h1> Data Ready</h1>
				<h3> A blog by {this.state.author}</h3>
				{this.aboutLink()}

				<Content post={this.state}/>


			</div> : <div className="blogpost"> <h1> We can't find anything at this address unfortunately </h1><h1>Sorry for your trouble!</h1></div> 
	}

	
}





export default BlogPostContainer = createContainer((props)=>{
	let handle = Meteor.subscribe('posts')
	let relatedPosts
	
	let slugIndex = window.location.href.lastIndexOf("/")+1;
	let currentSlug = window.location.href.substr(slugIndex)
	
	let doc = Posts.find({slug: currentSlug || props.match.params.slug||props.location.state.slug}).fetch()
	// .fetch()
	if(handle.ready() && doc[0] && doc[0].tags){
		relatedPosts = findRelatedPosts(Posts, 'food', 1, doc[0]._id)
	}
	// console.log(Posts.count())
	let hasnex = Posts.find({'slug':props.match.params.slug})
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