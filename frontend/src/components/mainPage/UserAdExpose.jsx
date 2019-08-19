import React from 'react';
import { Component,Fragment } from 'react';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
class UserAdExpose extends Component{
    state = {
        aDTO:{
            adNo:'',
            adTitle:'',
            adEnable:'',
            adClick:'',
            adImg:'',
            adLink:'',
        },
        showIndex: false,
        showBullets: true,
        infinite: true,
        showThumbnails: false,
        showFullscreenButton: false,
        showGalleryFullscreenButton: false,
        showPlayButton: false,
        showGalleryPlayButton: true,
        showNav: true,
        isRTL: false,
        slideDuration: 450,
        slideInterval: 2000,
        slideOnThumbnailOver: false,
        thumbnailPosition: 'bottom',
        showVideo: {},
    }
    componentDidMount(){
        this._imageGallery.play();
    }
    
    render() {

      let images=[]
      this.props.adExposeList.map(function(adRow,index){
            return images.push({original:adRow.adImg});
        });

        return (
        <Fragment>
            <div style={{position:"relative",paddingTop:10}}>
            <ImageGallery 
            ref={i => this._imageGallery = i}
            items={images} 
            showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton} 
            showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton} 
            showThumbnails={this.state.showThumbnails}/>
            </div>
        </Fragment>
           
        );
    }

}


export default UserAdExpose;