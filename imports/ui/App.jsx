import React, { Component } from 'react';
// import {Link, Route } from 'react-router-dom'

import {Posts} from '../api/blogs.js'
import {Route} from 'react-router-dom'

import Navbar from './Navbar.jsx'
import Home from './home.jsx'
import Repos from './Repos.jsx'
import About from './About.jsx'
import BlogPost from './blogpost.jsx'

import RaisedButton from 'material-ui/RaisedButton'



const navbar =  {};
navbar.brand = 
  {linkTo: "#", text: "Hoe Or No!"}
 navbar.title = {
 	linkTo: "/home"
 }
navbar.links = [
	{linkTo: "/repos", text: "repos"},
    {linkTo: "/about", text: "about"},
    {linkTo: "/", text: "Home"}
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
	
	findPost(){

	}
	
	componentWillMount(){

	
	// 	let that = this;
	// 	data.data.data.map((obj)=>{Meteor.call('add-entry',obj)})
	// 	console.log(data.data.data)
	// })
		// console.log(this.props.posts.find().fetch())
	}

	

	render(){
		return(
		<div>

			<Navbar brand={navbar.brand} links={navbar.links}/>

			<Route path="/about" component={About}/>
			<Route path="/repos" component={Repos}/>
			<Route path="/blog/:slug" component={BlogPost} posts={this.props.posts}/>
			<PropsRoute exact path="/" component={Home} 
			posts={this.props.posts}/>
	
		</div>
		)
	}// }


}

// <h1 key={index}>{blog.object.title}</h1>
// 				<img src={blog.object.featured_image} style={{height:100+'px'}}/>
			
// 				<p>{blog.object.featured_image}</p>



// These two const allow to render react  classes and not have to create an object to render which refers to a component
const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
	console.log(...rest)
  	return (
    	React.createElement(component, finalProps)
  	);
}

const PropsRoute = ({ component, ...rest }) => {
  return (

    <Route {...rest} render={routeProps => {

      return renderMergedProps(component, 
      	routeProps, //I dont' know why this is here it can be removed
      	 rest);
    }}/>
  );
}