import React from 'react';
import { Component,Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class DisableAdrManage extends Component{

    // 광고 등록 : AdrRegister
    // 전체 광고관리 : TotalAdrManage
    // 노출 광고관리 : EnableAdrManage
    // 비활성 광고관리 : DisableAdrManage
    state= {
        adListResponse:[
            {
                adNo:"",   //광고번호
                adTitle:"",    //광고명
                adEnable:"",   //노출횟수
                adClick:"",    // 클릭 횟수
                adImg:"",  // 이미지 경로
                adLink:"", // 사이트 주소
                adClientName:"",   // 광고주 명
                adClientNumber:"", // 광고주 연락처
                adActive:"", // 광고 노출여부
                adRegdate:"",  // 등록일시
                adChgdate:""   // 수정일시
            }
        ],
        pagingResponse:[
            {
                totalcount:""
            }
        ]
    }

    async componentWillMount(){
        const response = await axios.get('http://15.164.160.236:8080/admanage/DisableAdManage/1')
        this.setState({
            adListResponse:response.data.adList,
            pagingResponse:response.data.paging,
            countResponse:response.data.listCnt
        })
    }
    // 검색
    async handleSearch() {
        let adSearch = document.getElementById('adSearch').value
        if(adSearch==='') {
            adSearch = 'all'
        }
        const response = await axios.get(`http://15.164.160.236:8080/admanage/adSearch/disable/${adSearch}/1`)
        if(response.status ===200) {
            this.setState({
                adListResponse:response.data.adSearchList,
                pagingResponse:response.data.paging,
                countResponse:response.data.listCnt
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
    // 전체 선택
    handleAllCheck() {
        var size = document.getElementsByClassName('adminAdCheck').length
        for(var i =0; i< size; i++) {
            if(document.getElementById('allCheck').checked===true){
                document.getElementsByClassName('adminAdCheck')[i].checked=true
            } else {
                document.getElementsByClassName('adminAdCheck')[i].checked=false
            }
        }
    }
    // 활성화 버튼
    async handleEnable() {
        var adNoList=[]
        var size = document.getElementsByClassName('adminAdCheck').length
        var checked = false
        for(var i =0; i< size; i++) {
            if(document.getElementsByClassName('adminAdCheck')[i].checked===true){
                adNoList.push(this.state.adListResponse[i].adNo)
                checked = true
            }
        }
        if(!checked) {
            alert("광고를 선택해주세요.")
            return false;
        }
        adNoList.push(this.state.adListResponse[size]="enable")
        const response = await axios.put(`http://15.164.160.236:8080/admanage/adEnDisable`, adNoList)
        if(response.status ===200) {
            alert("활성화 되었습니다.")
            this.props.history.push('/enableadmanage')
        } else {
            alert("실패하였습니다.")
        }
    }
    // 정렬 버튼
    async handleSort() {
        const sortingField = [];
        const adListResponse = this.state.adListResponse
        for(let i = adListResponse.length-1; i >= 0; i--) {
            sortingField.push(adListResponse[i])
        }
        this.setState({
            adListResponse:sortingField
        })
    }
    // 이전 페이지
    async pagingPrev() {
        const adSearch = document.getElementById('adSearch').value
        const page = parseInt(parseInt(this.state.pagingResponse.startPage)/10)
        if(adSearch===""){
            const response = await axios.get(`http://15.164.160.236:8080/admanage/DisableAdManage/${page}`)
            this.setState({
                adListResponse:response.data.adList,
                pagingResponse:response.data.paging,
                countResponse:response.data.paging.listCnt
            })
        } else {
            const response = await axios.get(`http://15.164.160.236:8080/admanage/adSearch/disable/${adSearch}/${page}`)
            if(response.status ===200) {
                this.setState({
                    adListResponse:response.data.adSearchList,
                    pagingResponse:response.data.paging,
                    countResponse:response.data.listCnt
                })
            } else {
                alert("실패하였습니다.")
            }
        }
    }
    // 선택 페이지
    async pagingMove(page) {
        const adSearch = document.getElementById('adSearch').value
        if(adSearch===""){
            const response = await axios.get(`http://15.164.160.236:8080/admanage/DisableAdManage/${page}`)
            this.setState({
                adListResponse:response.data.adList,
                pagingResponse:response.data.paging,
                countResponse:response.data.paging.listCnt
            })
        } else {
            const response = await axios.get(`http://15.164.160.236:8080/admanage/adSearch/disable/${adSearch}/${page}`)
            if(response.status ===200) {
                this.setState({
                    adListResponse:response.data.adSearchList,
                    pagingResponse:response.data.paging,
                    countResponse:response.data.listCnt
                })
            } else {
                alert("실패하였습니다.")
            }
        }
    }
    // 다음 페이지
    async pagingNext() {
        let adSearch = document.getElementById('adSearch').value
        const page = parseInt(this.state.pagingResponse.endPage)+1
        if(adSearch===""){
            const response = await axios.get(`http://15.164.160.236:8080/admanage/DisableAdManage/${page}`)
            this.setState({
                adListResponse:response.data.adList,
                pagingResponse:response.data.paging,
                countResponse:response.data.paging.listCnt
            })
        } else {
            const response = await axios.get(`http://15.164.160.236:8080/admanage/adSearch/disable/${adSearch}/${page}`)
            if(response.status ===200) {
                this.setState({
                    adListResponse:response.data.adSearchList,
                    pagingResponse:response.data.paging,
                    countResponse:response.data.listCnt
                })
            } else {
                alert("실패하였습니다.")
            }
        }
    }

    render(){
        const {adListResponse, countResponse, pagingResponse} = this.state;
        let adListRender = adListResponse.map(function(adRow) {
            return (
                <div className="adminCheckbox" key={adRow.adNo}>
                    <label className="adminCol-md-4 adminTbody">
                        <Link to={{pathname:`/adDetail/${adRow.adNo}`}}><img src={adRow.adImg} style={{width: '100%', height: '100px', margin: '10px 0px', objectFit: 'contain'}}alt="광고 이미지"/></Link>
                        <div className="adminCaption" title="선택">
                            <span className={adRow.adActive==="1"?"adminEnable":"adminDisable"}>{adRow.adActive==="1"?"활성화":"비활성화"}</span>
                            <label>
                                <input type="checkbox" className="adminAdCheck" id={`checkNo${adRow.adNo}`}/>
                                <label htmlFor={`checkNo${adRow.adNo}`}></label>
                            </label>
                            <p>{adRow.adTitle}</p>
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
        for(let i = pagingResponse.startPage; i <= pagingResponse.endPage; i++){
            if((parseInt(pagingResponse.page))===i){
                pagingDiv.push(
                    <li className="adminActive" key={i} onClick={this.pagingMove.bind(this,`${i}`)}><span className="sr-only">{i} </span></li>
                )
            }else{
                pagingDiv.push(
                    <li className="adminDisabled" key={i} onClick={this.pagingMove.bind(this,`${i}`)}><span className="sr-only">{i} </span></li>
                )
            }
        }
        // 다음 범위, 이전 범위
        if(pagingResponse.prev===false&&pagingResponse.next===true){
            if(pagingResponse.pageCnt===1) {
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
                                <img src="http://placehold.it/50x50" alt="테스트 이미지"/>
                                <h4>회원관리</h4>
                            </Link>
                        </div>
                        <div className="adminCol-md-4 adminMenu">
                            <Link to="/Noticemanage">
                                <img src="http://placehold.it/50x50" alt="테스트 이미지"/>
                                <h4>게시판관리</h4>
                            </Link>
                        </div>
                        <div className="adminCol-md-4 adminMenu">
                            <Link to="/TotalAdManage">
                                <img src="http://placehold.it/50x50" alt="테스트 이미지"/>
                                <h4 className="active">광고관리</h4>
                            </Link>
                        </div>
                    </div>
                    <div className="adminLnb-sub">
                        <div className="adminContainer">
                            <Link to="/TotalAdManage">전체 광고관리</Link>
                            <Link to="/EnableAdManage">노출 광고관리</Link>
                            <Link to="/DisableAdManage" className="adminActive">비활성 광고관리</Link>
                        </div>
                    </div>
                </div>
                <div className="adminContainer adminBody-footer">
                    <div className="adminRow">
                        <h2>비활성 광고관리</h2>
                    </div>
                    <hr />
                    <div className="adminRow">
                        <div className="adminCol-md-10 adminText-center">
                            <div className="adminCol-md-2 adminText-center">
                                <select className="adminForm-control">
                                    <option>전체</option>
                                    <option>광고명</option>
                                </select>
                            </div>
                            <div className="adminCol-md-5">
                                <div className="adminInput-group">
                                    <input type="text" id="adSearch" className="adminForm-control" placeholder="" onKeyUp={this.handleEnterKey.bind(this)}/>
                                    <span className="adminInput-group-btn">
                                        <button className="adminBtn adminBtn-default" type="button" onClick={this.handleSearch.bind(this)}>검색</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="adminCol-md-2 adminText-right">
                            <Link to="/AdRegister"><button className="adminBtn adminBtn-default" type="button">광고 등록</button></Link>
                        </div>
                    </div>
                    <hr />
                    <div className="adminRow adminShadow-custom">
                        <div className="adminCol-md-12">
                            <p>광고 수 <span className="adminBadge">{countResponse} 개</span></p>
                        </div>
                        <div className="adminCol-md-11">
                            <p><button type="button" className="adminBtn adminBtn-primary" onClick={this.handleEnable.bind(this)}>활성화</button></p>
                            <label><input type="checkbox" id="allCheck" onChange={this.handleAllCheck.bind(this)} /><label htmlFor="allCheck" title="전체선택"></label></label>
                        </div>
                        <div className="adminCol-md-1">
                            <p><button type="button" className="adminBtn adminBtn-info" onClick={this.handleSort.bind(this)}>작성일순</button></p>
                        </div>
                        <div className="adminCol-md-12 adminText-center adminTbody-group">
                            {adListRender}
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

export default DisableAdrManage