import React from 'react';
import { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export const isPw = pw => {
    const pwRegex = /^(?=.*[a-z])(?=.*[0-9])[0-9A-Za-z$&+,:;=?@#|'<>.^*()%!-]{8,16}$/;
    return pwRegex.test(pw)
}
class PwChange extends Component {
    state={
        userPassword: '',
        userEmail: '',
        pwVal: '',
        newPwVal: '',
        newPwReVal: '',
        confPw: '',
        confRePw: ''
    }
    onInputChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
        if(e.target.name === "newPwVal") {
            if(isPw(e.target.value)){
                this.setState({
                    confPw:"1"
                })
            }else{
                this.setState({
                    confPw:"0" 
                })
            }
        }
        if(e.target.name==="newPwReVal"){
            if(this.state.newPwVal === e.target.value){
                this.setState({
                    confRePw:"1"
                })
            }else{
                this.setState({
                    confRePw:"0"
                })
            }
        }
    }
    async changePw(){
        const userEmail = JSON.parse(sessionStorage.getItem('uDTO')).userEmail;
        try{
            const changePw = await axios.post('http://15.164.160.236:8080/users/changePw',{
                userEmail: userEmail,
                userPassword: this.state.newPwVal,
            })
            if(changePw.status === 201) {
                console.log("확인");
                console.table(changePw);
                // window.location.assign('/emailAuth');
            } else {
                if(changePw.status === 400) {

                }
            }
        }catch(error){
            console.error(error)
        }
    }
    render(){
        var hidden = {
            display: this.state.shown ? "none" : "block"
        };
        let { confPw, confRePw } = this.state
        let passRender = null;
        let buttonRender = null;
        let regRender = null;
        if(confPw === "0"){
            passRender = <font className="joinDenied">사용 불가능한 비밀번호입니다.</font>
        }else if(confPw === "1"){
            passRender = <font className="joinSuccess">사용 가능한 비밀번호입니다.</font>
        }
        if(confRePw === "0"){
            regRender = <font className="joinDenied">비밀번호가 일치하지 않습니다.</font>
        }else if(confRePw === "1"){
            regRender = <font className="joinSuccess">비밀번호가 일치합니다.</font>
        }
        if(confPw==="1" && confRePw==="1"){
            buttonRender = <Link to="/Mypage"><div className="confirmButton" id="next" onClick={this.changePw.bind(this)}>다음</div></Link>
        }
        return(
            <Fragment>
                <div className="padTop124">
                    <div className="padLR">
                        <div className="joinBody">
                            <div className="joinBodyTitle">
                                비밀번호 변경
                            </div>
                            <div className="joinBodyContent">
                                <div className="joinBodyContentDiv">
                                    <input type="password" className="pwInput" placeholder="새 비밀번호" name="newPwVal" onChange={this.onInputChange} value={this.state.newPwVal} />
                                    { passRender }
                                    <br />
                                    <input type="password" className="pwInput" placeholder="새 비밀번호 확인" name="newPwReVal" onChange={this.onInputChange} value={this.state.newPwReVal} />
                                    { regRender }
                                </div>
                            </div>
                            { buttonRender }
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default PwChange;