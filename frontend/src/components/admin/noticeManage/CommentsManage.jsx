import React from 'react';
import { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import Toggle from 'react-toggle';
import axios from 'axios';
class CommentsManage extends Component{

    // 게시글 관리 : commentsManage
    // 댓글 관리 : CommentsManage

    constructor(props){
        super(props);
        this.state ={
            commentListResponse:[],
            pagingResponse:{},
            boardType:'',
            commentName:'',
            allCheck:false
        }
    }
    // 게시판 선택
    async handleBorder(props) {
        const boardType = props
        const commentName = document.getElementById(props).textContent
        let index = [
            boardType,
            '',
            '',
            '1'
        ]
        const response = await axios.get(`http://15.164.160.236:8080/comments/commentsManage/${index}`)
        this.setState({
            commentListResponse:response.data.commentList,
            pagingResponse:response.data.paging,
            boardType:boardType,
            commentName:commentName
        })
        console.log(this.state)
    }
    // 검색
    async handleSearch() {
        let commentSelect = this.state.boardType
        let searchOption = document.getElementById('searchOption').value
        let commentSearch = document.getElementById('commentSearch').value
        if(commentSelect==='') {
            alert("검색 할 게시판을 선택해주세요.")
            return false;
        }
        if(searchOption==='게시판 선택') {
            alert("검색 옵션을 선택해주세요.")
            return false;
        }
        if(commentSearch==='') {
            alert("검색어를 입력해주세요.")
            return false;
        }
        var index = [
            commentSelect,
            searchOption,
            commentSearch,
            '1'
        ]
        const response = await axios.get(`http://15.164.160.236:8080/comments/commentsManage/${index}`)
        if(response.status ===200) {
            this.setState({
                commentListResponse:response.data.commentList,
                pagingResponse:response.data.paging
            })
        } else {
            alert("실패하였습니다.")
        }
    }
    // 검색 엔터
    async handleEnterKey(e) {
        if(e.keyCode ===13) {
            this.handleSearch(this)
        }
    }
    // 활성화 버튼
    async handleEnable() {
        var size = document.getElementsByClassName('adminCommentCheck').length
        var checked = false
        this.state.allCheck = true
        for(var i =0; i< size; i++) {
            if(document.getElementsByClassName('adminCommentCheck')[i].checked===true){
                checked = true
            }
        }
        if(!checked) {
            alert("댓글을 선택해주세요.")
            return false;
        }
        for(var i =0; i< size; i++) {
            if(document.getElementsByClassName('adminCommentCheck')[i].checked===true){
                document.getElementsByName('adminActive')[i].checked = true
                this.handleChange(this,this.state.commentListResponse[i],i)
            }
        }
        alert("활동가능하게 되었습니다.")
    }
    // 비활성 버튼
    async handleDisable() {
        var size = document.getElementsByClassName('adminCommentCheck').length
        var checked = false
        this.state.allCheck = true
        for(var i =0; i< size; i++) {
            if(document.getElementsByClassName('adminCommentCheck')[i].checked===true){
                checked = true
            }
        }
        if(!checked) {
            alert("댓글을 선택해주세요.")
            return false;
        }
        for(var i =0; i< size; i++) {
            if(document.getElementsByClassName('adminCommentCheck')[i].checked===true){
                document.getElementsByName('adminActive')[i].checked = false
                this.handleChange(this,this.state.commentListResponse[i],i)
            }
        }
        alert("활동정지 되었습니다.")
    }
    // 전체 선택
    handleAllCheck() {
        var size = document.getElementsByClassName('adminCommentCheck').length
        for(var i =0; i< size; i++) {
            if(document.getElementById('allCheck').checked===true){
                document.getElementsByClassName('adminCommentCheck')[i].checked=true
            } else {
                document.getElementsByClassName('adminCommentCheck')[i].checked=false
            }
        }
    }
    // 상태값 변경
    async handleChange(thisState,commentRow,index) {
        thisState.setState({
            commentListResponse:thisState.state.commentListResponse
        })
        var state = true
        if(!thisState.state.allCheck) {
            state = window.confirm("상태를 변경하시겠습니까?")
        }
        var commentNoList = []
        if(state) {
            if(commentRow.commentStatus === "0") {
                thisState.state.commentListResponse[index].commentStatus = "1"
                document.getElementsByName('adminActive')[index].checked = true
            } else {
                thisState.state.commentListResponse[index].commentStatus = "0"
                document.getElementsByName('adminActive')[index].checked = false
            }
            commentNoList.push(thisState.state.boardType)
            if(commentRow.recommentNo==="comment") {
                commentNoList.push("comment")
                commentNoList.push(commentRow.commentStatus)
                commentNoList.push(commentRow.commentNo)
            } else {
                commentNoList.push("recomment")
                commentNoList.push(commentRow.commentStatus)
                commentNoList.push(commentRow.recommentNo)
            }
            const response = await axios.put(`http://15.164.160.236:8080/comments/commentsEnDisable`, commentNoList)
            if(response.status ===200) {
                if(!thisState.state.allCheck) {
                    alert("변경 되었습니다.")
                }
            } else {
                if(!thisState.state.allCheck) {
                    alert("실패하였습니다.")
                }
            }
        } else {
            alert("취소 되었습니다.")
            if(commentRow.commentStatus === "0") {
                thisState.state.commentListResponse[index].commentStatus = "0"
                document.getElementsByName('adminActive')[index].checked = false
            } else {
                thisState.state.commentListResponse[index].commentStatus = "1"
                document.getElementsByName('adminActive')[index].checked = true
            }
        }
    }
    // 이전 페이지
    async pagingPrev() {
        const userSearch = document.getElementById('commentSearch').value
        var index = [
            this.state.boardType,
            document.getElementById('searchOption').value,
            document.getElementById('commentSearch').value,
            parseInt(parseInt(this.state.pagingResponse.startPage)/10)
        ]
        if(userSearch===""){
            const response = await axios.get(`http://15.164.160.236:8080/comments/commentsManage/${index}`)
            this.setState({
                commentListResponse:response.data.commentList,
                pagingResponse:response.data.paging
            })
            
        } else {
            const response = await axios.get(`http://15.164.160.236:8080/comments/commentsManage/${index}`)
            if(response.status ===200) {
                this.setState({
                    commentListResponse:response.data.commentList,
                    pagingResponse:response.data.paging
                })
            } else {
                alert("실패하였습니다.")
            }
        }
    }
    // 선택 페이지
    async pagingMove(page) {
        window.scrollTo(0,0)
        const userSearch = document.getElementById('commentSearch').value
        var index = [
            this.state.boardType,
            document.getElementById('searchOption').value,
            document.getElementById('commentSearch').value,
            page
        ]
        if(userSearch===""){
            const response = await axios.get(`http://15.164.160.236:8080/comments/commentsManage/${index}`)
            this.setState({
                commentListResponse:response.data.commentList,
                pagingResponse:response.data.paging
            })
        } else {
            const response = await axios.get(`http://15.164.160.236:8080/comments/commentsManage/${index}`)
            if(response.status ===200) {
                this.setState({
                    commentListResponse:response.data.commentList,
                    pagingResponse:response.data.paging
                })
            } else {
                alert("실패하였습니다.")
            }
        }
    }
    // 다음 페이지
    async pagingNext() {
        const userSearch = document.getElementById('commentSearch').value
        var index = [
            this.state.boardType,
            document.getElementById('searchOption').value,
            document.getElementById('commentSearch').value,
            parseInt(this.state.pagingResponse.endPage)+1
        ]
        if(userSearch===""){
            const response = await axios.get(`http://15.164.160.236:8080/comments/commentsManage/${index}`)
            this.setState({
                commentListResponse:response.data.commentList,
                pagingResponse:response.data.paging
            })
        } else {
            const response = await axios.get(`http://15.164.160.236:8080/comments/commentsManage/${index}`)
            if(response.status ===200) {
                this.setState({
                    commentListResponse:response.data.commentList,
                    pagingResponse:response.data.paging
                })
            } else {
                alert("실패하였습니다.")
            }
        }
    }
    render(){
        const {commentListResponse, pagingResponse, commentName} = this.state;
        const thisState = this
        let commentListRender = commentListResponse.map(function(commentRow, index) {
            return (
                <div className="adminCheckbox" key={index}>
                    <label className="adminCol-md-12 adminTbody">
                        <div className="adminCol-md-1">
                            <input type="checkbox" className="adminCommentCheck" id={`checkNo${index}`}/>
                            <label htmlFor={`checkNo${index}`}></label>
                        </div>
                        <div className="adminCol-md-2 adminTextCell">{commentRow.commentRegdate.substr(0,10)}</div>
                        <div className="adminCol-md-1 adminTextCell">{commentName}</div>
                        <div className="adminCol-md-5 adminTextCell">{commentRow.commentContent.replace(/(<([^>]+)>)/ig,"")}</div>
                        <div className="adminCol-md-1 adminTextCell">{commentRow.commentWriter}</div>
                        <div className="adminCol-md-1 adminTextCell">0</div>
                        <div className="adminCol-md-1 adminTextCell">
                            <Toggle
                                checked={commentRow.commentStatus==="1"?true:false}
                                icons={false}
                                name="adminActive"
                                onChange={thisState.handleChange.bind(null,thisState,commentRow,index)}>
                            </Toggle>
                        </div>
                    </label>
                </div>
            )
        })
        //페이징
        let pagingPrev = ''
        let pagingDiv = [] 
        let pagingNext = ''
        // 페이지 넘버링
        if(pagingResponse.totalcount!==0) {
            for(let i = pagingResponse.startPage; i <= pagingResponse.endPage; i++){
                if((pagingResponse.pagenum+1)===i){
                    pagingDiv.push(
                        <li className="adminActive" key={i} onClick={this.pagingMove.bind(this,`${i}`)}><span className="sr-only">{i} </span></li>
                    )
                }else{
                    pagingDiv.push(
                        <li className="adminDisabled" key={i} onClick={this.pagingMove.bind(this,`${i}`)}><span className="sr-only">{i} </span></li>
                    )
                }
            }
        }
        // 다음 범위, 이전 범위
        if(pagingResponse.prev===false&&pagingResponse.next===true){
            if(parseInt(pagingResponse.lastblock)!==1) {
                pagingNext = <li onClick={this.pagingNext.bind(this)}><span aria-hidden="true">&raquo;</span></li>;
            }
        } else if(pagingResponse.prev===true&&pagingResponse.next===true){
            pagingPrev = <li onClick={this.pagingPrev.bind(this)}><span aria-hidden="true">&laquo;</span></li>;
            pagingNext = <li onClick={this.pagingNext.bind(this)}><span aria-hidden="true">&raquo;</span></li>;
        } else if(pagingResponse.prev===true&&pagingResponse.next===false){
            pagingPrev = <li onClick={this.pagingPrev.bind(this)}><span aria-hidden="true">&laquo;</span></li>;
        }
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
                            <Link to="/commentsManage">
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
                            <Link to="/noticeManage">게시글 관리</Link>
                            <Link to="/commentsManage" className="adminActive">댓글 관리</Link>
                        </div>
                    </div>
                </div>
                <div className="adminContainer adminBody-footer">
                    <div className="adminRow">
                    <h2>{this.state.commentName?this.state.commentName:'댓글 관리'}</h2>
                    </div>
                    <hr />
                    <div className="adminRow">
                        <div className="adminTable adminText-center">
                            <div className="adminCol-md-2 adminNoticeCell" onClick={this.handleBorder.bind(this,'notice')} id="notice">게시판1</div>
                            <div className="adminCol-md-2 adminNoticeCell" onClick={this.handleBorder.bind(this,'imageboard')} id="imageboard">게시판2</div>
                            <div className="adminCol-md-2 adminNoticeCell" onClick={this.handleBorder.bind(this,'게시판3')} id="게시판3">게시판3</div>
                            <div className="adminCol-md-2 adminNoticeCell" onClick={this.handleBorder.bind(this,'게시판4')} id="게시판4">게시판4</div>
                            <div className="adminCol-md-2 adminNoticeCell" onClick={this.handleBorder.bind(this,'게시판5')} id="게시판5">게시판5</div>
                            <div className="adminCol-md-2 adminNoticeCell" onClick={this.handleBorder.bind(this,'게시판6')} id="게시판6">게시판6</div>
                        </div>
                        <div className="adminTable adminText-center">
                            <div className="adminCol-md-2 adminNoticeCell" onClick={this.handleBorder.bind(this,'게시판7')} id="게시판7">게시판7</div>
                            <div className="adminCol-md-2 adminNoticeCell" onClick={this.handleBorder.bind(this,'게시판8')} id="게시판8">게시판8</div>
                            <div className="adminCol-md-2 adminNoticeCell" onClick={this.handleBorder.bind(this,'게시판9')} id="게시판9">게시판9</div>
                            <div className="adminCol-md-2 adminNoticeCell" onClick={this.handleBorder.bind(this,'게시판10')} id="게시판10">게시판10</div>
                            <div className="adminCol-md-2 adminNoticeCell" onClick={this.handleBorder.bind(this,'게시판11')} id="게시판11">게시판11</div>
                            <div className="adminCol-md-2 adminNoticeCell" onClick={this.handleBorder.bind(this,'게시판12')} id="게시판12">게시판12</div>
                        </div>
                    </div>
                    <hr />
                    <div className="adminRow">
                        <div>
                            <div className="adminCol-md-1 adminSelect adminText-center">
                                <select id="searchOption"className="adminForm-control">
                                    <option defaultValue="" disabled>댓글 검색</option>
                                    <option defaultValue="0">내용</option>
                                    <option defaultValue="1">작성자</option>
                                </select>
                            </div>
                            <div className="adminCol-md-4">
                                <div className="adminInput-group">
                                <input type="text" id="commentSearch" className="adminForm-control" placeholder="" onKeyUp={this.handleEnterKey.bind(this)}/>
                                    <span className="adminInput-group-btn">
                                        <button className="adminBtn adminBtn-default" type="button" onClick={this.handleSearch.bind(this)}>검색</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="adminRow adminShadow-custom">
                        <div className="adminCol-md-12">
                        <p>게시글 수 <span className="adminBadge">{this.state.pagingResponse.totalcount?this.state.pagingResponse.totalcount:'0'} 개</span></p>
                        </div>
                        <div className="adminCol-md-12">
                            <p>
                                <button type="button" className="adminBtn adminBtn-primary" onClick={this.handleEnable.bind(this)}>활성화</button>
                                <button type="button" className="adminBtn adminBtn-warning" onClick={this.handleDisable.bind(this)}>비활성화</button>
                            </p>
                        </div>
                        <div className="adminTable adminText-center">
                            <div className="adminCheckbox">
                                <label className="adminCol-md-12 adminThead">
                                    <div className="adminCol-md-1">
                                        <input type="checkbox" id="allCheck" onChange={this.handleAllCheck.bind(this)} /><label htmlFor="allCheck" title="전체선택"></label>
                                    </div>
                                    <div className="adminCol-md-2">작성일</div>
                                    <div className="adminCol-md-1">게시판명</div>
                                    <div className="adminCol-md-5">댓글내용</div>
                                    <div className="adminCol-md-1">작성자</div>
                                    <div className="adminCol-md-1">신고 수</div>
                                    <div className="adminCol-md-1">활성</div>
                                </label>
                            </div>
                        </div>
                        <div className="adminTable adminText-center adminTbody-group">
                            {commentListRender}
                        </div>
                        <ul className="adminCol-md-12 adminPagination">
                            {pagingPrev}
                            {pagingDiv}
                            {pagingNext}
                        </ul>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default CommentsManage