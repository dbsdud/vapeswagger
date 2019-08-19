import React from 'react';
import { Component,Fragment } from 'react';

class FindPw extends Component {
    render(){
        return(
            <Fragment>
                <div className="padTop124">
                    <div className="padLR">
                        <div className="findPwBody">
                            <div className="findPwBodyTop">
                                <h5>비밀번호 찾기</h5>
                                <div className="findPwBodyTopContent">
                                    회원가입 시 <font>입력한 아이디, 이름, 인증 받은 이메일 정보</font>를 통해
                                    <font> 비밀번호를 재발급</font> 받을 수 있습니다.
                                </div>
                            </div>
                            <div className="findPwBodyForm">
                                <div className="infoInput">
                                    <input type="text" className="idInput" placeholder="아이디" />
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

export default FindPw;