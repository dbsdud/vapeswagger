 import React from 'react';
import { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import Toggle from 'react-toggle'
import axios from 'axios';
class DisableMemberManage extends Component{

    // 전체 회원관리 : TotalMemberManage
    // 정지 회원관리 : DisableMemberManage
    // 스탭 관리 : StepManage

    constructor(props){
        super(props);
        this.state ={
            checked: false,
            userListResponse:[],
            pagingResponse:{},
            enabled:false
        }
    }
    async componentWillMount(){
        var index = [
            'disable',
            '1',
            '',
            'all'
        ]
        const response = await axios.get(`http://15.164.160.236:8080/users/membermanage/${index}`)
        this.setState({
            userListResponse:response.data.userList,
            pagingResponse:response.data.paging
        })
    }
    // 상태값 변경
    async handleChange(thisState,userRow,index) {
        thisState.setState({
            userListResponse:thisState.state.userListResponse
        })
        var state = window.confirm("상태를 변경하시겠습니까?")
        var userNoList = []
        if(state) {
            if(userRow.enabled === "0") {
                thisState.state.userListResponse[index].enabled = "1"
                document.getElementsByName('adActive')[index].checked = true
            } else {
                thisState.state.userListResponse[index].enabled = "0"
                document.getElementsByName('adActive')[index].checked = false
            }
            userNoList.push(userRow.enabled)
            userNoList.push(userRow.userNo)
            const response = await axios.put(`http://15.164.160.236:8080/users/userEnDisable`, userNoList)
            if(response.status ===200) {
                alert("변경 되었습니다.")
            } else {
                alert("실패하였습니다.")
            }
        } else {
            alert("취소 되었습니다.")
            if(userRow.enabled === "0") {
                thisState.state.userListResponse[index].enabled = "0"
                document.getElementsByName('adActive')[index].checked = false
            } else {
                thisState.state.userListResponse[index].enabled = "1"
                document.getElementsByName('adActive')[index].checked = true
            }
        }
    }
    // 검색
    async handleSearch() {
        let userSearch = document.getElementById('userSearch').value
        let searchOption = document.getElementById('searchOption').value
        if(userSearch==='') {
            userSearch = 'all'
        }
        if(searchOption==='회원검색') {
            alert("검색 옵션을 선택해주세요.")
            return false;
        }
        var index = [
            'disable',
            '1',
            searchOption,
            userSearch
        ]
        const response = await axios.get(`http://15.164.160.236:8080/users/membermanage/${index}`)
        if(response.status ===200) {
            this.setState({
                userListResponse:response.data.userList,
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
    // 활동가능 버튼
    async handleEnable() {
        var userNoList=[]
        var size = document.getElementsByClassName('adminUserCheck').length
        var checked = false
        for(var i =0; i< size; i++) {
            if(document.getElementsByClassName('adminUserCheck')[i].checked===true){
                userNoList.push(this.state.userListResponse[i].userNo)
                checked = true
            }
        }
        if(!checked) {
            alert("회원을 선택해주세요.")
            return false;
        }
        userNoList.push("enable")
        const response = await axios.put(`http://15.164.160.236:8080/users/userEnDisable`, userNoList)
        if(response.status ===200) {
            alert("활동가능하게 되었습니다.")
            this.props.history.push('/EnableMemberManage')
        } else {
            alert("실패하였습니다.")
        }
    }
    // 정렬 버튼
    async handleSort() {
        const sortingField = [];
        const userListResponse = this.state.userListResponse
        for(let i = userListResponse.length-1; i >= 0; i--) {
            sortingField.push(userListResponse[i])
        }
        this.setState({
            userListResponse:sortingField
        })
    }
    // 전체 선택
    handleAllCheck() {
        var size = document.getElementsByClassName('adminUserCheck').length
        for(var i =0; i< size; i++) {
            if(document.getElementById('allCheck').checked===true){
                document.getElementsByClassName('adminUserCheck')[i].checked=true
            } else {
                document.getElementsByClassName('adminUserCheck')[i].checked=false
            }
        }
    }
    // 이전 페이지
    async pagingPrev() {
        const userSearch = document.getElementById('userSearch').value
        var index = [
            'disable',
            parseInt(parseInt(this.state.pagingResponse.startPage)/10),
            document.getElementById('searchOption').value,
            document.getElementById('userSearch').value
        ]
        if(userSearch===""){
            const response = await axios.get(`http://15.164.160.236:8080/users/membermanage/${index}`)
            this.setState({
                userListResponse:response.data.userList,
                pagingResponse:response.data.paging
            })
            
        } else {
            const response = await axios.get(`http://15.164.160.236:8080/users/membermanage/${index}`)
            if(response.status ===200) {
                this.setState({
                    userListResponse:response.data.userList,
                    pagingResponse:response.data.paging
                })
            } else {
                alert("실패하였습니다.")
            }
        }
    }
    // 선택 페이지
    async pagingMove(page) {
        const userSearch = document.getElementById('userSearch').value
        var index = [
            'disable',
            page,
            document.getElementById('searchOption').value,
            document.getElementById('userSearch').value
        ]
        if(userSearch===""){
            const response = await axios.get(`http://15.164.160.236:8080/users/membermanage/${index}`)
            this.setState({
                userListResponse:response.data.userList,
                pagingResponse:response.data.paging
            })
        } else {
            const response = await axios.get(`http://15.164.160.236:8080/users/membermanage/${index}`)
            if(response.status ===200) {
                this.setState({
                    userListResponse:response.data.userList,
                    pagingResponse:response.data.paging
                })
            } else {
                alert("실패하였습니다.")
            }
        }
    }
    // 다음 페이지
    async pagingNext() {
        const userSearch = document.getElementById('userSearch').value
        var index = [
            'disable',
            parseInt(this.state.pagingResponse.endPage)+1,
            document.getElementById('searchOption').value,
            document.getElementById('userSearch').value
        ]
        if(userSearch===""){
            const response = await axios.get(`http://15.164.160.236:8080/users/membermanage/${index}`)
            this.setState({
                userListResponse:response.data.userList,
                pagingResponse:response.data.paging
            })
        } else {
            const response = await axios.get(`http://15.164.160.236:8080/users/membermanage/${index}`)
            if(response.status ===200) {
                this.setState({
                    userListResponse:response.data.userList,
                    pagingResponse:response.data.paging
                })
            } else {
                alert("실패하였습니다.")
            }
        }
    }
    render(){
        const {userListResponse, pagingResponse} = this.state;
        const thisState = this
        let userListRender = userListResponse.map(function(userRow, index) {
            return (
                <div className="adminCheckbox" key={userRow.userNo}>
                    <label className="adminCol-md-12 adminTbody">
                        <div className="adminCol-md-1">
                            <input type="checkbox" className="adminUserCheck" id={`checkNo${userRow.userNo}`}/>
                            <label htmlFor={`checkNo${userRow.userNo}`}></label>
                        </div>
                        <div className="adminCol-md-3">{userRow.userEmail}</div>
                        <div className="adminCol-md-2">{userRow.userNickName}</div>
                        <div className="adminCol-md-3" style={{disabled:'true'}}>{userRow.userRegDate}</div>
                        <div className="adminCol-md-1">{userRow.postCount} 개</div>
                        <div className="adminCol-md-1">{userRow.commentCount} 개</div>
                        <div className="adminCol-md-1">
                            <Toggle
                                id="adActiveToggle"
                                checked={userRow.enabled==="1"?true:false}
                                icons={false}
                                name="adActive"
                                onChange={thisState.handleChange.bind(null,thisState,userRow,index)}>
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
        console.log(pagingResponse)
        if(!pagingResponse.totalcount===0) {
            for(let i = pagingResponse.startPage; i <= pagingResponse.endPage; i++){
                if((parseInt(pagingResponse.pagenum))===i){
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
            if(!pagingResponse.lastblock===1) {
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
                            <Link to="/TotalMemberManage">전체 회원관리</Link>
                            <Link to="/EnableMemberManage">활동 회원관리</Link>
                            <Link to="/DisableMemberManage" className="adminActive">정지 회원관리</Link>
                            {/* <Link to="/StepManage">스탭 관리</Link> */}
                        </div>
                    </div>
                </div>
                <div className="adminContainer adminBody-footer">
                    <div className="adminRow">
                        <h2>정지 회원 관리</h2>
                    </div>
                    <hr />
                    <div className="adminRow">
                        <div>
                            <div className="adminCol-md-2 adminText-center" style={{width:'auto'}}>
                                <select id="searchOption"className="adminForm-control">
                                    <option defaultValue="" hidden>회원검색</option>
                                    <option defaultValue="0">아이디</option>
                                    <option defaultValue="1">닉네임</option>
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

                        </div>
                    </div>
                    <hr />
                    <div className="adminRow adminShadow-custom">
                        <div className="adminCol-md-12">
                            <p>회원 수 <span className="adminBadge">{pagingResponse.totalcount} 명</span></p>
                        </div>
                        <div className="adminCol-md-11">
                            <p>
                                <button type="button" className="adminBtn adminBtn-primary" onClick={this.handleEnable.bind(this)}>활동가능</button>
                            </p>
                        </div>
                        <div className="adminCol-md-1">
                            <p><button type="button" className="adminBtn adminBtn-info" onClick={this.handleSort.bind(this)}>가입일순</button></p>
                        </div>
                        <div className="adminTable adminText-center">
                            <div className="adminCheckbox">
                                <label className="adminCol-md-12 adminThead">
                                    <div className="adminCol-md-1">
                                        <input type="checkbox" id="allCheck" onChange={this.handleAllCheck.bind(this)} /><label htmlFor="allCheck" title="전체선택"></label>
                                    </div>
                                    <div className="adminCol-md-3">아이디</div>
                                    <div className="adminCol-md-3">가입일</div>
                                    <div className="adminCol-md-2">게시글 수</div>
                                    <div className="adminCol-md-2">댓글 수</div>
                                    <div className="adminCol-md-1">활동여부</div>
                                </label>
                            </div>
                        </div>
                        <div className="adminTable adminText-center adminTbody-group">
                            {userListRender}
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

export default DisableMemberManage