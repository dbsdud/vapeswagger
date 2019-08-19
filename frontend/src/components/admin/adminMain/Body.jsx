import React from 'react';
import { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AdminTop from '../adminMain/Top';
import AdminFooter from '../adminMain/Footer';
class Body extends Component {

    // 게시글 관리 : NoticeManage
    // 댓글 관리 : CommentsManage
    // 광고 등록 : AdrRegister
    // 전체 광고관리 : TotalAdrManage
    // 노출 광고관리 : EnableAdrManage
    // 비활성 광고관리 : DisableAdrManage
    // 전체 회원관리 : TotalMemberManage
    // 정지 회원관리 : DisableMemberManage
    // 스탭 관리 : StepManage

    render() {
        // 여기 수정해야함
        if(this.props.history.location.pathname.contains==="/admin") {
            document.getElementById('header-top').style.display='none';
            document.getElementsByClassName('mainFooter')[0].style.display='none';
        }
        return (
            <Fragment>
                <AdminTop />
                <div className="adminJumbotron">
                    <div className="adminContainer">
                        <div className="adminCol-md-4">
                            <div className="adminThumbnail adminMain-menu">
                                <img src="http://placehold.it/200x200" />
                                <div className="adminCaption">
                                    <h3>회원관리</h3>
                                    <ul className="adminList-unstyled">
                                        <li><Link to="/totalmembermanage" >전체 회원관리</Link></li>
                                        <li><Link to="/disablemembermanage">정지 회원관리</Link></li>
                                        <li><Link to="/stepmanage">스탭 관리</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="adminCol-md-4">
                            <div className="adminThumbnail adminMain-menu">
                                <img src="http://placehold.it/200x200" />
                                <div className="adminCaption">
                                    <h3>게시판관리</h3>
                                    <ul className="adminList-unstyled">
                                        <li><Link to="/noticemanage">게시글 관리</Link></li>
                                        <li><Link to="/commentsmanage">댓글 관리</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="adminCol-md-4">
                            <div className="adminThumbnail adminMain-menu">
                                <img src="http://placehold.it/200x200" />
                                <div className="adminCaption">
                                    <h3>광고관리</h3>
                                    <ul className="adminList-unstyled">
                                        <li><Link to="totaladmanage">전체 광고관리</Link></li>
                                        <li><Link to="enableadmanage">노출 광고관리</Link></li>
                                        <li><Link to="disableadmanage">비활성 광고관리</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AdminFooter />
            </Fragment>
        )
    }
}

export default Body