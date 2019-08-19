import React from 'react';
import { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Toggle from 'react-toggle'

class AdrRegister extends Component{

    // 광고 등록 : AdrRegister
    // 전체 광고관리 : TotalAdrManage
    // 노출 광고관리 : EnableAdrManage
    // 비활성 광고관리 : DisableAdrManage

    state = {
        adDetailResponse:{
            adNo:this.props.match.params.ad,
            adTitle:"",
            adEnable:"",
            adClick:"",
            adImg:"",
            adLink:"",
            adClientName:"",
            adClientNumber:"",
            adActive:""
        }
        ,
        file:'',
        imagePreviewUrl:'',
        adNo:this.props.match.params.ad,
        adTitle: '',
        adEnable:'',
        adClick:'',
        adImg:'',
        adLink:'',
        adClientName:'',
        adClientNumber:'',
        adActive:'',
        adUpdate:''
    }


    async componentWillMount(){
        const response = await Axios.get(`http://15.164.160.236:8080/admanage/adDetail/${this.state.adDetailResponse.adNo}`)
        console.table(response)
        this.setState({
            adDetailResponse:response.data.adDTO
        })
        document.getElementsByName('adImg')[0].disabled=true
        if(this.state.adDetailResponse.adActive==="1") {
            document.getElementById('adActiveToggle').value="on"
        } else {
            document.getElementById('adActiveToggle').value="off"
        }
        console.log(document.getElementsByClassName('adminForm-control')[2].textContent)
    }
    // 이미지 미리보기
    _handleImageChange(e) {
        e.preventDefault();
        
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                adImg: reader.result
            });
        }
        reader.readAsDataURL(file)    
    }
    // 상태값 변경
    handleChange = (e) => {
        this.setState({
            adUpdate: this.state.adUpdate===''?"active":this.state.adUpdate==='active'?'active':'inactive'
        })
        console.table(e.target)
        if(this.state.adUpdate==='inactive') {
            this.setState({
                [e.target.name]: e.target.value,
            })
            if(e.target.name==="adActive"){
                this.setState({
                    adActive:this.state.adActive?false:true
                })
            }
        }
    }
   // 수정버튼
    adUpdateButton(){
        document.getElementById("updateSubmit").style.display="inline-block";
        document.getElementById("updateButton").style.display="none";
        document.getElementsByName('adImg')[0].disabled=false
        this.setState({
            adUpdate:'inactive',
            adDetailResponse:'',

            adTitle:document.getElementsByClassName('adminForm-control')[0].value,
            adEnable:document.getElementsByClassName('adminForm-control')[1].value,
            adClick:document.getElementsByClassName('adminForm-control')[2].value,
            adLink:document.getElementsByClassName('adminForm-control')[3].value,
            adClientName:document.getElementsByClassName('adminForm-control')[4].value,
            adClientNumber:document.getElementsByClassName('adminForm-control')[5].value,
            adActive:document.getElementById('adActiveToggle').value==='on'?true:false,
            adImg:document.getElementsByClassName('adminImg-responsive')[0].src
        })
    }
    // 재등록버튼
    async adUpdate() {
        if(this.state.adTitle==="") {
            this.setState({adTitle:null})
            return false
        } else if (this.state.adEnable==="") {
            this.setState({adEnable:null})
            return false
        } else if (this.state.adLink==="") {
            this.setState({adLink:null})
            return false
        } else if (this.state.adClientName===""){
            this.setState({adClientName:null})
            return false
        } else if (this.state.adClientNumber==="") {
            this.setState({adClientNumber:null})
            return false
        } else if (this.state.adImg==="") {
            this.setState({adImg:null})
            return false
        }
        try {
            const response = await Axios.put(`http://15.164.160.236:8080/admanage/adUpdate`,
            {   
                adNo:this.state.adNo,
                adTitle:this.state.adTitle,
                adEnable:this.state.adEnable,
                adImg:this.state.adImg,
                adLink:this.state.adLink,
                adClientName:this.state.adClientName,
                adClientNumber:this.state.adClientNumber,
                adActive:this.state.adActive?"1":"0"
            })
            if(response.status ===200) {
                this.props.history.push('/totaladmanage')
            } else {
                alert("재등록에 실패하였습니다.")
            }
        } catch(error) {
            console.error(error)
        }
    }

    render(){
        console.log("결과")
        console.table(this.state)
        
        let {adDetailResponse, adTitle, adEnable, adImg, adLink, adClientName, adClientNumber, adUpdate} = this.state
        let $imagePreview = null;
        if(adDetailResponse.adImg) {
            $imagePreview = (<img src={adDetailResponse.adImg} className="adminImg-responsive" style={{marginLeft: 'auto', marginRight: 'auto' ,marginTop: '10px' ,marginBottom: '10px'}} alt="광고 이미지"/>);
        } else {
            $imagePreview = (<img src={adImg} className="adminImg-responsive" style={{marginLeft: 'auto', marginRight: 'auto' ,marginTop: '10px' ,marginBottom: '10px'}} alt="광고 이미지"/>);
        }
        // null 유요성 검사
        let alertDanger = null;
        if(adTitle === null) {
            alertDanger = <div className="adminAlert adminAlert-danger" role="alert">광고명을 입력해주세요.</div>
        } else if (adEnable === null) {
            alertDanger = <div className="adminAlert adminAlert-danger" role="alert">노출횟수를 입력해주세요.</div>
        } else if (adImg === null) {
            alertDanger = <div className="adminAlert adminAlert-danger" role="alert">이미지를 등록해주세요.</div>
        } else if (adLink === null) {
            alertDanger = <div className="adminAlert adminAlert-danger" role="alert">사이트 주소를 입력해주세요.</div>
        } else if (adClientName === null) {
            alertDanger = <div className="adminAlert adminAlert-danger" role="alert">광고주 이름을 입력해주세요.</div>
        } else if (adClientNumber === null) {
            alertDanger = <div className="adminAlert adminAlert-danger" role="alert">광고주 연락처를 입력해주세요.</div>
        }
        if (adUpdate==="active") {
            alertDanger = <div className="adminAlert adminAlert-info" role="alert">수정 하시려면 수정 버튼을 눌러주세요.</div>
        }
        //
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
                </div>
                <div className="adminContainer adminBody-footer">
                    <div className="adminRow">
                        <h2>광고정보</h2>
                    </div>
                    <hr />
                    <div className="adminAlertDanger">{alertDanger}</div>
                    <div className="adminRow adminShadow-custom">
                        <div className="adminCol-md-12">
                            <div className="adminForm-horizontal">
                                <div className="adminForm-group">
                                    <label className="adminCol-md-2 adminControl-label">광고명</label>
                                    <div className="adminCol-md-10">
                                        <input type="text" className="adminForm-control" placeholder="Title" name="adTitle" onChange={this.handleChange} value={adDetailResponse.adTitle}/>
                                    </div>
                                </div>
                                <div className="adminForm-group">
                                    <label className="adminCol-md-2 adminControl-label">노출횟수</label>
                                    <div className="adminCol-md-10">
                                        <input type="text" className="adminForm-control" placeholder="Count" name="adEnable" onChange={this.handleChange} value={adDetailResponse.adEnable}/>
                                    </div>
                                </div>
                                <div className="adminForm-group">
                                    <label className="adminCol-md-2 adminControl-label">클릭횟수</label>
                                    <div className="adminCol-md-10">
                                        <input type="text" className="adminForm-control" name="adClick" value={adDetailResponse.adClick} readOnly/>
                                    </div>
                                </div>
                                <div className="adminForm-group">
                                    <label className="adminCol-md-2 adminControl-label">사이트 주소</label>
                                    <div className="adminCol-md-10">
                                        <input type="text" className="adminForm-control" placeholder="Website Address" name="adLink" onChange={this.handleChange} value={adDetailResponse.adLink}/>
                                    </div>
                                </div>
                                <div className="adminForm-group">
                                    <label className="adminCol-md-2 adminControl-label">광고주 이름</label>
                                    <div className="adminCol-md-10">
                                        <input type="text" className="adminForm-control" placeholder="Client Name" name="adClientName" onChange={this.handleChange} value={adDetailResponse.adClientName}/>
                                    </div>
                                </div>
                                <div className="adminForm-group">
                                    <label className="adminCol-md-2 adminControl-label">광고주 연락처</label>
                                    <div className="adminCol-md-10">
                                        <input type="text" className="adminForm-control" placeholder="Client Phone-Number" name="adClientNumber" onChange={this.handleChange} value={adDetailResponse.adClientNumber}/>
                                    </div>
                                </div>
                                <div className="adminForm-group">
                                    <label className="adminCol-md-2 adminControl-label">광고 노출여부</label>
                                    <div className="adminCol-md-10">
                                        <Toggle
                                            id="adActiveToggle"
                                            checked={adDetailResponse.adActive==="1"?true:adDetailResponse.adActive==="0"?false:this.state.adActive}
                                            icons={false}
                                            name="adActive"
                                            onChange={this.handleChange}>
                                        </Toggle>
                                    </div>
                                </div>
                                <div className="adminForm-group">
                                    <label className="adminCol-md-2 adminControl-label">이미지</label>
                                    <div className="adminCol-md-10"> <input type="file" className="adminForm-control" name="adImg" onChange={(e)=>this._handleImageChange(e)} accept="image/gif, image/jpeg, image/png"/>
                                        <div className="adminImgPreview" >{$imagePreview}</div>
                                    </div>
                                </div>
                                <div className="adminForm-group">
                                    <div className="adminCol-md-10 adminText-center adminMargin-left">
                                        <button type="button" className="adminBtn adminBtn-success" id="updateButton"onClick={this.adUpdateButton.bind(this)}>수정</button>
                                        <button type="button" className="adminBtn adminBtn-info" style={{display:'none'}} id="updateSubmit" onClick={this.adUpdate.bind(this)}>재등록</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default AdrRegister