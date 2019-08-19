import React,{ Component,Fragment } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
class ImageBoardDetail extends Component{
    state={
        showIndex: false,
        showBullets: false,
        infinite: true,
        showThumbnails: true,
        showFullscreenButton: false,
        showGalleryFullscreenButton: false,
        showPlayButton: false,
        showGalleryPlayButton: false,
        showNav: false,
        isRTL: false,
        slideDuration: 450,
        slideInterval: 2000,
        slideOnThumbnailOver: true,
        thumbnailPosition: 'bottom',
        showVideo: {},
        paging:[
            {
               totalcount:"",
               pagenum:"",
               contentnum:"",
               startPage:"",
               endPage:"",
               prev:"",
               next:"",
               currentblock:"",
               lastblock:""
            }
         ],
         ibDetailResponse:
            {
               imageBoardNo:this.props.match.params.imageBoardNo,
               imageBoardTitle:"",
               imageBoardContent:"",
               imageBoardRegdate:"",
               imageBoardWriter:"",
               imageBoardReadcount:'',
               prevThumb:"",
               nextThumb:"",
            }
         ,
         imageBoardLikeCount:"",
         imageBoardCommentCount:"",
         imageBoardLikeCountList:"",
         imgList:"",
         ibDetailPrev:"",
         ibDetailNext:"",
         prevCommentCount:"",
         nextCommentCount:"",
         commentTotalCount:"",
         commentListResponse:[
            {
                commentNo:"",
                commentContent:"",
                commentRegdate:"",
                commentWriter:"",
                noticeNo:"",
                userNo:"",
                userProfilePath:"",
            }
        ],
        ibLikeCount:"",
        aDTO:"",
    }
    async componentDidMount(){
        const response = await axios.get(`http://15.164.160.236:8080/imageBoards/detail/${this.state.ibDetailResponse.imageBoardNo}`)
        const response2 = await axios.get(`http://15.164.160.236:8080/imageBoardComments/list/${this.state.ibDetailResponse.imageBoardNo}/1`)
        const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
        this.setState({
            ibDetailResponse:response.data.ibDTO,
            paging:response.data.paging,
            imageBoardCommentCount:response.data.imageBoardCommentCount,
            imageBoardLikeCountList:response.data.imageBoardLikeCountList,
            commentListResponse:response2.data.cList,
            commentTotalCount:response2.data.commentTotalCount,
            imageBoardLikeCount:response.data.imageBoardLikeCount,
            imgList:response.data.imgList,
            ibDetailPrev:response.data.prevDTO,
            ibDetailNext:response.data.nextDTO,
            prevCommentCount: response.data.prevCommentCount,
            nextCommentCount: response.data.nextCommentCount,
            adExposeList: exposeAd.data.adExposeList,
            aDTO:exposeAd.data.aDTO
        })
    }
     //페이지 이동 클릭시
     async pageMove(imageBoardNo){
        const response = await axios.get(`http://15.164.160.236:8080/imageBoards/detail/${imageBoardNo}`)
        const response2 = await axios.get(`http://15.164.160.236:8080/imageBoardComments/list/${imageBoardNo}/1`)
        const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
        this.setState({
            ibDetailResponse:response.data.ibDTO,
            imageBoardTotalCount:response.data.noticeTotalCount,
            ibDetailPrev:response.data.prevDTO,
            ibDetailNext:response.data.nextDTO,
            imageBoardLikeCount:response.data.imageBoardLikeCount,
            commentListResponse:response2.data.cList,
            commentTotalCount:response2.data.commentTotalCount,
            paging:response2.data.paging,
            prevCommentCount: response.data.prevCommentCount,
            nextCommentCount: response.data.nextCommentCount,
            editorHtml: response.data.ibDTO.imageBoardContent,
            adExposeList: exposeAd.data.adExposeList,
            aDTO:exposeAd.data.aDTO
        }) 
       
        // document.getElementById('noticeExtraWin').style.display='none';
        // let extraWinCount = document.getElementsByClassName('extraWin')
        // for(let i = 0; i < extraWinCount.length; i++){
        //     document.getElementsByClassName('extraWin')[i].style.display='none';
        // }
         window.scrollTo(0,0)
    }
     // 게시물 좋아요
     async imageBoardLike() {
        if(this.state.uDTO === null) {
            alert("로그인 후 이용이 가능합니다")
            return false;
        } else {
            const ibLike = await axios.post("http://15.164.160.236:8080/imageBoards/imageBoardLike", {
                userNo: this.state.uDTO.userNo,
                imageBoardNo: this.state.ibDetailResponse.imageBoardNo
            })
            this.setState({
                ibLikeCount: ibLike.data
            })
        }
    }
    render(){
        let {ibDetailResponse,paging,imageBoardLikeCount,commentTotalCount,imageBoardCommentCount,imageBoardLikeCountList,imgList,ibDetailPrev,ibDetailNext,prevCommentCount,nextCommentCount,aDTO} = this.state;
        let imageBoardListRender="";
        let images=[];
        if(imgList.length>0){
            for(let i = 0 ; i<imgList.length;i++){
                images.push({original:imgList[i],thumbnail:imgList[i]});
            }
        }
        //이전 글 다음글 
        let prevRender=null;
        let nextRender=null;
        if(ibDetailPrev.imageBoardNo==="0"&&ibDetailNext.imageBoardNo!=="0"){
            prevRender = 
                <Fragment>
                    <div className="prev">이전글 |&nbsp;</div>
                    <div className="prevTitle">{ ibDetailPrev.imageBoardTitle }</div>
                    <div className="prevCommentCount"></div>
                </Fragment>
            nextRender = 
                <Fragment>
                    <div className="next">다음글 |&nbsp;</div>
                    <div className="nextTitle" onClick={this.pageMove.bind(this,`${ibDetailNext.imageBoardNo}`)}><Link to={`/imageBoardDetail/${ibDetailNext.imageBoardNo}`}>{ibDetailNext.imageBoardTitle}</Link></div>
                    <div className="nextCommentCount">[{ nextCommentCount }]</div>
                </Fragment>
        }else if(ibDetailPrev.imageBoardNo!=="0"&&ibDetailNext.imageBoardNo==="0"){
            prevRender = 
                <Fragment>
                    <div className="prev">이전글 |&nbsp;</div>
                    <div className="prevTitle" onClick={this.pageMove.bind(this,`${ibDetailPrev.imageBoardNo}`)}><Link to={`/imageBoardDetail/${ibDetailPrev.imageBoardNo}`}>{ibDetailPrev.imageBoardTitle}</Link></div>
                    <div className="prevCommentCount">[{ prevCommentCount }]</div>
                </Fragment>
            nextRender = 
                <Fragment>
                    <div className="next">다음글 |&nbsp;</div>
                    <div className="nextTitle">{ibDetailNext.imageBoardTitle}</div>
                    <div className="nextCommentCount"></div>
                </Fragment>
        }
        else if(ibDetailPrev.imageBoardNo!=="0"&&ibDetailNext.imageBoardNo!=="0"){
            prevRender = 
                <Fragment>
                    <div className="prev">이전글 |&nbsp;</div>
                    <div className="prevTitle" onClick={this.pageMove.bind(this,`${ibDetailPrev.imageBoardNo}`)}><Link to={`/imageBoardDetail/${ibDetailPrev.imageBoardNo}`}>{ibDetailPrev.imageBoardTitle}</Link></div>
                    <div className="prevCommentCount">[{ prevCommentCount }]</div>
                </Fragment>
            nextRender = 
                <Fragment>
                    <div className="next">다음글 |&nbsp;</div>
                    <div className="nextTitle" onClick={this.pageMove.bind(this,`${ibDetailNext.imageBoardNo}`)}><Link to={`/imageBoardDetail/${ibDetailNext.imageBoardNo}`}>{ ibDetailNext.imageBoardTitle }</Link></div>
                    <div className="nextCommentCount">[{ nextCommentCount }]</div>
                </Fragment>
        }
        else{
            prevRender = 
                <Fragment>
                    <div className="prev">이전글</div>
                    <div className="prevTitle">{ibDetailPrev.imageBoardTitle}</div>
                    <div className="prevCommentCount"></div>
                </Fragment>
            nextRender = 
                <Fragment>
                    <div className="next">다음글</div>
                    <div className="nextTitle">{ibDetailNext.imageBoardTitle}</div>
                    <div className="nextCommentCount"></div>
                </Fragment>
        }
  
        return(
            <Fragment>
                <div className="padTop124">
                    <div className="padLR">
                        <div className="sponserBanner">
                            <div className="sponDiv">
                                <img style={{paddingTop:5,height:"20vw"}}  src={ aDTO.adImg } />
                            </div>
                        </div>
                    </div>
                    <div style={{display:"flex",paddingTop:10}} className="padLR">
                        <img src={"http://placehold.it/300x200"} className="imgInstaUserImg" />
                        <div style={{fontSize:"14px",display:"grid", gridTemplateRows: "1fr 1fr 1fr"}}>
                            <div style={{gridRow:2 }}>김한결</div>
                        </div>
                    </div>
                    <div className="imageGalWidth">
                    <ImageGallery
                    items={images} 
                    showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton} 
                    showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton} 
                    showThumbnails={this.state.showThumbnails}/> 
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between"}} className="padLR">
                        <img src="http://placehold.it/72x72"  style={{height:"100%"}}alt=""/>
                        <div>
                            <div><i className="fa fa-thumbs-up">{imageBoardLikeCount}개</i></div>
                            <div><i className="fa fa-comment">{commentTotalCount} 개</i></div>
                            <div><i className="fa fa-clock-o">{ibDetailResponse.imageBoardRegdate.split(" ")[0]}</i></div>
                        </div>
                    </div>
                    
                    <div className="padLR">
                        <div className="commentTable">
                            {/* <div className="commentTableTop">
                                댓글 {commentTotalCount}개
                            </div>
                            {commentListRender}
                            {addCommentRender}
                            {loginCommentRender} */}
                            <div className="commentTableMovePrev">
                                {prevRender}
                            </div>
                            <div className="commentTableMoveNext">
                                {nextRender}
                            </div>
                        </div>
                    </div> 
                </div>
            </Fragment>
        )
    }
}
export default ImageBoardDetail;