import React, { Component,Fragment } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import NoticeList from './NoticeList';
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
// import BluePlus from '../../images/notice/BluePlus'

class NoticeReg extends Component{
    constructor(props) {
        super(props)
        this.state= { 
            editorHtml: '', 
            title: '', 
            noticeListRender: '',
            uDTO:JSON.parse(sessionStorage.getItem('uDTO')),
            noticeRegWait:0,
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(html) {
        this.setState({ editorHtml: html });
    }
    onInputChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    modules = {
        toolbar: {
            container: [
                // [{ 'header': [1,2,false] }],
                ['bold','italic','underline','strike','blockquote'],
                [{ 'list':'ordered'},{'list':'bullet'}],
                ['link','image'],
            ],
            handlers: {
                image: this.imageHandler
            },
            imageResize: true
        }
    }
    formats = [
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
    ];
    async noticeSubmit(){
        if(this.state.title === "") {
            alert("제목을 입력하세요");
            return false;
        } else if (this.state.editorHtml === ""){
            alert("내용을 입력하세요");
            return false;
        } else {
            try{
                this.setState({
                    noticeRegWait:1
                })
                const submit = await axios.post('http://15.164.160.236:8080/notices/noticeSubmit', {
                    noticeTitle: this.state.title,
                    noticeContent: this.state.editorHtml,
                    noticeWriter: this.state.uDTO.userNickName,
                    userNo : this.state.uDTO.userNo 
                })
                if(submit.status === 200) {
                    alert("게시물이 등록되었습니다")
                    this.setState({
                        noticeListRender:  <Fragment><NoticeList/></Fragment>
                    })
                    this.props.history.push('/noticeList')
                }
            }catch(error){
                console.error(error)
            }
        }
    }
    render(){
        
        let { noticeListRender,noticeRegWait } = this.state;
        let regRender = null;
        if(noticeRegWait===0){
            if(this.state.title===""||this.state.editorHtml===""){
                regRender = 
                <Fragment>
                    <div className="confirmButton" onClick={this.noticeSubmit.bind(this)}>등록</div>
                </Fragment>
            }else{
                regRender = 
                <Fragment>
                    <div className="confirmButton" onClick={this.noticeSubmit.bind(this)}>등록</div>
                </Fragment>
            }
          
        }else if(noticeRegWait===1){
            regRender = 
            <Fragment>
                <div className="confirmButton">등록중입니다.</div>
            </Fragment>
        }
       
        if(noticeListRender===""){
            noticeListRender = 
            <Fragment>
                <div className="padTop124">
                    <div className="padLR">
                        <div className="titleDiv">게시물 등록</div>
                        <div className="boardRegDiv">
                            <input type="text" placeholder="제목" name="title" onChange={this.onInputChange} value={this.state.title}/>
                            <div className="editorDiv">
                                <ReactQuill theme="snow"
                                            modules={ this.modules }
                                            formats={ this.formats }
                                            value={ this.state.editorHtml }
                                            onChange={ this.handleChange } />
                            </div>
                            {regRender}
                        </div>
                    </div>
                </div>
            </Fragment>
        }
        return(
            <Fragment>
               { noticeListRender }
            </Fragment>
        )
    }
}
export default NoticeReg