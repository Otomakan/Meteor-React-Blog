import React, { Component } from 'react';
import Resp from '../api/blogs.js'
import {Router, Route, IndexRoute, browserHistory } from 'react-router'
import {Paper} from 'material-ui'
// App component - represents the whole app

export default class Home extends Component {

	renderPosts(){
		// Check if props is defined
		console.log(this.props.posts)
		let blogs = this.props.posts;
		return blogs.map((blog, index)=>
			<Paper key={index} className="home-left">
				{blog.object.title}
			</Paper> 
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