import React, { Component } from 'react';
import Resp from '../api/blogs.js'
import {Router, Route, IndexRoute, browserHistory } from 'react-router'
import {Paper} from 'material-ui'
// App component - represents the whole app

export default class Home extends Component {

	renderPosts(){
		let blogs = this.props.posts;
		// Map of the 6 latest blog posts
		return blogs.map((blog, index)=>{
			console.log(blog.object.featured_image)

		
			
			return (<Paper key={index} className="home-left">

				<img src={blog.object.featured_image}/>
				<h1>{blog.object.title}</h1>
				</Paper>) 
		}
		);
	}


	componentWillMount(){
		// let bar = this.getPosts(Resp).then(()=>console.log(bar))
	}
	render(){
		return(
			<div className="container">
				<header> My Blog </header>
				 <div className="home-header">
				 {this.renderPosts()}
				 </div>

			</div>
		)
	}


}