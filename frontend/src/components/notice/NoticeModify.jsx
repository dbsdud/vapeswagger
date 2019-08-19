import React,{ Component,Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import NoticeList from './NoticeList';

class NoticeModify extends Component {
    constructor(props) {
        super(props)
        this.state= { 
            ntDetailResponse: [
                {
                    noticeNo: this.props.match.params.notice,
                    noticeTitle: "",
                    noticeContent: "",
                    noticeRegdate: "",
                    noticeWriter: "",
                }
            ],
            editorHtml: '', 
            title: '', 
            noticeListRender: '',
            uDTO:JSON.parse(sessionStorage.getItem('uDTO')),
            noticeModWait: 0,
            adExposeList:[
                {
                    adNo:'',
                    adTitle:'',
                    adEnable:'',
                    adClick:'',
                    adImg:'',
                    adLink:'',
                }
            ],
            aDTO:{
                adNo:'',
                adTitle:'',
                adEnable:'',
                adClick:'',
                adImg:'',
                adLink:'',
            }
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
    // 원래 내용 가져오기
    async componentDidMount(){
        const result = await axios.get(`http://15.164.160.236:8080/notices/noticeModify/${ this.state.ntDetailResponse[0].noticeNo }`)
        const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
        this.setState({
            ntDetailResponse: result.data.nDTO,
            uDTO:JSON.parse(sessionStorage.getItem('uDTO')),
            title: result.data.nDTO.noticeTitle,
            editorHtml: result.data.nDTO.noticeContent,
            adExposeList:exposeAd.data.adExposeList,
            aDTO:exposeAd.data.aDTO
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
            }
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
    async noticeModify(){
        if(this.state.title === ''){
            alert('제목을 입력하세요');
            return false;
        } else if(this.state.editorHtml === ''){
            alert('내용을 입력하세요');
            return false;
        } else {
            try{
                this.setState({
                    noticeModWait: 1
                })
                const modify = await axios.put(`http://15.164.160.236:8080/notices/update`,{
                    noticeNo: this.state.ntDetailResponse.noticeNo,
                    noticeTitle: this.state.title,
                    noticeContent: this.state.editorHtml,
                    noticeWriter: this.state.uDTO.userNickName,
                    userNo : this.state.uDTO.userNo
                })
                if(modify.status === 200){
                    alert('게시물이 수정되었습니다')
                    this.setState({
                        noticeListRender: <Fragment><NoticeList/></Fragment>
                    })
                    this.props.history.push('/noticeList')
                }
            }catch(error){
                alert('오류가 계속되면 개발자에게 문의하세요')
            }
        }
    }
    render(){
        let { noticeModWait,adExposeList,aDTO } = this.state;
        let modRender = null;
        if(noticeModWait === 0){
            modRender = 
            <Fragment>
                <div className="confirmButton" onClick={ this.noticeModify.bind(this) }>등록</div>
            </Fragment>
        } else {
            modRender = 
            <Fragment>
                <div className="confirmButton">등록중</div>
            </Fragment>
        }
        return(
            <Fragment>
                <div className="padTop124">
                    <div className="padLR">
                        <div className="sponserBanner">
                            <div className="sponDiv">
                                <img style={{paddingTop:5}}  src={ aDTO.adImg } />
                            </div>
                        </div>
                        <div className="titleDiv">게시물 수정</div>
                        <div className="boardRegDiv">
                            <input type="text" placeholder="제목" name="title" onChange={ this.onInputChange } value={ this.state.title } />
                            <div className="editorDiv">
                                <ReactQuill theme="snow"
                                            modules={ this.modules }
                                            formats={ this.formats }
                                            value={ this.state.editorHtml }
                                            onChange={ this.handleChange } />
                            </div>
                            { modRender }
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default NoticeModify