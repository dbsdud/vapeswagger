import React from 'react';
import { Component,Fragment } from 'react';

class PageError extends Component{

    render(){
        return(
            <Fragment>
            <div>
                <img style={{width:"100%",paddingTop:114}} src="https://via.placeholder.com/300x200" alt=""/>
            </div>
            <div style={{margin:100}}> 
                PAGE NOT Found
            </div>
            </Fragment>
        )
    }
}

export default PageError