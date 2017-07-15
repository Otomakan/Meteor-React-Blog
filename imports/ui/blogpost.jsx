import React, {Component} from 'react'
import {Posts} from '../api/blogs.js'

export default class BlogPost extends Component {

	constructor(props){
		super(props)
		if(this.props.location.state){
			this.state={
				title: this.props.location.state.title,
				image: this.props.location.state.image,
				content: 'content',
				post: 'post'
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

		// let blogpost = 
		//  {limit: 1}).fetch()
		// if(index < arra)
		// console.log(typeof blogpost)
		// console.log(blogpost[0])
		// switch(ask){
		// 	case 'slug':
		// 		return blogpost.map((blog)=> blog.slug)
		// 	case 'image'
		// 		return blogpost.map((blog)=> blog.slug)
		// 	case 'image'
		// 		return blogpost.map((blog)=> blog.slug)
		// 	case 'image'
		// 		return blogpost.map((blog)=> blog.slug)
		// 	case 'image'
		// 		return blogpost.map((blog)=> blog.slug)
				// return blogpost.filter((blog)=> blog[ask])
		// }
		return ' boo'
	}

	render(){
		return (
			<div className="blog-post">
				<div className="blog-image">
					<img src={this.state.image}/>
				</div>
			<h1>{this.state.title}</h1>
			</div> )
	}
}




// export default createContainer(()=>{
// 	Meteor.subscribe('posts')
// 	return {
// 		posts: 
// 	}
// },BlogPost)
