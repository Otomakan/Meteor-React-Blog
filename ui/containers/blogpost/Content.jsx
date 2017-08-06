import React, {Component} from 'react'
import Image from '../../components/Image.jsx'

// Customize the end of the src url to change the query type
export default class Content extends Component{
	render(){
		return(
			<div>
				<div className="blog-image">
						<Image src={this.props.post.image} height="400" width="400"/>
					<h1>{this.props.post.title}</h1>
				</div>
					<h2> {this.props.summary}</h2>
				<div className="section">
				<p><div dangerouslySetInnerHTML= 
				{{__html: this.props.post.content}}/></p>
				</div>
			</div>
			)
	}
}