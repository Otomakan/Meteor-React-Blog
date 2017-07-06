import React, { Component } from 'react';
import Resp from '../api/blogs.js'
import {Router, Route, IndexRoute, browserHistory } from 'react-router'
// App component - represents the whole app

export default class Home extends Component {
	getPosts(input){
		// input.then(respons=>{	
		// 	return respons
		// })
	}
	
	renderPosts(){

	}

	componentWillMount(){
		// let bar = this.getPosts(Resp).then(()=>console.log(bar))
	}
	render(){

			// console.log(Resp)
		return(
		<div className="container">
			<header> My Blog </header>
			

		</div>

		)
	}


}