


import React, {Component} from 'react'
import {Posts} from '../../../imports/api/blogs.js'

import { createContainer } from 'react-meteor-data'
import Content from './Content.jsx'
import {Link} from 'react-router-dom'

import MorePosts from '../../components/MorePosts.jsx'

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
				componentDidMount:false,
			}	
		}
		else{
			this.state={
				title: 'who cares',
				image: null,
				content: null,
				post: null,		
				componentDidMount:false,
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
		if(props.location.state){
			console.log('fetching')
			this.displayPreviousProps(props.location.state)
		}
		//if it is a direct link go use the db data
		else{
			this.displayFetchedPost(props.blogpost[0].fields)
		}
	
	}
	displayPreviousProps(blogpost){
		console.log(blogpost)
		this.setState({
			title: blogpost.title || null,
			image: blogpost.featuredImage.fields.file.url || null,
			content: blogpost.body || null,
			author: blogpost.author[0].fields.name|| null,
			slug: blogpost.slug || null,
			_id: blogpost._id || null,
		})

	}

	
	displayFetchedPost(post){
		this.setState({
			title: post.title||"Post not Found :(",
			image: post.featuredImage.fields.file.url || 'nop',
			content: post.body || "Try looking some other amazing recipes",
			author:  post.author[0].fields.name || 'No Author',			
			_id: post._id || null
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
		console.log('next post')
		let blog = this.props.relatedPosts[0].fields
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
	componentDidMount(){
		this.setState({componentDidMount:true})
	}
	componentWillMount(){
		this.setState({componentDidMount:false})
	}
	showMorePost(){
		console.log(this.state.componentDidMount)
		console.log(this.state)
		return (this.props.blogpost[0])? <MorePosts currentPost={this.props.blogpost[0]._id}/> : (this.state._id)?  <MorePosts currentPost={this.state._id}/> : null
	}

	// If the data fatched is ready this will display a link to the next post
	// Related Post not Found
	render(){
		// If we get stuff from the props we might as well use them if not then we go use the data we fetched
		return (this.props.location.state) ? 
		<div className="blog-post">
			<Content post={this.state}/>
			{this.showMorePost()}
		</div> 
		: (this.props.dataReady)? 
		<div className="blog-post">
			<Content post={this.state}/>
			<h1> Data Ready</h1>
			<h3> A blog by {this.state.author}</h3>			
			{this.showMorePost()}
		</div> : 
		<div className="blogpost"> 
			<h1> We can't find anything at this address unfortunately </h1>
			<h1>Sorry for your trouble!</h1>
		</div> 
	}
	
}





export default BlogPostContainer = createContainer((props)=>{
	let handle = Meteor.subscribe('posts')
	let relatedPosts =null
	
	let slugIndex = window.location.href.lastIndexOf("/")+1;
	let currentSlug = window.location.href.substr(slugIndex)
	
	let doc = Posts.find({"fields.slug": currentSlug || props.match.params.slug||props.location.state.slug}).fetch()

	return {
		dataReady: handle.ready(),
		blogpost:  doc ? doc : null
	}
},BlogPost)

