import React,{Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export const isEmail = email => {
    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return emailRegex.test(email);
};
export const isNick = nick => {
    const nickRegex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/;
    return nickRegex.test(nick);
};
export const isPw = pw => {
    const pwRegex = /^(?=.*[a-z])(?=.*[0-9])[0-9A-Za-z$&+,:;=?@#|'<>.^*()%!-]{8,16}$/;
    return pwRegex.test(pw)
}
export const isName = name => {
    const nameRegex =  /^[가-힣]{2,10}$/;
    return nameRegex.test(name)
}
class Agree extends Component {
    constructor() {
        super();
        this.state = {
            shown: true,
        };
    }
    toggle() {
        this.setState({
            shown: !this.state.shown,
        });
    }
    state={
        emailVal : '',
        nickVal : '',
        nameVal : '',
        pwVal : '', 
        pwReVal : '',
        confEmail: '',
        confNick: '',
        confPw: '',
        confRePw:'',
        confName:''
    }
    onInputChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
        if(e.target.name === "pwVal") {
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
        if(e.target.name==="pwReVal"){
            if(this.state.pwVal === e.target.value){
                this.setState({
                    confRePw:"1"
                })
            }else{
                this.setState({
                    confRePw:"0"
                })
            }
        }
        if(e.target.name==="nameVal"){
            if(isName(e.target.value)) {
                this.setState({
                    confName: "1"
                })
            } else {
                this.setState({
                    confName: "0"
                })
            }
        }
    }
    
    // ID 중복확인
    async emailCheck(){
        try{
            const emailCheck = await axios.get(`http://15.164.160.236:8080/users/emailCheck/${ this.state.emailVal}`)
            if(emailCheck.status === 200) {
                if(isEmail(this.state.emailVal)) {
                    if(emailCheck.data === 0) {
                        document.getElementById("joinIdConfirmSuccessButton").style.display="block";
                        document.getElementById("joinIdConfirmDeniedButton").style.display="none";
                        this.setState({
                            confEmail: "1"
                        })
                    } else {
                        document.getElementById("joinIdConfirmSuccessButton").style.display="none";
                        document.getElementById("joinIdConfirmDeniedButton").style.display="block";
                        this.setState({
                            confEmail: "0"
                        })
                    }
                }
            } 
        } catch(error) {
            console.error(error)
        }
    }
    // NICKNAME 중복확인
    async nickCheck(){
        try {
            const nickCheck = await axios.get(`http://15.164.160.236:8080/users/nickCheck/${ this.state.nickVal }`)
            if(nickCheck.status === 200) {
                if(isNick(this.state.nickVal)) {
                    if(nickCheck.data === 0) {
                        document.getElementById("joinNickConfirmSuccessButton").style.display="block";
                        document.getElementById("joinNickConfirmDeniedButton").style.display="none";
                        this.setState({
                            confNick: "1"
                        })
                    } else {
                        document.getElementById("joinNickConfirmSuccessButton").style.display="none";
                        document.getElementById("joinNickConfirmDeniedButton").style.display="block";
                        this.setState({
                            confNick: "0"
                        })
                    }
                }
            }
        } catch(error) {
            console.error(error)
        }
    }
    
    async join(){
        try{
            const userReg = await axios.post('http://15.164.160.236:8080/users/register',{
                userEmail: this.state.emailVal,
                userPassword: this.state.pwVal,
                userName: this.state.nameVal,
                userNickName: this.state.nickVal
            })
            if(userReg.status === 201) {
                console.log("확인");
                console.table(userReg);
                // window.location.assign('/emailAuth');
            } else {
                if(userReg.status === 400) {

                }
            }
        }catch(error){
            console.error(error)
        }
    }
    async test(){
        try {
            const kim3 =await axios.get('http://15.164.160.236:8080/notices/list')
            console.table(kim3)
        } catch (error) {
            console.error(error)
        }
    }
    pwChange(val){
        this.setState({
            confPw:val
        })
    }
    render(){
        var shown = {
            display: this.state.shown ? "block" : "none"
        };
        var hidden = {
            display: this.state.shown ? "none" : "block"
        };
        
        let { confEmail, confNick, confPw ,confRePw, confName } = this.state
       
        console.log("name : "+confName)
        
       
        let passRender = null;
        let regRender = null;
        let pwRender = null;
        let buttonRender = null;

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
        if(confEmail==="1"&&confNick==="1"&&confPw==="1"&&confRePw==="1"&&confName==="1"){
            buttonRender = <Link to="/emailAuth"><div className="confirmButton" id="next" onClick={this.join.bind(this)}>다음</div></Link>
        }
        
        return(
            <Fragment>
                <div className="padTop124">
                    <div className="padLR">
                        <div className="joinBody">
                            <div className="joinBodyContent">
                                <div className="joinBodyContentInfo">
                                    <font>
                                        이름과 이메일은 ID/PW 분실 시 <br />
                                        가입 정보를 통해 찾을 수 있으므로 정확히 입력해 주세요.
                                    </font>
                                </div>
                                <div className="joinBodyContentDiv">
                                    <div className="joinBodyTitle">아이디(이메일 형식)</div>
                                    <input type="text" placeholder="아이디(이메일 형식)" name="emailVal" onChange={this.onInputChange} value={this.state.emailVal}/>
                                    <div className="joinIdConfirm">
                                        <div className="joinIdConfirmButoon" onClick={this.emailCheck.bind(this)}>중복확인</div>
                                    </div>
                                    <div className="joinConfirmStatus">
                                        <div id="joinIdConfirmSuccessButton" style={ hidden }>사용 가능한 아이디입니다</div>
                                    </div>
                                    <div className="joinConfirmStatus">
                                        <div id="joinIdConfirmDeniedButton" style={ hidden }>사용 불가능한 아이디입니다</div>
                                    </div>
                                </div>
                                <div className="joinBodyContentDiv">
                                    <div className="joinBodyTitle">이름</div>
                                    <input type="text" placeholder="이름" name="nameVal" onChange={this.onInputChange} value={this.state.nameVal} />
                                </div>
                                <div className="joinBodyContentDiv">
                                    <div className="joinBodyTitle">비밀번호</div>
                                    <input type="password" placeholder="비밀번호" name="pwVal" onChange={this.onInputChange} value={this.state.pwVal}/>
                                    { passRender }
                                </div>
                                <div className="joinBodyContentDiv">
                                    <div className="joinBodyTitle">비밀번호 확인</div>
                                    <input type="password" placeholder="비밀번호 확인" name="pwReVal" onChange={this.onInputChange} value={this.state.pwReVal} />
                                    { regRender }
                                    { pwRender }
                                </div>
                                <div className="joinBodyContentDiv">
                                    <div className="joinBodyTitle">닉네임</div>
                                    <input type="text" placeholder="닉네임" name="nickVal" onChange={this.onInputChange} value={this.state.nickVal} />
                                    <div className="joinIdConfirm">
                                        <div className="joinIdConfirmButoon" onClick={this.nickCheck.bind(this)}>중복확인</div>
                                    </div>
                                    <div className="joinConfirmStatus">
                                        <div id="joinNickConfirmSuccessButton" style={ hidden }>사용 가능한 닉네임입니다</div>
                                    </div>
                                    <div className="joinConfirmStatus">
                                        <div id="joinNickConfirmDeniedButton" style={ hidden }>사용 불가능한 닉네임입니다</div>
                                    </div>
                                </div>
                                { buttonRender }
                                
                                {/* <Link to={"/emailAuth"} onClick={this.join.bind(this)}><div className="confirmButton" id="next" onChange={this.createNext.bind(this)}>다음</div></Link> */}
                                {/* <div onClick={this.join.bind(this)}>axios 확인</div>
                                <div onClick={this.test.bind(this)}>axios get확인</div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Agree;