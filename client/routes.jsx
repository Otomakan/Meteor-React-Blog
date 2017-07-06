import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { BrowserRouter, Switch,Route, Router} from 'react-router-dom';
// import { Route, Router } from 'react-router'
import { Meteor } from 'meteor/meteor'

import Home from '../imports/ui/home.jsx'
import App from '../imports/ui/App.jsx'
import Repos from '../imports/ui/Repos.jsx'
import {About} from '../imports/ui/About.jsx'

import { Posts } from '../imports/api/blogs.js'
// const browserHistory = createBrowserHistory();


import { createContainer } from 'react-meteor-data'




 class Routes extends Component {
 	componentWillMount(){
 		// console.log(this.props.posts)
 	}
	render(){
		return(
	<BrowserRouter>

			<div>
	 	<App posts={this.props.posts}/>
		<Route path="/about" component={About}/>

		<Route path="/repos" component={Repos}/>

		<Route path="/home" component={Home}/>
	 </div>
</BrowserRouter>
	 )
}
}


 Routes.propTypes ={
 	posts: PropTypes.array.isRequired,
 }


export default createContainer(()=>{
	Meteor.subscribe('posts')
	return {
		posts: Posts.find().fetch()
	}
},Routes)
