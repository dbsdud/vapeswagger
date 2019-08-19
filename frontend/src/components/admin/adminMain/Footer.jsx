import React from 'react';
import { Component,Fragment } from 'react';

class Footer extends Component{
    render(){
        return (
        <Fragment>
            <footer className="adminFooter" >
                <div className="adminContainer adminText-right">
                    Copyright ⓒ 데이터분석과, All rights reserved.
                </div>
            </footer>
        </Fragment>
        )
    }
}
export default Footer