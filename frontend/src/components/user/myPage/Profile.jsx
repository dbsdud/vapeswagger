import React,{Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import defaultUser from '../../../images/default-user.png';
export const isNick = nick => {
    const nickRegex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/;
    return nickRegex.test(nick);
};
class Profile extends Component {
    constructor() {
        super();
        this.state = {
            uDTO: '',
            shown: true,
        };
    }
    toggle() {
        this.setState({
            shown: !this.state.shown,
        });
    }
    state={
        nickVal : '',
        confNick: '',
        confProfile: '',
        file:'',
        imagePreviewUrl: defaultUser,
        profileImage: '',
    }
    componentDidMount(){
        this.setState({
            uDTO: JSON.parse(sessionStorage.getItem('uDTO')),
        })
    }
    onInputChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleImageChange(e){
        const filename = e.target.files[0].name
        const pathpoint = filename.lastIndexOf('.')
        const filepoint = filename.substring(pathpoint+1, e.length)
        const filetype=filepoint.toLowerCase();
        if(filetype==='jpg'||filetype==='gif'||filetype==='png'||filetype==='jpeg'){
            e.preventDefault();
            let reader = new FileReader();
            let file = e.target.files[0];
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    profileImage: reader.result
                });
            }
            reader.readAsDataURL(file)
            document.getElementsByClassName('profileImageOrin')[0].style.display='none';
            document.getElementsByClassName('profileImageNew')[0].style.display='inline';
            this.setState({
                confProfile:'1'
            })
        } else {
            alert('이미지 파일만 업로드가 가능합니다')
            return false
        }
    }
    async return(){
        const changeNick = await axios.put(`http://15.164.160.236:8080/users/changeNick`,{
            userNo: this.state.uDTO.userNo,
            userNickName: this.state.uDTO.userNickName
        })
        window.location="/"
    }
    // NICKNAME 중복확인
    async nickCheck(){
        try {
            if(document.getElementById("nickVal").value===""){
                document.getElementById("joinNickConfirmDeniedButton").style.display="block";
                document.getElementById("joinNickNotChangeButton").style.display="none"
                document.getElementById("joinNickConfirmSuccessButton").style.display="none"
                this.setState({
                    confNick: "0"
                })
                return false;
            }
            const nickCheck = await axios.get(`http://15.164.160.236:8080/users/nickCheck/${ this.state.nickVal }`)
            if(nickCheck.status === 200) {
                if(isNick(this.state.nickVal)) {
                    if(nickCheck.data === 0) {
                        const changeNick = await axios.put('http://15.164.160.236:8080/users/changeNick',{
                            userNo: this.state.uDTO.userNo,
                            userNickName: this.state.nickVal
                        })
                        document.getElementById("joinNickConfirmDeniedButton").style.display="none"
                        document.getElementById("joinNickNotChangeButton").style.display="none"
                        document.getElementById("joinNickConfirmSuccessButton").style.display="block"
                        this.setState({
                            confNick: "1"
                        })

                    } else if(this.state.nickVal === JSON.parse(sessionStorage.getItem('uDTO')).userNickName){
                        document.getElementById("joinNickConfirmSuccessButton").style.display="none"
                        document.getElementById("joinNickConfirmDeniedButton").style.display="none"
                        document.getElementById("joinNickNotChangeButton").style.display="block"
                        this.setState({
                            confNick: "0"
                        })
                    } else {
                        document.getElementById("joinNickNotChangeButton").style.display="none"
                        document.getElementById("joinNickConfirmSuccessButton").style.display="none"
                        document.getElementById("joinNickConfirmDeniedButton").style.display="block"
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
    async confirm(){
        const update = await axios.put(`http://15.164.160.236:8080/users/profileUpd`,{
            userNo: this.state.uDTO.userNo,
            userProfilePath: this.state.profileImage
        })
        sessionStorage.removeItem("uDTO")
        alert('정보 변경으로 로그아웃 되었습니다. 다시 로그인 해주세요.')
        window.location="/"
    }
    render(){
        var hidden = {
            display: this.state.shown ? "none" : "block"
        };
        let { uDTO, confProfile, profileImage } = this.state;
        let buttonRender = null;
        if(confProfile==="1"){
            buttonRender = <Link to="/updateUser"><div className="confirmButton" id="next" onClick={this.confirm.bind(this)}>확인</div></Link>
        }
        let orinImagePreview = null;
        let newImagePreview = null;
        if(uDTO.userProfilePath === null){
            orinImagePreview = <img src={defaultUser} className="profileImageOrin" />
        } else {
            orinImagePreview = <img src={uDTO.userProfilePath} className="profileImageOrin" />
        }
        if(profileImage === null) {
            newImagePreview = <img src={defaultUser} className="profileImageNew" />
        } else {
            newImagePreview = <img src={profileImage} className="profileImageNew" />
        }
        return(
            <Fragment>
                <div className="padTop124">
                    <div className="padLR">
                        <div className="profileImageDiv">
                            {orinImagePreview}
                            {newImagePreview}
                        </div>
                        <div className="profileUpload">
                            <label for="ex_file">사진 변경</label> &nbsp;
                            <div className="chgDefault">사진 삭제</div>
                            <input id="ex_file" onChange={(e)=>this.handleImageChange(e)} type="file" name="profileImg" accept="image/gif, image/jpeg, image/png, image/jpg" />
                        </div>
                        <div className="myPageContent">
                            <div className="myPageContentTitle">이름</div>
                            <input type="text" readOnly value={ uDTO.userName }/>
                            <div className="myPageContentTitle">아이디(이메일 형식)</div>
                            <input type="text" readOnly value={ uDTO.userEmail }/>
                            <div className="myPageContentTitle">닉네임</div>
                            <input type="text" id="nickVal" name="nickVal" onChange={this.onInputChange} value={ this.state.nickVal } placeholder={ uDTO.userNickName }/>
                            <div className="confirmButton" onClick={this.nickCheck.bind(this)}>중복확인 및 변경</div>
                            <div id="joinNickConfirmSuccessButton" style={ hidden }>닉네임이 변경되었습니다</div>
                            <div id="joinNickConfirmDeniedButton" style={ hidden }>사용 불가능한 닉네임입니다</div>
                            <div id="joinNickNotChangeButton" style={ hidden }>이미 사용중인 닉네임입니다</div>
                        </div>
                        <div className="myPageContent">
                            <div className="myPageContentTitle">이름</div>
                            <input type="text" readOnly value={ uDTO.userName }/>
                        </div>
                        {buttonRender}
                        <Link to="/"><div className="deniedButton" onClick={this.return.bind(this)} style={{marginTop:'-10px'}}>취소</div></Link>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Profile