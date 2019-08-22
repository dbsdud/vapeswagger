import React from 'react';
import { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import Toggle from 'react-toggle';
import axios from 'axios';

class NoticeManage extends Component{
    // 게시글 관리 : NoticeManage
    // 댓글 관리 : CommentsManage
    constructor(props){
        super(props);
        this.state ={
            noticeListResponse:[],
            pagingResponse:{},
            boardType:'',
            boardName:'',
            allCheck:false
        }
    }
    // 검색
    async handleSearch() {
        let noticeSelect = this.state.boardType
        let searchOption = document.getElementById('searchOption').value
        let noticeSearch = document.getElementById('noticeSearch').value
        if(noticeSelect==='') {
            alert("검색 할 게시판을 선택해주세요.")
            return false;
        }
        if(searchOption==='게시판 선택') {
            alert("검색 옵션을 선택해주세요.")
            return false;
        }
        if(noticeSearch==='') {
            alert("검색어를 입력해주세요.")
            return false;
        }
        var index = [
            noticeSelect,
            searchOption,
            noticeSearch,
            '1'
        ]
        const response = await axios.get(`http://15.164.160.236:8080/notices/noticeManage/${index}`)
        if(response.status ===200) {
            this.setState({
                noticeListResponse:response.data.noticeList,
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
    // 상태값 변경
    async handleChange(thisState,noticeRow,index) {
        thisState.setState({
            noticeListResponse:thisState.state.noticeListResponse
        })
        var state = true
        if(!thisState.state.allCheck) {
            state = window.confirm("상태를 변경하시겠습니까?")
        }
        var noticeNoList = []
        if(state) {
            console.log(noticeRow)
            if(noticeRow.noticeStatus === "0") {
                if(document.getElementsByName('adminActive')[index].checked === true) {
                    return false
                }
                thisState.state.noticeListResponse[index].noticeStatus = "1"
                document.getElementsByName('adminActive')[index].checked = true
            } else {
                if(document.getElementsByName('adminActive')[index].checked === false) {
                    return false
                }
                thisState.state.noticeListResponse[index].noticeStatus = "0"
                document.getElementsByName('adminActive')[index].checked = false
            }
            noticeNoList.push(noticeRow.noticeNo)
            noticeNoList.push(thisState.state.boardType)
            noticeNoList.push(noticeRow.noticeStatus)
            const response = await axios.put(`http://15.164.160.236:8080/notices/noticeEnDisable`, noticeNoList)
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
            if(noticeRow.noticeStatus === "0") {
                thisState.state.noticeListResponse[index].noticeStatus = "0"
                document.getElementsByName('adminActive')[index].checked = false
            } else {
                thisState.state.noticeListResponse[index].noticeStatus = "1"
                document.getElementsByName('adminActive')[index].checked = true
            }
        }
    }
    // 활성화 버튼
    async handleEnable() {
        var noticeNoList=[]
        var size = document.getElementsByClassName('adminNoticeCheck').length
        var checked = false
        this.state.allCheck = true
        for(var i =0; i< size; i++) {
            if(document.getElementsByClassName('adminNoticeCheck')[i].checked===true){
                noticeNoList.push(this.state.noticeListResponse[i].noticeNo)
                checked = true
            }
        }
        if(!checked) {
            alert("게시글을 선택해주세요.")
            return false;
        }
        noticeNoList.push(this.state.boardType)
        noticeNoList.push("enable")
        for(var i =0; i< size; i++) {
            if(document.getElementsByClassName('adminNoticeCheck')[i].checked===true){
                document.getElementsByName('adminActive')[i].checked = true
                this.handleChange(this,this.state.noticeListResponse[i],i)
            }
        }
        const response = await axios.put(`http://15.164.160.236:8080/notices/noticeEnDisable`, noticeNoList)
        if(response.status ===200) {
            alert("활동가능하게 되었습니다.")
            this.handleAllCheck()
        } else {
            alert("실패하였습니다.")
        }
    }
    // 비활성 버튼
    async handleDisable() {
        var noticeNoList=[]
        var size = document.getElementsByClassName('adminNoticeCheck').length
        var checked = false
        this.state.allCheck = true
        for(var i =0; i< size; i++) {
            if(document.getElementsByClassName('adminNoticeCheck')[i].checked===true){
                noticeNoList.push(this.state.noticeListResponse[i].noticeNo)
                checked = true
            }
        }
        if(!checked) {
            alert("게시글을 선택해주세요.")
            return false;
        }
        noticeNoList.push(this.state.boardType)
        noticeNoList.push("disable")
        for(var i =0; i< size; i++) {
            if(document.getElementsByClassName('adminNoticeCheck')[i].checked===true){
                document.getElementsByName('adminActive')[i].checked = false
                this.handleChange(this,this.state.noticeListResponse[i],i)
            }
        }
        const response = await axios.put(`http://15.164.160.236:8080/notices/noticeEnDisable`, noticeNoList)
        if(response.status ===200) {
            alert("활동정지 되었습니다.")
            this.handleAllCheck()
        } else {
            alert("실패하였습니다.")
        }
    }
    // 전체 선택
    handleAllCheck() {
        var size = document.getElementsByClassName('adminNoticeCheck').length
        for(var i =0; i< size; i++) {
            if(document.getElementById('allCheck').checked===true){
                document.getElementsByClassName('adminNoticeCheck')[i].checked=true
            } else {
                document.getElementsByClassName('adminNoticeCheck')[i].checked=false
            }
        }
    }
    // 게시판 선택
    async handleBorder(props) {
        const boardType = props
        const boardName = document.getElementById(props).textContent
        let index = [
            boardType,
            '',
            '',
            '1'
        ]
        const response = await axios.get(`http://15.164.160.236:8080/notices/noticeManage/${index}`)
        this.setState({
            noticeListResponse:response.data.noticeList,
            pagingResponse:response.data.paging,
            boardType:boardType,
            boardName:boardName
        })
    }
    // 이전 페이지
    async pagingPrev() {
        const userSearch = document.getElementById('noticeSearch').value
        var index = [
            this.state.boardType,
            document.getElementById('searchOption').value,
            document.getElementById('noticeSearch').value,
            parseInt(parseInt(this.state.pagingResponse.startPage)/10)
        ]
        if(userSearch===""){
            const response = await axios.get(`http://15.164.160.236:8080/notices/noticeManage/${index}`)
            this.setState({
                noticeListResponse:response.data.noticeList,
                pagingResponse:response.data.paging
            })
            
        } else {
            const response = await axios.get(`http://15.164.160.236:8080/notices/noticeManage/${index}`)
            if(response.status ===200) {
                this.setState({
                    noticeListResponse:response.data.noticeList,
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
        const userSearch = document.getElementById('noticeSearch').value
        var index = [
            this.state.boardType,
            document.getElementById('searchOption').value,
            document.getElementById('noticeSearch').value,
            page
        ]
        if(userSearch===""){
            const response = await axios.get(`http://15.164.160.236:8080/notices/noticeManage/${index}`)
            this.setState({
                noticeListResponse:response.data.noticeList,
                pagingResponse:response.data.paging
            })
        } else {
            const response = await axios.get(`http://15.164.160.236:8080/notices/noticeManage/${index}`)
            if(response.status ===200) {
                this.setState({
                    noticeListResponse:response.data.noticeList,
                    pagingResponse:response.data.paging
                })
            } else {
                alert("실패하였습니다.")
            }
        }
    }
    // 다음 페이지
    async pagingNext() {
        const userSearch = document.getElementById('noticeSearch').value
        var index = [
            this.state.boardType,
            document.getElementById('searchOption').value,
            document.getElementById('noticeSearch').value,
            parseInt(this.state.pagingResponse.endPage)+1
        ]
        if(userSearch===""){
            const response = await axios.get(`http://15.164.160.236:8080/notices/noticeManage/${index}`)
            this.setState({
                noticeListResponse:response.data.noticeList,
                pagingResponse:response.data.paging
            })
        } else {
            const response = await axios.get(`http://15.164.160.236:8080/notices/noticeManage/${index}`)
            if(response.status ===200) {
                this.setState({
                    noticeListResponse:response.data.noticeList,
                    pagingResponse:response.data.paging
                })
            } else {
                alert("실패하였습니다.")
            }
        }
    }
    render(){
        const {noticeListResponse, pagingResponse, boardName} = this.state;
        const thisState = this
        let noticeListRender = noticeListResponse.map(function(noticeRow, index) {
            return (
                <div className="adminCheckbox" key={noticeRow.noticeNo}>
                    <label className="adminCol-md-12 adminTbody">
                        <div className="adminCol-md-1">
                            <input type="checkbox" className="adminNoticeCheck" id={`checkNo${noticeRow.noticeNo}`}/>
                            <label htmlFor={`checkNo${noticeRow.noticeNo}`}></label>
                        </div>
                        <div className="adminCol-md-2 adminTextCell">{noticeRow.noticeRegdate.substr(0,10)}</div>
                        <div className="adminCol-md-1 adminTextCell">{boardName}</div>
                        <div className="adminCol-md-4 adminTextCell">{noticeRow.noticeTitle}</div>
                        <div className="adminCol-md-1 adminTextCell">{noticeRow.noticeWriter}</div>
                        <div className="adminCol-md-1 adminTextCell">{noticeRow.noticeCommentCount}</div>
                        <div className="adminCol-md-1 adminTextCell">0</div>
                        <div className="adminCol-md-1 adminTextCell">
                            <Toggle
                                checked={noticeRow.noticeStatus==="1"?true:false}
                                icons={false}
                                name="adminActive"
                                onChange={thisState.handleChange.bind(null,thisState,noticeRow,index)}>
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
                        <h2>{this.state.boardName?this.state.boardName:'게시글 관리'}</h2>
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
                                    <option defaultValue="" disabled>게시글 검색</option>
                                    <option defaultValue="0">제목</option>
                                    <option defaultValue="1">작성자</option>
                                </select>
                            </div>
                            <div className="adminCol-md-4">
                                <div className="adminInput-group">
                                    <input type="text" id="noticeSearch" className="adminForm-control" placeholder="" onKeyUp={this.handleEnterKey.bind(this)}/>
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
                                    <div className="adminCol-md-4">제목</div>
                                    <div className="adminCol-md-1">작성자</div>
                                    <div className="adminCol-md-1">댓글 수</div>
                                    <div className="adminCol-md-1">신고 수</div>
                                    <div className="adminCol-md-1">활성</div>
                                </label>
                            </div>
                        </div>
                        <div className="adminTable adminText-center adminTbody-group">
                            {noticeListRender}
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

export default NoticeManage