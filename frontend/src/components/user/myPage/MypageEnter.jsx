import React,{Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Mypage from './Mypage';

class MypageEnter extends Component {
    state={
        uDTO: '',
        userEmail: '',
        userPassword: '',
        myPageRender:'',
    }
    onInputChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    async mypage() {
        const userEmail = JSON.parse(sessionStorage.getItem('uDTO')).userEmail;
        try{
            const mypage = await axios.post('http://15.164.160.236:8080/users/mypageEnter',{
                userEmail: userEmail,
                userPassword: this.state.userPassword
            })
            if(mypage.status === 200){
                if(mypage.data !== "") {
                    return this.setState({
                        myPageRender : <Fragment><Mypage /></Fragment>
                    })
                } else if(mypage.data === ""){
                    alert("안돼")
                    return false;
                }
            }
        } catch(error) {
            console.error(error)
        }
    }
    render(){
        let { myPageRender } = this.state;
        if(myPageRender===""){
        myPageRender=
        <Fragment>
            <div className="padTop124">
                <div className="padLR">
                    <div className="joinBody">
                        <div className="joinBodyTitle">
                            마이페이지
                        </div>
                        <div className="joinBodyContent">
                            <div className="joinBodyContentInfo">
                                <font>마이페이지 접근을 위해 비밀번호를 입력해 주세요</font>
                            </div>
                            <div className="joinBodyContentDiv">
                                <input type="password" className="pwInput" placeholder="비밀번호" name="userPassword" onChange={this.onInputChange} value={this.state.passVal} />
                            </div>
                            <div className="confirmButton" onClick={this.mypage.bind(this)}>
                                확인
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
        }
        return(
            <Fragment>
                {myPageRender}
            </Fragment>
        )
    }
}
export default MypageEnter;