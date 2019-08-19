import React from 'react';
import { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class EmailAuth extends Component {
    constructor() {
        super();
        this.state = {
            shown: true,
        };
    }
    state={
        keyVal: '',
        confKey: '',
        userAuthStatus: ''
    }
    onInputChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    async authCheck(){
        try{
            const authCheck = await axios.get(`http://15.164.160.236:8080/users/authCheck/${ this.state.keyVal }`)
            if(authCheck.status === 200) {
                if(authCheck.data === 1) {
                    document.getElementById("joinAuthConfirmButton").style.display="block";
                    document.getElementById("joinAuthDeniedButton").style.display="none";
                    this.setState({
                        confKey: "1"
                    })
                } else {
                    document.getElementById("joinAuthConfirmButton").style.display="none";
                    document.getElementById("joinAuthDeniedButton").style.display="block";
                    this.setState({
                        confKey: "0"
                    })
                }
            } 
        } catch(error) {
            console.error(error)
        }
    }
    async changeStatus(){
        try{
            await axios.post(`http://15.164.160.236:8080/users/changeStatus`,{
                emailKey: this.state.keyVal
            })
        } catch(error) {
            console.error(error)
        }
    }
    render(){
        var shown = {
            display: this.state.shown ? "block" : "none"
        };
        var hidden = {
            display: this.state.shown ? "none" : "block"
        };
        return(
            <Fragment>
                <div className="padTop124">
                    <div className="padLR">
                        <div className="joinBody">
                            <div className="joinBodyTitle">가입인증</div>
                            <div className="joinBodyContent">
                                <div className="joinBodyContentInfo">
                                    <font>
                                        발송된 인증 메일을 확인해 주세요.
                                        <br />
                                        example@test.com
                                    </font>
                                </div>
                                <div className="joinBodyContentAuth">
                                    <input type="password" className="auth" name="keyVal" onChange={this.onInputChange} value={this.state.keyVal} />
                                </div>
                                {/* <Link to="/confirmJoin"><div className="confirmButton" onClick={this.authCheck.bind(this)}>인증확인</div></Link> */}
                                <div className="confirmButton" onClick={this.authCheck.bind(this)}>인증확인</div>
                                <div className="deniedButton" id="joinAuthDeniedButton" style={ hidden }>인증코드가 옳바르지 않습니다</div>
                                <Link to="confirmJoin"><div className="successButton" id="joinAuthConfirmButton" onClick={this.changeStatus.bind(this)} style={ hidden }>다음</div></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default EmailAuth;