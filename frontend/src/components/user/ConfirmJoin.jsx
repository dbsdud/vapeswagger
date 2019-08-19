import React from 'react';
import { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
class ConfirmJoin extends Component {
    render(){
        return(
            <Fragment>
                <div className="padTop124">
                    <div className="padLR">
                        <div className="joinBody">
                            <div className="joinBodyTitle">가입완료</div>
                            <div className="joinBodyContent">
                                <div className="joinBodyContentInfo">
                                    <font>
                                        이메일 인증을 완료하였습니다.<br />
                                        가입하신 아이디를 통해 서비스를 이용하실 수 있습니다.
                                    </font>
                                </div>
                                <Link to={"/login"}><div className="confirmButton">로그인</div></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ConfirmJoin;