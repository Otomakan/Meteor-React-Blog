
import React, {Component} from 'react'

export default class Image extends Component {

 constructor(props){
    super(props)
    this.state={
      imageStatus: 'image'
    }
 }

  onImageLoaded() {
      this.setState({ imageStatus: 'image image-loaded' });
      if(this.props.imageLoaded){
        this.props.imageLoaded()
      }
  }
  onImageError(){
    return
  }


  render() {
 
    return (
      <img ref="img" alt="no-alt-yet" src={this.props.src} className={this.state.imageStatus} onLoad={this.onImageLoaded.bind(this)} onError={this.onImageError}/>
    );
  }
};
