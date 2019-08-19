import React from 'react';
import { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';


class Login extends Component {
    state={
        userEmail: '',
        userPassword: '',
        uDTO:'',
    }
    onInputChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
      
    async login() {
        try{
            const login = await axios.post('http://15.164.160.236:8080/users/login',{
                userEmail: this.state.userEmail,
                userPassword: this.state.userPassword
            })
            if(login.status === 200){
                if(login.data !== ""){
                    sessionStorage.setItem('uDTO', JSON.stringify(login.data))
                    this.setState({
                        uDTO:JSON.parse(sessionStorage.getItem('uDTO')),
                    })
                    alert(`${this.state.uDTO.userName}님 안녕하세요!`)
                    window.location = "/"
                } else if(login.data === ""){
                    alert('가입하신 회원정보가 없습니다.')
                    return false;
                }
            } 
        } catch(error) {
            console.error(error)
        }
    }
    render(){
        return(
            <Fragment>
                <div className="padTop124">
                    <div className="padLR">
                        <div className="loginBody">
                            <div className="loginBodyForm">
                                <div className="infoInput">
                                    <input type="text" className="idInput" name="userEmail" onChange={this.onInputChange} value={this.state.emailVal} placeholder="아이디" />
                                    <input type="password" className="pwInput" name="userPassword" onChange={this.onInputChange} value={this.state.passVal} placeholder="비밀번호" />
                                    <div className="loginButton"  onClick={this.login.bind(this)}>
                                        로그인
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="loginFooter">
                                <div><Link to={"/findId"}>아이디 찾기</Link></div>
                                <div><Link to={"/findPw"}>비밀번호 찾기</Link></div>
                                <div><Link to={"/join"}>회원가입</Link></div>
                            </div>
                            <div className="sponBanner"></div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Login;