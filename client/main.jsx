import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
// import {Package} from 'meteor/package'
import AppContainer from './AppContainer.jsx'

Meteor.startup(() => {
	render(<AppContainer />, document.getElementById('render-target'))
})
// Package.onUse(function (api) {
  
  // api.use('fourseven:scss');
  
// });