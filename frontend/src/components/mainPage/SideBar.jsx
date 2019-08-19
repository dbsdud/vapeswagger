import React from 'react';
import { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';


class SideBar extends Component{
    constructor() {
        super();
        this.state = {
            shown: true,
            uDTO:''
        };
    }
    componentDidMount(){
        const sessionUserInfo = sessionStorage.getItem("uDTO");
        this.setState({
            uDTO:JSON.parse(sessionUserInfo)
        })
    }
    toggle() {
        this.setState({
            shown: !this.state.shown
        });
    }
    sidebarClose(){
        document.getElementById("mainSidebar").style.display="none";
        document.getElementById("mainOverlay").style.display="none";
    }
    moveLogin(){
        document.getElementById("mainSidebar").style.display="none";
        document.getElementById("mainOverlay").style.display="none";
    }
    logout(){
        sessionStorage.removeItem("uDTO")
        alert('로그아웃 되셨습니다.')
        window.location="/"
    }
  
    render(){
        var shown = {
            display: this.state.shown ? "block" : "none"
        };
        var hidden = {
            display: this.state.shown ? "none" : "block"
        };
        const { uDTO } = this.state;
        let loginMyPageRender = null;
        if(uDTO === null){
            loginMyPageRender=
            <Fragment>
                <Link className="sideBarTopLogin" to="/login" onClick={this.sidebarClose.bind(this)} style={{textDecoration:"none",cursor:"pointer"}}>
                LOGIN
                </Link>
                <Link className="sideBarTopJoin" to={"/join"} onClick={this.sidebarClose.bind(this)} style={{textDecoration:"none",cursor:'pointer'}}>
                회원가입
                </Link>
             
            </Fragment>
                 
        }else if(uDTO !== null){
            loginMyPageRender=
            <Fragment>
                <div className="sideBarTopLogin" onClick={this.logout.bind(this)} style={{cursor:'pointer'}}>
                    LOGOUT
                </div>
                <Link className="sideBarTopJoin" onClick={this.sidebarClose.bind(this)} to={'/mypageEnter'} style={{textDecoration:"none",}} >
                    마이페이지  
                </Link>
            </Fragment>
        }
        return(
            <Fragment>
                <nav id="mainSidebar" className="sidebar bar-block white animate-left collapse2" style={{zIndex:999}}>
                    <div className="sideBarTop">
                        <div className="sideBarTopTitle">                            
                            <div onClick={this.sidebarClose.bind(this)} style={{cursor:'pointer'}}>
                                <Link to={"/"} style={{color:'#FFFFFF'}}>LOGO</Link>
                                <span className="sidebarX" onClick={this.sidebarClose.bind(this)} style={{cursor:'pointer'}}>X</span>
                            </div>
                        </div>
                        <div className="sideBarTopBody">
                           {loginMyPageRender}
                        </div>
                    </div>
                    <div className="sideBarBody">
                        <div className="sideBarMenu">
                            <div className="sideBarMenuTitle">커뮤니티</div>
                            <div className="divBoxGroup">
                                <Link to={"/noticeList"} onClick={this.sidebarClose.bind(this)}><div className="divBox">공지사항</div></Link>
                                <div className="divBox">자유게시판</div>
                                <div className="divBox">질문답변</div>
                                <div className="divBox">포토</div>
                                <div className="divBox">클라우드</div>
                                <div className="divBox">고급유머</div>
                            </div>
                        </div>
                        <div className="sideBarMenu">
                            <div className="sideBarMenuTitle">연구실
                                <font onClick={this.toggle.bind(this)} style={ shown }>더보기</font>
                                <font onClick={this.toggle.bind(this)} style={ hidden }>숨기기</font>
                            </div>
                            <div className="divBoxGroup">
                                <div className="divBox">채널</div>
                                <div className="divBox">신제품소식</div>
                                <div className="divBox">리뷰게시판</div>
                                <div className="divBox">입문가이드</div>
                                <div className="divBox">팁앤가이드</div>
                                <div className="divBox">핫딜게시판</div>
                                <div className="divBox" style={ hidden }>레시피계산기</div>
                                <div className="divBox" style={ hidden }>코일계산기</div>
                                <div className="divBox" style={ hidden }>툴즈킷</div>
                            </div>
                        </div>
                        <div className="sideBarMenu">
                            <div className="sideBarMenuTitle">궐련형</div>
                            <div className="divBoxGroup">
                                <div className="divBox">궐련형게시판</div>
                                <div className="divBox">궐련형갤러리</div>
                            </div>
                        </div>
                        <div className="sideBarMenu">
                            <div className="sideBarMenuTitle">레시피</div>
                            <div className="divBoxGroup">
                                <div className="divBox">클론</div>
                                <div className="divBox">일반</div>
                                <div className="divBox">자작</div>
                            </div>
                        </div>
                        <div className="sideBarMenu">
                            <div className="sideBarMenuTitle">트레이드</div>
                            <div className="divBoxGroup">
                                <div className="divBox">공동구매</div>
                                <div className="divBox">나눔</div>
                                <div className="divBox">판매</div>
                                <div className="divBox">구매교환</div>
                                <div className="divBox">거래후기</div>
                                <div className="divBox">나눔경매</div>
                            </div>
                        </div>
                        <div className="sideBarMenu">
                            <div className="sideBarMenuTitle">업체</div>
                            <div className="divBoxGroup">
                                <div className="divBox">업체게시판</div>
                                <div className="divBox">업체공동구매</div>
                                <div className="divBox">모더게시판</div>
                                <div className="divBox">제휴업체</div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="overlay hide-large animate-opacity" onClick={this.sidebarClose.bind(this)}  style={{cursor:'pointer'}} title="close side menu" id="mainOverlay"></div>
                {/* onclick="sidebarClose()" */}
                <div id="topblank"></div>
            </Fragment>
        )
    }
}

export default SideBar;