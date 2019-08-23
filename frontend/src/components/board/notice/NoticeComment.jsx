import React,{ Component,Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import extra from '../../images/extra.png';

class NoticeComment extends Component{
    state={
        noticeNo:this.props.noticeInfo.ntDetailResponse[0].noticeNo,
        commentTotalCount:"",
        commentListResponse:[
            {
                commentNo:"",
                commentContent:"",
                commentRegdate:"",
                commentWriter:"",
                noticeNo:"",
                userNo:""
            }
        ]
    }
    async componentDidMount(){
        const response = await axios.get(`http://15.164.160.236:8080/comments/list/${this.state.noticeNo}`)
        this.setState({
            commentListResponse:response.data
        })
        console.table(this.state.commentListResponse)
     }
  
    render(){
      console.table(this.props)
      console.log("김한결2:"+this.state.noticeNo) 
      return(
            <Fragment>
                <div className="commentTableTop">
                    댓글 #,###개
                </div>
                <div className="commentTableContentTop">
                    <div>작성자 | 2019.07.01</div>
                    <div><img src={extra} alt='더보기' className='extraBtn' /></div>
                    <div className="extraWin">
                        <h1>test</h1>
                    </div>
                </div>
                <div className="commentTableContentBody">
                    <div>무궁화 삼천리 화려강산</div>
                </div>
                <hr />
                <div className="commentTableContentTop">
                    <div>작성자 | 2019.07.01</div>
                    <div><img src={extra} alt='더보기' className='extraBtn' /></div>
                </div>
                <div className="commentTableContentBody">
                    <div>대한 사람 대한으로</div>
                </div>
                <hr />
                <div className="commentTableReg">
                    <textarea className="commentTableRegBox" placeholder="댓글을 입력해 주세요."></textarea>
                    <hr />
                    <div className="commentTableRegButton"><span>등록</span></div>
                </div>
            </Fragment>
        )
    }
}

export default NoticeComment;