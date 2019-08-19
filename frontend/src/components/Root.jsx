import React from 'react';
import { Component,Fragment } from 'react';
import { Switch,Route } from 'react-router-dom';

import Top from './mainPage/Top';
import Body from './mainPage/Body';
import Footer from './mainPage/Footer';
import PageError from './mainPage/pageError';
import NoticeList from './notice/NoticeList';
import NoticeDetail from './notice/NoticeDetail';
import NoticeReg from './notice/NoticeReg';
import NoticeModify from './notice/NoticeModify';
import Login from './user/Login';
import FindId from './user/FindId';
import FindPw from './user/FindPw';
import Join from './user/Join';
import Agree from './user/Agree';
import EmailAuth from './user/EmailAuth';
import ConfirmJoin from './user/ConfirmJoin';
import MypageEnter from './user/myPage/MypageEnter';
import Mypage from './user/myPage/Mypage';
import AdminTop from './admin/adminMain/Top';
import AdminBody from './admin/adminMain/Body';
import AdminTotalMemberManage from './admin/memberManage/TotalMemberManage';
import AdminDisableMemberManage from './admin/memberManage/DisableMemberManage';
import AdminStepManage from './admin/memberManage/StepManage';
import AdminNoticeManage from './admin/noticeManage/NoticeManage';
import AdminCommentsManage from './admin/noticeManage/CommentsManage';
import AdminAdRegister from './admin/adManage/AdRegister';
import AdminAdDetail from './admin/adManage/AdDetail';
import AdminTotalAdManage from './admin/adManage/TotalAdManage';
import AdminEnableAdManage from './admin/adManage/EnableAdManage';
import AdminDisableAdManage from './admin/adManage/DisableAdManage';
import ImageBoardList from './mainPage/ImageBoardList';
import ImageBoardDetail from './mainPage/ImageBoardDetail';
class Root extends Component{
    constructor(props) {
        super(props);
        this.state={
            uDTO:''
        }
    }
    componentDidMount() {
        const sessionDetail = JSON.parse(sessionStorage.getItem('uDTO'))
        this.setState({
            uDTO:sessionDetail,
        })
    }
    render(){
        
        let sessionRoute=null;
        if(this.state.uDTO===null){
            sessionRoute = 
            <Fragment>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/findId" component={FindId}/>
                <Route exact path="/findPw" component={FindPw}/>
                <Route exact path="/join" component={Join}/>
                <Route exact path="/agree" component={Agree}/>
                <Route exact path="/emailAuth" component={EmailAuth}/>
                <Route exact path="/confirmJoin" component={ConfirmJoin}/> 
                <Route exact path="/NoticeReg" component={Body}/> 
                <Route exact path="/mypageEnter" component={Body}/>
                <Route exact path="/mypage" component={Body}/>
            </Fragment>
           // sessionNoticeReg = <Route exact path="/NoticeReg" component={Body}/> 
        }else if(this.state.uDTO!==null){
            sessionRoute = 
            <Fragment>
                <Route exact path="/login" component={Body}/>
                <Route exact path="/findId"  component={Body}/>
                <Route exact path="/findPw" component={Body}/>
                <Route exact path="/join" component={Body}/>
                <Route exact path="/agree" component={Body}/>
                <Route exact path="/emailAuth" component={Body}/>
                <Route exact path="/confirmJoin" component={Body}/>
                <Route exact path="/mypageEnter" component={MypageEnter}/>
                <Route exact path="/mypage" component={Mypage}/>
            </Fragment>
            if(this.state.uDTO.userNo==="1"){
                sessionRoute=
                <Fragment>
                    <Route exact path="/login" component={Body}/>
                    <Route exact path="/findId"  component={Body}/>
                    <Route exact path="/findPw" component={Body}/>
                    <Route exact path="/join" component={Body}/>
                    <Route exact path="/agree" component={Body}/>
                    <Route exact path="/emailAuth" component={Body}/>
                    <Route exact path="/confirmJoin" component={Body}/>
                    <Route exact path="/mypageEnter" component={MypageEnter}/>
                    <Route exact path="/mypage" component={Mypage}/>
                    <Route exact path="/NoticeReg" component={NoticeReg}/>
                    <Route exact path="/noticeModify/:notice" component={NoticeModify}/>
                    <Route exact path="/admin" component={AdminBody}/>
                    <Route exact path="/totalmembermanage" component={AdminTotalMemberManage}/>
                    <Route exact path="/disablememberManage" component={AdminDisableMemberManage}/>
                    <Route exact path="/stepmanage" component={AdminStepManage}/>
                    <Route exact path="/noticemanage" component={AdminNoticeManage}/>
                    <Route exact path="/commentsmanage" component={AdminCommentsManage}/>
                    <Route exact path="/adregister" component={AdminAdRegister}/>
                    <Route exact path="/addetail/:ad" component={AdminAdDetail}/>
                    <Route exact path="/totaladmanage" component={AdminTotalAdManage}/>
                    <Route exact path="/enableadmanage" component={AdminEnableAdManage}/>
                    <Route exact path="/disableadmanage" component={AdminDisableAdManage}/>
                </Fragment>
            }
        }
        return (
            <Fragment>
                <Top />                            
                    <Switch>
                        <Route exact path="/" component={Body}/>
                        <Route exact path="/noticeList" component={NoticeList}/>
                        <Route exact path="/noticeDetail/:notice" component={NoticeDetail}/>
                        <Route exact path="/imageBoardList" component={ImageBoardList}/>
                        <Route exact path="/imageBoardDetail/:imageBoardNo" component={ImageBoardDetail}/>
                        {sessionRoute}
                        <Route component ={PageError}/>
                    </Switch>
                <Footer /> 
            </Fragment>
        )
    }
}

export default Root;