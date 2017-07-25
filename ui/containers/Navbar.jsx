import React, { Component } from 'react';
import Resp from '../../imports/api/blogs.js'
import {Link, Route } from 'react-router-dom'

// create classes
export default class Navbar extends Component{
  getLinks(linklist){
    let x=0;
    return linklist.map((link)=>{
        x++
        return <NavLink key={x} linkTo={link.linkTo} text={link.text}/>
  
    })
  }
  render(){
      return(
        <div id="navbar">
          <ul>{this.getLinks(this.props.links)} </ul>
        </div>
      )}
};



class NavLink extends Component{
  render(){
    return(
      <li><Link to={this.props.linkTo}>
      {this.props.text}
      </Link></li>
    );
  }
}

// set data
