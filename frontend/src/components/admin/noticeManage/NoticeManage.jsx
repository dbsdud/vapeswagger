import React from 'react';
import { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import Toggle from 'react-toggle'
class NoticeManage extends Component{

    // 게시글 관리 : NoticeManage
    // 댓글 관리 : CommentsManage

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
                                <h4>회원관리</h4>
                            </Link>
                        </div>
                        <div className="adminCol-md-4 adminMenu">
                            <Link to="/Noticemanage">
                                <img src="http://placehold.it/50x50" />
                                <h4 className="active">게시판관리</h4>
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
                            <Link to="/NoticeManage" className="adminActive">게시글 관리</Link>
                            <Link to="/CommentsManage">댓글 관리</Link>
                        </div>
                    </div>
                </div>
                <div className="adminContainer adminBody-footer">
                    <div className="adminRow">
                        <h2>게시글 관리</h2>
                    </div>
                    <hr />
                    <div className="adminRow">
                        <div>
                            <div className="adminCol-md-1 adminSelect adminText-center">
                                <select className="adminForm-control">
                                    <option>전체</option>
                                    <option>제목</option>
                                    <option>내용</option>
                                    <option>작성자마</option>
                                </select>
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
                                        <li role="presentation"><a role="menuitem" href="#">작성일</a></li>
                                    </ul>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <hr />
                    <div className="adminRow adminShadow-custom">
                        <div className="adminCol-md-12">
                            <p>게시글 수 <span className="adminBadge">#,###</span></p>
                        </div>
                        <div className="adminCol-md-12">
                            <p><button type="button" className="adminBtn adminBtn-primary">비활성화</button></p>
                        </div>
                        <div className="adminTable adminText-center">
                            <div className="adminCheckbox">
                                <label className="adminCol-md-12 adminThead">
                                    <div className="adminCol-md-1"><input type="checkbox" value="" /></div>
                                    <div className="adminCol-md-2">제목</div>
                                    <div className="adminCol-md-3">내용</div>
                                    <div className="adminCol-md-2">작성자</div>
                                    <div className="adminCol-md-1">댓글 수</div>
                                    <div className="adminCol-md-2">작성일</div>
                                <div className="adminCol-md-1">활성</div>
                                </label>
                            </div>
                        </div>
                        <div className="adminTable adminText-center adminTbody-group">
                            <div className="adminCheckbox">
                                <label className="adminCol-md-12 adminTbody">
                                    <div className="adminCol-md-1"><input type="checkbox" value="" /></div>
                                    <div className="adminCol-md-2">Title 1</div>
                                    <div className="adminCol-md-3">Contents 1</div>
                                    <div className="adminCol-md-2">User1</div>
                                    <div className="adminCol-md-1">#,###</div>
                                <div className="adminCol-md-2">YYYY-mm-dd | hh:mm</div>
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
                                    <div className="adminCol-md-2">Title 2</div>
                                    <div className="adminCol-md-3">Contents 2</div>
                                    <div className="adminCol-md-2">User2</div>
                                    <div className="adminCol-md-1">#,###</div>
                                <div className="adminCol-md-2">YYYY-mm-dd | hh:mm</div>
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

export default NoticeManage