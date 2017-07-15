import React, { Component } from 'react';
import Resp from '../api/blogs.js'
import {Router, Route, IndexRoute, browserHistory } from 'react-router'
import {Paper} from 'material-ui'
import {Link} from 'react-router-dom'
// App component - represents the whole app

export default class Home extends Component {

	renderPosts(){
		let blogs = this.props.posts;
		console.log(blogs)
		// Map of the 6 latest blog postsloaded in Apps jsx only way to do it otherwise you get an empty array at first shot and everything shuts down
		return blogs.map((blog, index)=>{
			var linkTo = "blog/"+ blog.slug
			let content = {
				title: blog.title,
				image: blog.featured_image
			}
			return (
				<Link  key={index} className="home-left"to={{pathname: linkTo, 
					state: content}}  
				style={{textDecoration: 'none', color: 'white'}}>
					<Paper>

					<img src={blog.featured_image}/>
					 <h1>{blog.title}</h1>
					</Paper>
				</Link>
				) 
		})
	}
	
	


	componentWillMount(){
		// let bar = this.getPosts(Resp).then(()=>console.log(bar))
	}
	render(){
		return(
			<div className="container">
				 <div className="home-header">
				 {this.renderPosts()}
				 </div>

			</div>
		)
	}
}