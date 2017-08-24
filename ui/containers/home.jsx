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
			picSize:  Math.round(window.innerHeight*0.4),
		}
		this.imageLoaded = this.imageLoaded.bind(this)
	}
	renderRightSize(index,blog){
		return (index===3) ? <Image src={blog.featuredImage.fields.file.url} height='1000' width='1000' onImageLoaded={this.imageLoaded}/>:
		<Image src={blog.featuredImage.fields.file.url} height={this.state.picSize} width={this.state.picSize} onImageLoaded={this.imageLoaded}/>
	}
	renderPosts(){
		let blogs = this.props.posts;
		// Map of the 6 latest blog postsloaded in Apps jsx only way to do it otherwise you get an empty array at first shot and everything shuts down
		if(blogs){
		return blogs.map((blog, index)=>{
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
			console.log(content)
			return (
				<Link  key={index}  className="home-left"to={{pathname: linkTo, 
					state: content}}  
				style={{textDecoration: 'none', color: 'white'}}>
					{this.renderRightSize(index,blog)}
					 <h1>{blog.title}</h1>
					
				</Link>
				) 
		})
		}
	}

	imageLoaded(){
		console.log(this.state.picSize)
		this.state.numberOfImagesLoaded +=1;
		if(this.state.numberOfImagesLoaded===5){
			this.setState({loaderOpacity:0})
			setTimeout(()=>{this.setState({displayLoader:false})},1800)
		}		
	}

	displayBigStoryLoader(){
		setTimeout(()=>{
			if (this.state.numberOfImagesLoaded >=4){
				return
			}
		},4000)

		if (this.state.numberOfImagesLoaded <7)
			return	}
	render(){
		// console.log(this.state.numberOfImagesLoaded)
		return (
			<div>
			 <BigStoryLoader loaderOpacity={this.state.loaderOpacity} display={this.state.displayLoader}/>
				<div className="container">
					 <div className="home-header">
					 {this.renderPosts()}
					 </div>
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
