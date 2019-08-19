import React from 'react';
import { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
class AdrRegister extends Component{

    // 광고 등록 : AdrRegister
    // 전체 광고관리 : TotalAdrManage
    // 노출 광고관리 : EnableAdrManage
    // 비활성 광고관리 : DisableAdrManage

    state = {
        file:'',
        imagePreviewUrl:'',
        adTitle: '',
        adEnable:'',
        adImg:'',
        adLink:'',
        adClientName:'',
        adClientNumber:''
    }

    _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(file)
    reader.onloadend = () => {
        this.setState({
        file: file,
        adImg: reader.result
        });
    }
    reader.readAsDataURL(file)    
    }

    handleChange = (e) => {
        if(e.target.name === "adEnable") {
            let oldValue = e.target.value
            let newValue = oldValue.replace(/\D/g,'')
            e.target.value=newValue
            e.target.placeholder='숫자만 입력해주세요.'
        }
        if(e.target.name === "adClientNumber") {
            let oldValue = e.target.value
            let newValue = oldValue.replace(/\D/g,'')
            e.target.value=newValue
            e.target.placeholder='숫자만 입력해주세요.'
        }
        this.setState({
            [e.target.name]: e.target.value
        })
        let alertDanger = null
        console.table("state")
        console.table(this.state)
    }
    
    async adRegister() {
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
            const response = await Axios.post(`http://15.164.160.236:8080/admanage/adRegister`,
            {
                adTitle:this.state.adTitle,
                adEnable:this.state.adEnable,
                adImg:this.state.adImg,
                adLink:this.state.adLink,
                adClientName:this.state.adClientName,
                adClientNumber:this.state.adClientNumber
            })
            console.log(response.status)
            if(response.status ===200) {
                this.props.history.push('/totaladmanage')
            } else {
                alert("등록에 실패하였습니다.")
            }
        } catch(error) {
            console.error(error)
        }
    }

    render(){

        let {adTitle, adEnable, adImg, adLink, adClientName, adClientNumber} = this.state
        let $imagePreview = null;
        //if (adImg) {
            console.log("adImg : " +adImg)
            if (adImg==null){
                $imagePreview = (<p className="adminHelp-block">이미지를 등록하여주세요.</p>)
            } else if(adImg=="") {
                $imagePreview = (<p className="adminHelp-block">이미지를 등록하여주세요.</p>)
            } else {
                $imagePreview = (<img src={adImg} className="adminImg-responsive" style={{marginLeft: 'auto', marginRight: 'auto' ,marginTop: '10px' ,marginBottom: '10px'}} alt=""/>);
        }
        //
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
                        <h2>광고등록</h2>
                    </div>
                    <hr />
                    <div className="adminAlertDanger">{alertDanger}</div>
                    <div className="adminRow adminShadow-custom">
                        <div className="adminCol-md-12">
                            <div className="adminForm-horizontal">
                                <div className="adminForm-group">
                                    <label className="adminCol-md-2 adminControl-label">광고명</label>
                                    <div className="adminCol-md-10">
                                        <input type="text" className="adminForm-control" placeholder="Title" name="adTitle" onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="adminForm-group">
                                    <label className="adminCol-md-2 adminControl-label">노출횟수</label>
                                    <div className="adminCol-md-10">
                                        <input type="text" className="adminForm-control" placeholder="Count" name="adEnable" onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="adminForm-group">
                                    <label className="adminCol-md-2 adminControl-label">사이트 주소</label>
                                    <div className="adminCol-md-10">
                                        <input type="text" className="adminForm-control" placeholder="Website Address" name="adLink" onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="adminForm-group">
                                    <label className="adminCol-md-2 adminControl-label">광고주 이름</label>
                                    <div className="adminCol-md-10">
                                        <input type="text" className="adminForm-control" placeholder="Client Name" name="adClientName" onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="adminForm-group">
                                    <label className="adminCol-md-2 adminControl-label">광고주 연락처</label>
                                    <div className="adminCol-md-10">
                                        <input type="text" className="adminForm-control" placeholder="Client Phone-Number" name="adClientNumber" onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="adminForm-group">
                                    <label className="adminCol-md-2 adminControl-label">이미지</label>
                                    <div className="adminCol-md-10"> <input type="file" className="adminForm-control" name="adImg" onChange={(e)=>this._handleImageChange(e)} accept="image/gif, image/jpeg, image/png"/>
                                        <div className="imgPreview" >{$imagePreview}</div>
                                    </div>
                                </div>
                                <div className="adminForm-group">
                                    <div className="adminCol-md-10 adminText-center adminMargin-left">
                                        <button type="button" className="adminBtn adminBtn-success" onClick={this.adRegister.bind(this)}>등록</button>
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