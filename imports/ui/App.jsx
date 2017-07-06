import React, { Component } from 'react';
// import {Link, Route } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import {Posts} from '../api/blogs.js'
// App component - represents the whole app
const navbar =  {};
navbar.brand = 
  {linkTo: "#", text: "Hoe Or No!"};
 navbar.title = {
 	linkTo: "/home"
 }
navbar.links = [
	{linkTo: "/repos", text: "repos"},
    {linkTo: "/about", text: "about"}
  ]

export default class App extends Component {
		constructor(props){
		super(props)
		this.state = {
			hideCompleted:false
		}
	}
	getInitilState(){
		return{
			response:undefined
		}
	}
	getPosts(input){
		input.then(respons=>{	
			return respons
		})
	}
	
	renderPosts(){
		// Check if props is defined
		console.log(this.props.posts)
		let blogs = this.props.posts;
		return blogs.map((blog, index)=>
			<div key={index}>
				<h1 key={index}>{blog.object.title}</h1>
				<img src={blog.object.featured_image} style={{height:100+'px'}}/>
			
				<p>{blog.object.featured_image}</p>
			</div> 
		)
		// if(this.props.posts.length !== 0){
		// 	return(
		// 		<p>{this.props.posts.object.title}</p>
		// 			)
		// }

		// console.log(this.props.posts[0].object)
	
			// .map((c)=>{console.log(c)}))
		// console.log(this.props.posts[1].object.author)
	// }
	}

	componentWillMount(){
	// 	let that = this;
	// 	ButterList.then(function(data){		// .data 
	// 	// this.getPosts(Resp);
	// 	data.data.data.map((obj)=>{Meteor.call('add-entry',obj)})
	// 	console.log(data.data.data)
	// })
		// console.log(this.props.posts.find().fetch())
	}

	
	// render(){

	// 		// console.log(Resp)

	render(){
		return(
		 <div>
		 {this.renderPosts()}

		 <Navbar brand={navbar.brand} links={navbar.links}/>
		 	

		</div>
// 
		)
	}// }


}
