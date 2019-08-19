import React from 'react';
import { Component,Fragment } from 'react';

class Footer extends Component{
    render(){
        return (
        <Fragment>
            <div className="mainFooter" >
                <div className="mainFooterTop">
                    <div>회사소개</div>
                    <div>광고안내</div>
                    <div>이용안내</div>
                    <div>개인정보취급방침</div>
                    <div>사이트문의</div>
                </div>
                <div className="mainFooterBottom">Copyright ⓒ 데이터분석과, All rights reserved.</div>
            </div>
        </Fragment>
        )
    }
}
export default Footer