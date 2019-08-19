import React from 'react';
import { Component,Fragment, Switch, Alert } from 'react';
import { Link } from 'react-router-dom';
import Toggle from 'react-toggle'
class TotalMemberManage extends Component{

    // 전체 회원관리 : TotalMemberManage
    // 정지 회원관리 : DisableMemberManage
    // 스탭 관리 : StepManage 

    constructor(){
        super();
        this.state ={
            checked: false
        }
    }
    
    handleChange(event) {
    }
    
    render(){
        return (
            <Fragment>
                <div className="adminLnb">
                    <div className="adminContainer">
                        <div className="adminCol-md-4 adminMenu">
                            <Link to="/TotalMemberManage">
                                <img src="http://placehold.it/50x50" />
                                <h4 className="adminActive">회원관리</h4>
                            </Link>
                        </div>
                        <div className="adminCol-md-4 adminMenu">
                            <Link to="/Noticemanage">
                                <img src="http://placehold.it/50x50" />
                                <h4>게시판관리</h4>
                            </Link>
                        </div>
                        <div className="adminCol-md-4 adminMenu">
                            <Link to="/TotalAdManage">
                                <img src="http://placehold.it/50x50" />
                                <h4>광고관리</h4>
                            </Link>
                        </div>
                    </div>
                    <div className="adminLnb-sub">
                        <div className="adminContainer">
                            <Link to="/TotalMemberManage" className="adminActive">전체 회원관리</Link>
                            <Link to="/DisableMemberManage">정지 회원관리</Link>
                            <Link to="/StepManage">스탭 관리</Link>
                        </div>
                    </div>
                </div>
                <div className="adminContainer adminBody-footer">
                    <div className="adminRow">
                        <h2>전체 회원 관리</h2>
                    </div>
                    <hr />
                    <div className="adminRow">
                        <div>
                            <div className="adminCol-md-1 adminText-center">
                                <h6>회원검색</h6>
                            </div>
                            <div className="adminCol-md-4">
                                <div className="adminInput-group">
                                    <input type="text" className="adminForm-control" placeholder="" />
                                    <span className="adminInput-group-btn">
                                        <button className="adminBtn adminBtn-default" type="button">검색</button>
                                    </span>
                                </div>
                            </div>
                            {/* <div className="adminCol-md-7">
                                <div className="adminDropdown">
                                    <button className="adminBtn adminBtn-default adminDropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">상세검색
                                        <span className="adminCaret"></span>
                                    </button>
                                    <ul className="adminDropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                                        <li role="presentation"><a role="menuitem" href="#">게시글 수</a></li>
                                        <li role="presentation"><a role="menuitem" href="#">댓글 수</a></li>
                                        <li role="presentation"><a role="menuitem" href="#">가입일</a></li>
                                    </ul>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <hr />
                    <div className="adminRow adminShadow-custom">
                        <div className="adminCol-md-12">
                        <p>회원수 <span className="adminBadge">#,###</span></p>
                        </div>
                        <div className="adminCol-md-12"><p><button type="button" className="adminBtn adminBtn-primary">활동정지</button></p></div>
                        <div className="adminTable adminText-center">
                            <div className="adminCheckbox">
                                <label className="adminCol-md-12 adminThead">
                                    <div className="adminCol-md-1"><input type="checkbox" value="" /></div>
                                    <div className="adminCol-md-3">아이디</div>
                                    <div className="adminCol-md-3">가입일</div>
                                    <div className="adminCol-md-2">게시글 수</div>
                                    <div className="adminCol-md-2">댓글 수</div>
                                    <div className="adminCol-md-1">정지</div>
                                </label>
                            </div>
                        </div>
                        <div className="adminTable adminText-center adminTbody-group">
                            <div className="adminCheckbox">
                                <label className="adminCol-md-12 adminTbody">
                                    <div className="adminCol-md-1"><input type="checkbox" value="" /></div>
                                    <div className="adminCol-md-3">test1</div>
                                    <div className="adminCol-md-3">YYYY-mm-dd</div>
                                    <div className="adminCol-md-2">#,###</div>
                                    <div className="adminCol-md-2">#,###</div>
                                    <div className="adminCol-md-1">
                                        <label className="adminReact-label">
                                            <Toggle
                                                defaultChecked={this.state.tofuIsReady}
                                                icons={false}
                                                onChange={this.handleTofuChange} />
                                        </label>
                                    </div>
                                </label>
                            </div>
                            <div className="adminCheckbox">
                                <label className="adminCol-md-12 adminTbody">
                                    <div className="adminCol-md-1"><input type="checkbox" value="" /></div>
                                    <div className="adminCol-md-3">test2</div>
                                    <div className="adminCol-md-3">YYYY-mm-dd</div>
                                    <div className="adminCol-md-2">#,###</div>
                                    <div className="adminCol-md-2">#,###</div>
                                    <div className="adminCol-md-1">
                                        <label className="adminReact-label">
                                            <Toggle
                                                defaultChecked={this.state.tofuIsReady}
                                                icons={false}
                                                onChange={this.handleTofuChange} />
                                        </label>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default TotalMemberManage