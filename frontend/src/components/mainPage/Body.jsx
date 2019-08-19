import React,{ Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdExposeList from '../mainPage/AdExposeList'
import ImageBoard from '../mainPage/ImageBoard'
import newIcon from '../../images/new.gif';
function dateDiff(date1, date2) {
    var diffDate_1 = date1 instanceof Date ? date1 : new Date(date1);
    var diffDate_2 = date2 instanceof Date ? date2 : new Date(date2);
    diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
    diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());

    var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
    diff = Math.ceil(diff / (1000 * 3600 * 24));
    
    return diff;
}
class Body extends Component {
    state = {
        ntListResponse:[
            {
                noticeNo: '',
                noticeTitle: '',
                noticeRegdate: '',
                noticeWriter: '',
            }
        ],
        commentCountList: '',
        totalVisitor:'',
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
        },
        ibList:[{
            imageBoardNo:"",
            imageBoardTitle:"",
            imageBoardContent:"",
            imageBoardWriter:"",
            imageBoardRegdate:"",
            imageBoardReadCount:"",
        }],
        imageBoardCommentCountList:[],
        thumbImgList:[],
    }
    async componentDidMount(){
        const mainNoticeList = await axios.get('http://15.164.160.236:8080/mains/mainNoticeList')
        const getStaticIp = await axios.get('https://api.ipify.org?format=jsonp&callback=getIP')
        const visitorStaticIp=getStaticIp.data.split(":")[1].split("\"")[1];
        const visitorIpcheck = await axios.post('http://15.164.160.236:8080/mains/visitorChecking/',{
            visitorStaticIp: visitorStaticIp
        })
        const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd');
        const mainImageBoardList = await axios.get('http://15.164.160.236:8080/imageBoards/mainImageBoardList');
       
        this.setState({
            ntListResponse: mainNoticeList.data.nList,
            commentCountList: mainNoticeList.data.commentCountList,
            totalVisitor: visitorIpcheck.data,
            adExposeList:exposeAd.data.adExposeList,
            aDTO:exposeAd.data.aDTO,
            ibList:mainImageBoardList.data.ibList,
            imageBoardCommentCountList:mainImageBoardList.data.imageBoardCommentCountList,
            thumbImgList:mainImageBoardList.data.thumbImgList
        })
    }
    render(){
        const { ntListResponse, commentCountList ,adExposeList,aDTO,ibList,imageBoardCommentCountList,thumbImgList } = this.state;
        
        //새로운글 new
        let newIconRender = null;
        let ntListRender = ntListResponse.map(function(ntRow, index){
            if(dateDiff(ntRow.noticeRegdate.split(" ")[0], new Date()) <= 3) {
            newIconRender=
                <Fragment>
                    <img src={ newIcon } />
                </Fragment>
            } else {
                newIconRender=
                <Fragment></Fragment>
            }
            return (
                <Fragment>
                    <div className="mainNoticeList">
                        <div className="mainNoticeListTitle">
                            <div className="mainNoticeListTitleText">
                                <Link to={ {pathname: `/noticeDetail/${ ntRow.noticeNo }`} }>{ ntRow.noticeTitle } </Link>
                            </div>
                            <div className="mainNoticeListEtc">
                                <div className="mainNoticeListCommentCount">&nbsp;{ newIconRender }&nbsp;[{ commentCountList[index] }]</div>
                            </div>
                        </div>
                        <div className="mainNoticeListRegdate">{ ntRow.noticeRegdate.substring(5,10) }</div>
                    </div>
                </Fragment>
            )
        })
        return (
            <Fragment>
            <div className="padTop124">
                <div className="padLR">
                    <div className="sponserBanner">
                        <div className="sponDiv">
                            <img style={{paddingTop:5,height:"20vw"}}  src={ aDTO.adImg } />
                        </div>
                    </div>
                    <div className="noticeTable">
                        <div className="noticeTableTopFlex">
                            <div className="boardTitle">공지사항</div> 
                            <div className="moreButton"><Link to="/noticeList">more++</Link></div>  
                        </div>
                        { ntListRender }
                    </div>
                    <div className="noticeTable">
                        <div className="noticeTableTopFlex">
                            <div className="boardTitle">통합 최신글</div> 
                            <div className="moreButton">more++</div>  
                        </div>
                        <div className="noticeTableTopFlexList" >
                            <div className="noticeTableTopFlexListIn">
                                <div>제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다</div> 
                                {/* 이부분은 좋아요 i 처리 */}
                                <div>+4</div>
                                {/* 이부분은 i 처리 */}
                                <div>19금</div>
                            </div>
                            <div>06-18</div> 
                        </div>
                    </div> 
                    <div className="noticeTable">
                        <div className="noticeTableTopFlex">
                            <div className="boardTitle">실시간 인기글</div> 
                            <div className="moreButton">more++</div>  
                        </div>
                        <div className="noticeTableTopFlexList" >
                            <div className="noticeTableTopFlexListIn">
                                <div>제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다</div> 
                                {/* 이부분은 좋아요 i 처리 */}
                                <div>+4</div>
                                {/* 이부분은 i 처리 */}
                                <div>19금</div>
                            </div>
                            <div>06-18</div> 
                        </div>
                    </div> 
                    <div className="noticeTable">
                        <div className="noticeTableTopFlex">
                            <div className="boardTitle">자유게시판</div> 
                            <div className="moreButton">more++</div>  
                        </div>
                        <div className="noticeTableTopFlexList" >
                            <div className="noticeTableTopFlexListIn">
                                <div>제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다</div> 
                                {/* 이부분은 좋아요 i 처리 */}
                                <div>+4</div>
                                {/* 이부분은 i 처리 */}
                                <div>19금</div>
                            </div>
                            <div>06-18</div> 
                        </div>
                        <div className="noticeTableTopFlexList" >
                            <div className="noticeTableTopFlexListIn">
                                <div>제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다</div> 
                                {/* 이부분은 좋아요 i 처리 */}
                                <div>+4</div>
                                {/* 이부분은 i 처리 */}
                                <div>19금</div>
                            </div>
                            <div>06-18</div> 
                        </div>
                        <div className="noticeTableTopFlexList" >
                            <div className="noticeTableTopFlexListIn">
                                <div>제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다</div> 
                                {/* 이부분은 좋아요 i 처리 */}
                                <div>+4</div>
                                {/* 이부분은 i 처리 */}
                                <div>19금</div>
                            </div>
                            <div>06-18</div> 
                        </div>
                        <div className="noticeTableTopFlexList" >
                            <div className="noticeTableTopFlexListIn">
                                <div>제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다</div> 
                                {/* 이부분은 좋아요 i 처리 */}
                                <div>+4</div>
                                {/* 이부분은 i 처리 */}
                                <div>19금</div>
                            </div>
                            <div>06-18</div> 
                        </div>
                        <div className="noticeTableTopFlexList" >
                            <div className="noticeTableTopFlexListIn">
                                <div>제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다</div> 
                                {/* 이부분은 좋아요 i 처리 */}
                                <div>+4</div>
                                {/* 이부분은 i 처리 */}
                                <div>19금</div>
                            </div>
                            <div>06-18</div> 
                        </div>
                    </div> 
                    <ImageBoard ibList={ibList} imageBoardCommentCountList={imageBoardCommentCountList} thumbImgList={thumbImgList} />
                </div>
            </div>
            <AdExposeList adExposeList={adExposeList} />
            </Fragment>
        )
    }
}

export default Body