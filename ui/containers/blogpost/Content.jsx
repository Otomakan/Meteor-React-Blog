import React, {Component} from 'react'
import Image from '../../components/Image.jsx'
// import MediaQuery from 'react-responsive'

// Customize the end of the src url to change the query type
export default class Content extends Component{
	constructor(props) {
	  super(props)
	  this.state = { picSize : Math.round(window.innerWidth*0.55) }
	}

	componentWillMount(){		
	  this.getWindowSize()
	  console.log(this.state);
	}

	getWindowSize(){
		console.log(window.innerWidth)
		this.setState({width: window.innerWidth, height: window.innerHeight})
	}


	render(){
		return(
			<div>
				<div className="blog-image">
						<Image src={this.props.post.image} height={this.state.picSize} width={this.state.picSize}/>
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