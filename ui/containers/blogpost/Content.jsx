import React, {Component} from 'react'
import Image from '../../components/Image.jsx'

import ReactMarkdown from 'react-markdown'
// import Youtube from '../../components/Youtube.jsx'
// import MediaQuery from 'react-responsive'

// Customize the end of the src url to change the query type
export default class Content extends Component{
	constructor(props) {
	  super(props)
	  console.log(props.post.content)




	  this.state = { 
	  	picSize : Math.round(window.innerHeight*0.4),
	  	text: YoutubeParse(props.post.content)
	   }
	 
	}

	componentWillMount(){
	   YoutubeParse(this.props.post.content)	
	   this.getWindowSize()	
	}

	componentWillReceiveProps(nextProps){		
	 	this.setState({
	 	text: YoutubeParse(nextProps.post.content)
	 })
	}

	getWindowSize(){
		console.log(window.innerWidth)
		this.setState({width: window.innerWidth, height: window.innerHeight})
	}

	render(){
		return(
			<div className="blog-content">
				<div className="blog-image">
					<div className="blog-image-container">
						<Image src={this.props.post.image} height={this.state.picSize} width={this.state.picSize}/>
					</div>
					<div className="title">
						<h1>{this.props.post.title}</h1>
					</div>
				</div>

					<h3> A blog by  {this.props.post.author}</h3>
					<h2> {this.props.summary}</h2>
				<div className="section">
				<ReactMarkdown source={this.state.text}/>
			
				</div>
			</div>
			)
	}
}


//Use the YoutubeParse function to embed youtube links.
function YoutubeParse(toParse){
		if(toParse){		
	  	  let youtubeReg = /(https:\/\/www.youtube.com\/)(watch\?v=)+([0-9]|[A-z]){11}/g

		  let youtubeArray =  toParse.match(youtubeReg)
		  let finalText = toParse
		  if(youtubeArray){
			  for(let x=0; x<youtubeArray.length;x++){
			  	 let replacementLink = youtubeArray[x].replace(/watch\?v=/, 'embed/')

			 	 finalText = finalText.replace(/(https:\/\/www.youtube.com\/)(watch\?v=)+([0-9]|[A-z]){11}/, '<iframe width="720" height="515" src="'+replacementLink+'" frameborder="0" allowfullscreen></iframe>')
			  }
		 	}
		 	return finalText
		 }
		 return toParse

	}