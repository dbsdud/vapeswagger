import React,{Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Profile from './Profile';
import PwChange from './PwChange';
import defaultUser from '../../../images/default-user.png';
class Mypage extends Component {
    constructor() {
        super();
        this.state = {
            uDTO: '',
            shown: true,
            mypageUpdRender:""
        };
    }
    componentDidMount(){
        this.setState({
            uDTO: JSON.parse(sessionStorage.getItem('uDTO'))
        })
    }
    profileRender(){
        this.setState({
            mypageUpdRender:<Profile/>
        })
    }
    pwchangeRender(){
        this.setState({
            mypageUpdRender:<PwChange/>
        })
    }
    render(){
        let { uDTO,mypageUpdRender } = this.state;
        let profile = null;
        if(uDTO.userProfilePath === null) {
            profile = <img src={defaultUser} className="profileImage" />
        } else {
            profile = <img src={uDTO.userProfilePath} className="profileImage" />
        }
        if(mypageUpdRender===""){
            mypageUpdRender=
            <Fragment>
            <div className="padTop124">
                <div className="padLR">
                    <div className="profileImageDiv">
                        {profile}
                    </div>
                    <div className="profileName">
                        <font><b>{ uDTO.userName }</b></font>
                        <div className="profileTotal" style={{textAlign:"center"}}>
                            <span style={{color:"#9f9f9f"}}>총 게시물 156 {}</span>
                            <span style={{color:"#9f9f9f"}}>UP 15{}</span>
                        </div>
                    </div>
                    <div className="myPageMenu">
                        <div className="myPageMenuBox" onClick={this.profileRender.bind(this)}>프로필 변경</div>
                        <div className="myPageMenuBox" onClick={this.pwchangeRender.bind(this)}>비밀번호 변경</div>
                    </div>
                </div>
            </div>
            </Fragment>
        }
        return(
            <Fragment>
            {mypageUpdRender}
            </Fragment>
        )
    }
}
export default Mypage