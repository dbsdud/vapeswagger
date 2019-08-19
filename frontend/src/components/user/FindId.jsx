import React from 'react';
import { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
class FindId extends Component {
    render(){
        return(
            <Fragment>
                <div className="padTop124">
                    <div className="padLR">
                        <div className="findIdBody">
                            <div className="findIdBodyTop">
                                <h5>아이디 찾기</h5>
                                <div className="findIdBodyTopContent">
                                    회원가입 시 입력한 <font>이름과 인증 받은 이메일</font> 정보를<br />
                                    입력해 주시기 바랍니다.
                                </div>
                            </div>
                            <div className="findIdBodyForm">
                                <div className="infoInput">
                                    <input type="text" className="nameInput" placeholder="이름" />
                                    <input type="text" className="emailInput" placeholder="이메일 주소" />
                                    <div className="confirmButton">
                                        확인
                                    </div>
                                </div>
                            </div>
                            <div className="sponBanner"></div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default FindId;