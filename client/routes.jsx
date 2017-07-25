import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { BrowserRouter, Switch,Route, Router} from 'react-router-dom';
// import { Route, Router } from 'react-router'
import { Meteor } from 'meteor/meteor'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


import App from '../ui/containers/App.jsx'

import { Posts } from '../imports/api/blogs.js'
// const browserHistory = createBrowserHistory();


import { createContainer } from 'react-meteor-data'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



 export default class Routes extends Component {
 	constructor(props){
 		super(props)
 		this.state = {
 			loading: true
 		}
 	}
 	componentWillMount(){
 		// console.log(this.props.posts)
 	}


	componentDidMount(){
		this.setState({loading:false});
		// alert('to');
	}
	render(){
		// This waits or componentdidmount to be ready a displays loaders until components ready
		if(this.state.loading)
			return null

		return(
		<BrowserRouter>
			<MuiThemeProvider>
		 	<App />	 		
			</MuiThemeProvider>
		</BrowserRouter>
		 )
}
}


 // Routes.propTypes ={
 // 	posts: PropTypes.array.isRequired,
 // }


// export default createContainer(()=>{
// 	handle = Meteor.subscribe('posts')

// },Routes)
