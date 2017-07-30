import React, { Component } from 'react';
import Resp from '../../imports/api/blogs.js'
import {Router, Route, IndexRoute, browserHistory } from 'react-router'
import {Paper} from 'material-ui'
import {Link} from 'react-router-dom'


import { createContainer } from 'react-meteor-data'


import PropTypes from 'prop-types'
import { Posts } from '../../imports/api/blogs.js'

import Image from '../components/Image.jsx'
import BigStoryLoader from '../components/BigStoryLoader.jsx'

// App component - represents the whole app

class Home extends Component {
	constructor(props){
		super(props)
		this.state={
			numberOfImagesLoaded :0,
			displayLoader: true,
			loaderOpacity:1,
		}
	}
	renderRightSize(index,blog){
		return (index===3) ? <Image src={blog.featuredImage.fields.file.url} height='1000' width='1000'/>:
		<Image src={blog.featuredImage.fields.file.url} height='400' width='400'/>
	}
	renderPosts(){
		let blogs = this.props.posts;
		// Map of the 6 latest blog postsloaded in Apps jsx only way to do it otherwise you get an empty array at first shot and everything shuts down
		if(blogs){
		let blogmap = blogs.map((blog, index)=>{
			var linkTo = "blog/"+ blog.fields.slug
			blog=blog.fields
			let content = {
				title: blog.title,
				image: blog.featuredImage.fields.file.url||'no-image',
				author: blog.author[0].fields.name,
				created: blog.created,
				tags: blog.tags,
				summary:blog.summary,
				body: blog.body,
				slug: blog.slug
			}
			return (
				<Link  key={index} imageLoaded={this.imageLoaded()} className="home-left"to={{pathname: linkTo, 
					state: content}}  
				style={{textDecoration: 'none', color: 'white'}}>
					<Paper>
					{this.renderRightSize(index,blog)}
					 <h1>{blog.title}</h1>
					
					</Paper>
				</Link>
				) 
		})
		console.log(blogmap)
		return blogmap
	}
}
	imageLoaded(){
		this.state.numberOfImagesLoaded +=1;
		if(this.state.numberOfImagesLoaded===5){
			this.setState({loaderOpacity:0})
			setTimeout(()=>{this.setState({displayLoader:false})},800)
		}		
	}

	displayBigStoryLoader(){
		setTimeOut(()=>{
			if (this.state.numberOfImagesLoaded >=4){
				return
			}
		},4000)

		if (this.state.numberOfImagesLoaded <7)
			return 
	}
	render(){
		// console.log(this.state.numberOfImagesLoaded)
		return (
			<div>
				<div className="container">
					 <div className="home-header">
					 {this.renderPosts()}
					 </div>
				</div>
				<div>
				<BigStoryLoader display={this.state.displayLoader} loaderOpacity={this.state.loaderOpacity}/>
				</div>

			</div>
		)
	
	}
}

export default createContainer(()=>{
	let handle = Meteor.subscribe('posts')
	if(handle.ready()){
		
	}
	return {
		posts: Posts.find({}, {limit: 6}).fetch(),
		dataReady: true
	}
},Home)
