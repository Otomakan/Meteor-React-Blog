import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
// import {Package} from 'meteor/package'
import Routes from './routes.jsx'

Meteor.startup(() => {
	render(<Routes />, document.getElementById('render-target'))
})
// Package.onUse(function (api) {
  
  // api.use('fourseven:scss');
  
// });