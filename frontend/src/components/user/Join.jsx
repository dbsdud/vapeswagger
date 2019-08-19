import React from 'react';
import ReactDOM from 'react-dom';
import { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';

class Join extends Component {
    state={
         joinClickTerm1:false,
         joinClickTerm2:false
    }
  
    joinClickTermOne(){
     this.setState({
         joinClickTerm1: !this.state.joinClickTerm1
     })
    }
    joinClickTermTwo(){
     this.setState({
         joinClickTerm2: !this.state.joinClickTerm2
     })
    }
    render(){
        //이 부분 css 고치면됨
        let agreeLink=null;
        if(this.state.joinClickTerm1&&this.state.joinClickTerm2){
            agreeLink=<Link to={"/agree"}><div className="confirmButton">다음</div></Link>
        }else{
            agreeLink=<div className="joinFooter">약관 동의 후 진행이 가능합니다</div>
        }
        return(
            <Fragment>
                <div className="padTop124">
                    <div className="padLR">
                        <div className="joinBody">
                            <div className="joinBodyTitle">
                                회원가입
                            </div>
                            <div className="joinBodyContent">
                                <div className="joinBodyContentGroup">
                                    <div className="joinBodyContentGroupBox">
                                        <div className="joinBodyContentGroupBoxDiv">
                                            <font>서비스 이용 약관</font>
                                            <br />
                                            <font>test</font>
                                        </div>
                                        <div className="joinBodyContentGroupBoxChk">
                                            <input type="checkbox" className="chk" checked={this.state.joinClickTerm1} onChange={this.joinClickTermOne.bind(this)} /><font>서비스 이용약관 동의</font>
                                        </div>
                                    </div>
                                    <div className="joinBodyContentGroupBox">
                                        <div className="joinBodyContentGroupBoxDiv">
                                            <font>개인정보 수집 및 이용 약관</font>
                                            <br />
                                            <font>test</font>
                                        </div>
                                        <div className="joinBodyContentGroupBoxChk">
                                            <input type="checkbox" className="chk" checked={this.state.joinClickTerm2} onChange={this.joinClickTermTwo.bind(this)} /><font>개인정보 수집 및 이용 동의</font>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {agreeLink}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Join;