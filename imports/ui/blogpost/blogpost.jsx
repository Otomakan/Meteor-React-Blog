import React, {Component} from 'react'
import {Posts} from '../../api/blogs.js'

import { createContainer } from 'react-meteor-data'
import Content from './Content.jsx'

class BlogPost extends Component {

	constructor(props){
		super(props)
		if(this.props.location.state){
			let blogpost = this.props.location.state;
			console.log(blogpost.title)
			this.state={
				title: blogpost.title,
				image: blogpost.image,
				content: blogpost.body || 'alternative'
				// ,
			
				// author: blog.author,
				// created: blog.created,
				// tags: blog.tags,
				// summary:blog.summary
			}	
		}
		else{
			let blog = this.findPost(this.props.match.params.slug)
			console.log(blog)
			this.state={
				title: ' Yooooo',
				image: null,
				content: 'content',
				post: 'post'
			}	
		}	
	}
	componentWillMount(){

	}
	findPost(ask){
		return Posts.find({'slug': ask}).fetch()


		// }
		return ' boo'
	}

	render(){
		// console.log(this.props.blogpost)\
		if(this.props.blogpost !== undefined && this.props.blogpost !== null){
		// console.log(this.props.blogpost)
		return (
			<div className="blog-post">
				
				<Content post={this.state}/>

			</div> 
		)
		}
		else
			return
	}
}




export default BlogPostContainer = createContainer((props)=>{
	let doc = Posts.find({'slug': props.match.params.slug}).fetch()
	let hasnex = Posts.find({'slug':props.match.params.slug});
	console.log(hasnex)
	return {
		blogpost:  doc ? doc : null
	}
},BlogPost)
