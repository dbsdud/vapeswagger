import React from 'react';
import { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
import userIcon from '../../images/userIcon.png';
class Top extends Component{
    // state={
    //     agree1 : document.getElementById("agree1").checked,
    //     agree2 : document.getElementById("agree2").checked
    // }
    sidebarOpen(){
        document.getElementById("mainSidebar").style.display="block";
	    document.getElementById("mainOverlay").style.display="block";
    }
    
    // agreeChk(){
    //     if(this.state.agree1===true && this.state.agree2===true){
    //         location.href="/signForm.do"
    //     }
    // }
    render(){
        return (
            <Fragment>
                <header id="header" className="content">
                    <div id="header-top" className="top bar card indigo padding" style={{zIndex: 999}}>
                        <div className="col s4">
                            <a href="javascript:void(0)" className="left button large" onClick={this.sidebarOpen.bind(this)} >☰</a>
                            {/* onclick="sidebarOpen()" */}
                        </div>
                        <div className="col s4 center">
                            <Link to={"/"}><div>logo</div></Link>
                        </div>
                        <div className="col s4">
                            <div className="right button small">
                                <img src={userIcon} className="userIcon" />
                            </div>
                        </div>
                        <div><input type="text" placeholder="검색" className="searchMain" /></div>
                    </div>
                    
                </header>
              <SideBar />
            </Fragment>
        )
    }
}

export default Top;