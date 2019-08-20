import React,{ Component,Fragment } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import extra from '../../images/extra.png';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.bubble.css";
import defaultUser from '../../images/default-user.png';
import ImageBoardList from "../mainPage/ImageBoardList"
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
         imageBoardTotalCount:"",
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
                imageBoardNo:"",
                userNo:"",
                userProfilePath:"",
            }
        ],
        ibLikeCount:"",
        aDTO:"",
        uDTO:"",
        recommentTotalCount:"",
        recommentListResponse:[
            {
                recommentNo:"",
                recommentContent:"",
                recommentRegdate:"",
                recommentWriter:"",
                userProfilePath:"",
            }
        ],
        recommentPaging:[
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
        addCommentPagenum:1,
        addRecommentPagenum:1,
        commentNoThis:"",
        likeComment:[
            {
                likeCheck:"",
                commentNo:"",
                imageBoardNo:"",
                userNo:""
            }
        ],
        commentTitleInsert:"",
        recommentTitleInsert:"",
        likeCommentCount:"",
        recommentUpd:"",
        commentUpd:""
    }
    async componentDidMount(){
        const response = await axios.get(`http://15.164.160.236:8080/imageBoards/detail/${this.state.ibDetailResponse.imageBoardNo}`)
        const response2 = await axios.get(`http://15.164.160.236:8080/imageBoardComments/list/${this.state.ibDetailResponse.imageBoardNo}/1`)
        const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
        this.setState({
            ibDetailResponse:response.data.ibDTO,
            paging:response2.data.paging,
            imageBoardCommentCount:response.data.imageBoardCommentCount,
            imageBoardLikeCountList:response.data.imageBoardLikeCountList,
            imageBoardTotalCount:response.data.imageBoardTotalCount,
            commentListResponse:response2.data.cList,
            commentTotalCount:response2.data.commentTotalCount,
            imageBoardLikeCount:response.data.imageBoardLikeCount,
            imgList:response.data.imgList,
            ibDetailPrev:response.data.prevDTO,
            ibDetailNext:response.data.nextDTO,
            prevCommentCount: response.data.prevCommentCount,
            nextCommentCount: response.data.nextCommentCount,
            adExposeList: exposeAd.data.adExposeList,
            aDTO:exposeAd.data.aDTO,
            uDTO:JSON.parse(sessionStorage.getItem('uDTO')),
        })
        window.scrollTo(0,0)
    }
     //페이지 이동 클릭시
     async pageMove(imageBoardNo){
        const response = await axios.get(`http://15.164.160.236:8080/imageBoards/detail/${imageBoardNo}`)
        const response2 = await axios.get(`http://15.164.160.236:8080/imageBoardComments/list/${imageBoardNo}/1`)
        const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
        this.setState({
            ibDetailResponse:response.data.ibDTO,
            paging:response2.data.paging,
            imageBoardTotalCount:response.data.imageBoardTotalCount,
            ibDetailPrev:response.data.prevDTO,
            ibDetailNext:response.data.nextDTO,
            imgList:response.data.imgList,
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
       
        document.getElementById('noticeExtraWin').style.display='none';
        let extraWinCount = document.getElementsByClassName('extraWin')
        for(let i = 0; i < extraWinCount.length; i++){
            document.getElementsByClassName('extraWin')[i].style.display='none';
        }
         window.scrollTo(0,0)
    }
    //////////////////////////////////////////////////////////////////////////
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
    //좋아요 클릭
    // async likeComCheck(commentNo,likeCheck,index){
    //     if(this.state.uDTO===null){
    //      alert('로그인 이후에 이용가능합니다.')
    //      return false;
    //     }else{
    //          const response = await axios.post("http://15.164.160.236:8080/comments/likeUp",{
    //              userNo:this.state.uDTO.userNo,
    //              commentNo:commentNo,
    //              likeCheck:likeCheck,
    //              imageBoardNo:this.state.ntDetailResponse.imageBoardNo
    //          }) 
    //          this.setState({
    //              likeComment:response.data.result,
    //              likeCommentCount:response.data.likeCommentCount
    //          })
 
    //          let likeCommentCount = document.getElementsByClassName('likeCommentCount')
    //          for(let i = 0; i<likeCommentCount.length;i++ ){
    //              let getVal =likeCommentCount[i].getAttribute('value');
    //                  if(getVal===commentNo){
    //                      likeCommentCount[i].innerHTML='<i class="fa fa-thumbs-up"></i>&nbsp;'+this.state.likeCommentCount
    //                      if(likeCommentCount[i].style.borderColor==="red"){
    //                          likeCommentCount[i].style.borderColor="black"
    //                          likeCommentCount[i].style.color="black"
    //                      }else{
    //                          likeCommentCount[i].style.borderColor="red"
    //                          likeCommentCount[i].style.color="red"
    //                      }
    //                  }
    //          }
    //     }
    //  }
    //댓글 더보기 클릭시
    async addCommentList(){
        const response = await axios.get(`http://15.164.160.236:8080/imageBoardComments/list/${this.state.ibDetailResponse.imageBoardNo}/${this.state.addCommentPagenum+1}`)
        if(response.data.cList!==null){
            this.setState({
                commentListResponse:this.state.commentListResponse.concat(response.data.cList),
                commentTotalCount:response.data.commentTotalCount,
                paging:response.data.paging,
                addCommentPagenum:this.state.addCommentPagenum+1,
                cLikeCountList:response.data.cLikeCountList,
            }) 
        }
        let likeCommentCount = document.getElementsByClassName('likeCommentCount')
        for(let i = 0; i<likeCommentCount.length;i++ ){
            let getVal =likeCommentCount[i].getAttribute('value');
            for(let j=0; j<this.state.cLikeCountList.length;j++){
                if(getVal===this.state.cLikeCountList[j].commentNo){
                    likeCommentCount[i].innerHTML="<i class='fa fa-thumbs-up'></i>&nbsp;"+this.state.cLikeCountList[j].likeUpCnt
                    if(this.state.uDTO.userNo===this.state.cLikeCountList[j].userNo){
                        likeCommentCount[i].style.color="red"
                        likeCommentCount[i].style.borderColor="red"
                    }
                }
            }
        }
    }
    //댓글 등록 클릭시
    async commentRegister(imageBoardNo,userNo){
        if(this.state.commentTitleInsert===""){
            alert('댓글을 입력해주세요')
            return false;
        }else if(this.state.commentTitleInsert.length>=100){
            alert('댓글은 최대 100자 이내입니다.');
            return false;
        }else{
            const response = await axios.post(`http://15.164.160.236:8080/imageBoardComments/register/`,
            {
                imageBoardNo:this.state.ibDetailResponse.imageBoardNo,
                userNo:this.state.uDTO.userNo,
                commentWriter:this.state.uDTO.userName,
                commentContent:this.state.commentTitleInsert
            })
            const response2 = await axios.get(`http://15.164.160.236:8080/imageBoardComments/list/${imageBoardNo}/1`)
            const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
            this.setState({
                commentListResponse:response2.data.cList,
                commentTotalCount:response2.data.commentTotalCount,
                commentTitleInsert:"",
                paging:response2.data.paging,
                adExposeList: exposeAd.data.adExposeList,
                aDTO:exposeAd.data.aDTO
            }) 
            document.getElementsByClassName('commentTableReg')[0].value="";
        }
    }

    //댓글 등록 textarea 입력
    commentTitleInsert(e){
        this.setState({
            commentTitleInsert: e
        })
    }
    recommentTitleInsert(e){
        this.setState({
            recommentTitleInsert: e
        })
    }
    // 댓글 대댓글 textarea 입력
    commentUpd(e){
        console.log(e)
        this.setState({
            commentUpd: e
        })
    }
    recommentUpd(e){
        this.setState({
            recommentUpd: e
        })
    }
    //대댓글(답글) 등록
    async recommentRegister(imageBoardNo){
        if(this.state.recommentTitleInsert===""){
            alert('답글을 입력해주세요')
            return false;
        }else if(this.state.recommentTitleInsert.length>=30){
            alert('답글은 최대 30자 이내입니다.');
            return false;
        }else{
            const response = await axios.post(`http://15.164.160.236:8080/imageBoardRecomments/register/`,
            {
                imageBoardNo:this.state.ibDetailResponse.imageBoardNo,
                userNo:this.state.uDTO.userNo,
                commentNo:this.state.commentNoThis,
                recommentWriter:this.state.uDTO.userName,
                recommentContent:this.state.recommentTitleInsert
            })
            const response2 = await axios.get(`http://15.164.160.236:8080/imageBoardRecomments/list/${imageBoardNo}/${this.state.commentNoThis}/1`)
            const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
            this.setState({
                recommentListResponse:response2.data.cList,
                recommentTotalCount:response2.data.recommentTotalCount,
                recommentTitleInsert:"",
                recommentPaging:response2.data.paging,
                adExposeList: exposeAd.data.adExposeList,
                aDTO:exposeAd.data.aDTO
            }) 
            document.getElementsByClassName('commentTableReg')[0].value="";
        }
    }
    //대댓글(답글) 더보기 클릭시
    async addRecommentList(){                
        const response = await axios.get(`http://15.164.160.236:8080/imageBoardRecomments/list/${this.state.ibDetailResponse.imageBoardNo}/${this.state.commentNoThis}/${parseInt(this.state.addRecommentPagenum)+1}`)
        if(response.data.cList!==null){
            this.setState({
                recommentListResponse:this.state.recommentListResponse.concat(response.data.cList),
                recommentTotalCount:response.data.recommentTotalCount,
                recommentPaging:response.data.paging,
                addRecommentPagenum:this.state.addRecommentPagenum+1
            }) 
        }

    }
    //답글 보여주기 가리기 리스트
    async toggleShHi(commentno){
        console.log(commentno)
        const response = await axios.get(`http://15.164.160.236:8080/imageBoardRecomments/list/${this.state.ibDetailResponse.imageBoardNo}/${commentno}/1`)
        this.setState({
            recommentPaging:response.data.paging,
            recommentListResponse:response.data.cList,
            recommentTotalCount:response.data.recommentTotalCount,
            addRecommentPagenum:1,
            commentNoThis:commentno,
        })
        const recommentListClass = document.getElementsByClassName('recommentListClass');
        for(let i = 0; i<recommentListClass.length;i++){
            if(commentno===recommentListClass[i].getAttribute('value')){
                if(recommentListClass[i].style.display==="block"){
                    recommentListClass[i].style.display="none";
                }else{
                    recommentListClass[i].style.display="block"
                }
            }else{
                recommentListClass[i].style.display="none";
            }
        }
        
    }
    //댓글더보기 extra
    addMoreSel(imageBoardNo, commentNo){
        const extra = document.querySelector(`.extraWin${imageBoardNo+'-'+commentNo}`) 
        if(extra.style.display==="none"){
            extra.style.display="block";
            extra.style.position="absolute";
            extra.style.left="70vw";
            extra.style.marginTop="-2vh"
        }else if((extra.style.display!=="none")){
            extra.style.display="none";
        }
    }
    //대댓글 더보기 extra
    addMoreReSel(imageBoardNo,commentNo,recommentNo){
        const extraWin = document.getElementsByClassName(`extraWinRecom${imageBoardNo+'-'+commentNo+'-'+recommentNo}`);
        for(var i = 0 ; i<extraWin.length;i++){
            if(recommentNo===extraWin[i].getAttribute('value')){
                if(extraWin[i].style.display==="block"){
                    extraWin[i].style.display="none"
                }else{
                    extraWin[i].style.display="block"
                    extraWin[i].style.position="absolute";
                    extraWin[i].style.left="70vw";
                    extraWin[i].style.marginTop="-2vh"
                }
            }else{
                extraWin[i].style.display="none";
            }
        }
    }
 //댓글 삭제
 async commentDelete(imageBoardNo,commentNo){
    let result = window.confirm("댓글을 삭제하시겠습니까? <댓글 및 관련 답글이 삭제됩니다.>");
    if(result){
        const response = await axios.delete(`http://15.164.160.236:8080/imageBoardComments/delete/${commentNo}`)
        if(response.status===200){
            const response = await axios.get(`http://15.164.160.236:8080/imageBoardComments/list/${imageBoardNo}/1`)
            const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
            this.setState({
                commentListResponse:response.data.cList,
                commentTotalCount:response.data.commentTotalCount,
                cLikeCountList:response.data.cLikeCountList,
                paging:response.data.paging,
                adExposeList: exposeAd.data.adExposeList,
                aDTO:exposeAd.data.aDTO
            })
        const extra = document.getElementsByClassName("extraWin")
        const recomExtra = document.getElementsByClassName("extraWinRecom")
        for(let i = 0; i<extra.length;i++){
            extra[i].style.display="none"
            recomExtra[i].style.display="none"
        } 
        }else{
            alert('댓글 삭제에 실패하였습니다.')
        }
    }
    let likeCommentCount = document.getElementsByClassName('likeCommentCount')
    for(let i = 0; i<likeCommentCount.length;i++ ){
        let getVal =likeCommentCount[i].getAttribute('value');
        for(let j=0; j<this.state.cLikeCountList.length;j++){
            if(getVal===this.state.cLikeCountList[j].commentNo){
                likeCommentCount[i].innerHTML="<i class='fa fa-thumbs-up'></i>&nbsp;"+this.state.cLikeCountList[j].likeUpCnt
                if(this.state.uDTO.userNo===this.state.cLikeCountList[j].userNo){
                    likeCommentCount[i].style.color="red"
                    likeCommentCount[i].style.borderColor="red"
                }
            }
        }
    }
}
//대댓글 삭제
async recommentDelete(recommentNo){
    let result = window.confirm("답글을 삭제하시겠습니까? <답글이 삭제됩니다.>");
    if(result){
        const response = await axios.delete(`http://15.164.160.236:8080/imageBoardRecomments/delete/${recommentNo}`)
        if(response.status===200){
            const response = await axios.get(`http://15.164.160.236:8080/imageBoardRecomments/list/${this.state.ibDetailResponse.imageBoardNo}/${this.state.commentNoThis}/1`)
            const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
            this.setState({
                recommentListResponse:response.data.cList,
                recommentTotalCount:response.data.recommentTotalCount,
                paging:response.data.paging,
                adExposeList: exposeAd.data.adExposeList,
                aDTO:exposeAd.data.aDTO
            })
        const extra = document.getElementsByClassName("extraWinRecom")
        for(let i = 0; i<extra.length;i++){
            extra[i].style.display="none"
        } 
        }else{
            alert('답글 삭제에 실패하였습니다.')
        }
    }
}
  // 게시물 신고
  async noticeReport(imageBoardNo) {
    if(this.state.uDTO === null) {
        alert("로그인 후 이용이 가능합니다")
        return false;
    } else {
        alert("준비중")
        return false;
    }
}
// 대댓글 신고
async recommentReport(recommentNo){
    if(this.state.uDTO === null) {
        alert("로그인 후 이용이 가능합니다")
        return false;
    } else {
        alert("준비중")
        return false;
    }
}
// 댓글 수정 창
async comModifyWin(imageBoardNo, commentNo){
    const result = await axios.get(`http://15.164.160.236:8080/imageBoardComments/detail/${imageBoardNo}/${commentNo}`)
    console.table(result.data)
    this.setState({
        commentUpd: result.data
    })
    document.querySelector(`.extraWin${imageBoardNo+'-'+commentNo}`).style.display='none';
    const contentWin = document.querySelector(`.comContentWin${imageBoardNo+'-'+commentNo}`)
    const modifyWin = document.querySelector(`.comModifyWin${imageBoardNo+'-'+commentNo}`)
    contentWin.style.display='none';
    modifyWin.style.display='block';
}

// 댓글 수정 취소
comModifyCancel(imageBoardNo, commentNo){
    const contentWin = document.querySelector(`.comContentWin${imageBoardNo+'-'+commentNo}`)
    const modifyWin = document.querySelector(`.comModifyWin${imageBoardNo+'-'+commentNo}`)
    let result = window.confirm("수정을 취소하시겠습니까?");
    if(result){
        contentWin.style.display='block';
        modifyWin.style.display='none';
    } else {
        contentWin.style.display='none';
        modifyWin.style.display='block';
    }
}
// 댓글 수정 보내기
async comModifySubmit(imageBoardNo, commentNo) {
    if(this.state.commentUpd === '<p><br></p>' || this.state.commentUpd === '<p><br></p><p><br></p>'){
        alert('내용을 입력하세요');
        return false;
    }
    const updSubmit = await axios.put(`http://15.164.160.236:8080/imageBoardComments/update`,{
        imageBoardNo: imageBoardNo,
        commentNo: commentNo,
        commentContent: this.state.commentUpd
    })
  
    if(updSubmit.status === 200){
        const contentWin = document.querySelector(`.comContentWin${imageBoardNo+'-'+commentNo}`)
        const modifyWin = document.querySelector(`.comModifyWin${imageBoardNo+'-'+commentNo}`)
        //window.location.reload(); // 새로고침하지말고 concat 으로 더해주셈
        const response2 = await axios.get(`http://15.164.160.236:8080/imageBoardComments/list/${imageBoardNo}/1`)
        const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
        this.setState({
            commentListResponse:response2.data.cList,
            commentTotalCount:response2.data.commentTotalCount,
            paging:response2.data.paging,
            adExposeList:exposeAd.data.adExposeList,
            aDTO:exposeAd.data.adExposeList,
            commentUpd:""
        })
        contentWin.style.display='block';
        modifyWin.style.display='none';
    } else {
        alert("일시적 오류입니다. 지속될 경우 관리자에게 문의하세요.")
        return false;
    }
}
// 대댓글 수정 보내기
async recomModifySubmit(imageBoardNo, commentNo,  recomNo){
    if(this.state.recommentUpd === '<p><br></p>' || this.state.recommentUpd === '<p><br></p><p><br></p>'){
        alert('내용을 입력하세요');
        return false;
    }
    const updSubmit = await axios.put(`http://15.164.160.236:8080/imageBoardRecomments/update`,{
        imageBoardNo: imageBoardNo,
        commentNo: commentNo,
        recommentNo: recomNo,
        recommentContent: this.state.recommentUpd
    })
    if(updSubmit.status === 200){
        window.location.reload();
    } else {
        alert("일시적 오류입니다. 지속될 경우 관리자에게 문의하세요.")
        return false;
    }
}
// 대댓글 수정
async recomModifyWin(imageBoardNo,commentNo,recommentNo) {
    console.log(imageBoardNo, commentNo, recommentNo)
    const result = await axios.get(`http://15.164.160.236::8080/imageBoardRecomments/detail/${imageBoardNo}/${commentNo}/${recommentNo}`)
    this.setState({
        recommentUpd: result.data
    })
    const extraWin = document.getElementsByClassName(`extraWinRecom${imageBoardNo+'-'+commentNo+'-'+recommentNo}`)
    const contentWin = document.getElementsByClassName(`recomContentWin${imageBoardNo+'-'+commentNo+'-'+recommentNo}`)
    const modifyWin = document.getElementsByClassName(`recomModifyWin${imageBoardNo+'-'+commentNo+'-'+recommentNo}`)
    for(var i=0; i<extraWin.length; i++){
        extraWin[i].style.display = 'none';
        if(recommentNo===extraWin[i].getAttribute('value')){
            contentWin[i].style.display='none';
            modifyWin[i].style.display='block';
        } else {
            contentWin[i].style.display='block';
            modifyWin[i].style.display='none';
        }
    }
}
// 대댓글 수정 취소
recomModifyCancel(imageBoardNo,commentNo,recomNo){
    const contentWin = document.getElementsByClassName(`recomContentWin${imageBoardNo+'-'+commentNo+'-'+recomNo}`)
    const modifyWin = document.getElementsByClassName(`recomModifyWin${imageBoardNo+'-'+commentNo+'-'+recomNo}`)
    let result = window.confirm("수정을 취소하시겠습니까?");
    for(var i=0; i<contentWin.length; i++){
        if(result){
            contentWin[i].style.display='block';
            modifyWin[i].style.display='none';
        } else {
            contentWin[i].style.display='none';
            modifyWin[i].style.display='block';    
        }
    }
}
async noticeDel(imageBoardNo) {
    const noticeDel = await axios.put(`http://15.164.160.236:8080/imageBoards/delete/${imageBoardNo}`)
    if(noticeDel.status !== 200) {
        alert("포토 게시물을 삭제하였습니다")
        this.props.history.push('/imageBoardList')
        return <Fragment><ImageBoardList/></Fragment>
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
     // imageBoard extra
     noticeExtra(){
        const extra = document.getElementById('noticeExtraWin')
        if(extra.style.display==="none"){
            extra.style.display="block";
            extra.style.position="absolute";
            extra.style.left="70vw";
            extra.style.marginTop="3vh"
        } else if(extra.style.display!=='none'){
            extra.style.display='none'
        }
    }
    render(){
        let {ibDetailResponse,paging,imageBoardTotalCount,imageBoardLikeCount,commentTotalCount,imageBoardCommentCount,commentListResponse,imageBoardLikeCountList,imgList,ibDetailPrev,ibDetailNext,prevCommentCount,nextCommentCount,aDTO ,recommentPaging,recommentListResponse ,recommentTotalCount} = this.state;
        let imageBoardListRender="";
        let images=[];
        if(imgList.length>0){
            for(let i = 0 ; i<imgList.length;i++){
                images.push({original:imgList[i],thumbnail:imgList[i]});
            }
        }
        //댓글 리스트 
        let commentListRender = null;
         //대댓글리스트
        let recommentListRender = null;
        let redelDecRender = null
        recommentListRender = recommentListResponse.map(function(recomRow,index){
            if(this.state.uDTO === null) {
                redelDecRender =
                <Fragment>
                    <div onClick={ this.recommentReport.bind(this, recomRow.recommentNo) }><i className="fa fa-exclamation-circle"></i> 신고</div>
                </Fragment>
            } else {
                if(this.state.uDTO.userNickName === recomRow.recommentWriter){
                    redelDecRender =
                    <Fragment>
                        <div onClick={ this.recomModifyWin.bind(this,recomRow.imageBoardNo,recomRow.commentNo,recomRow.recommentNo) } style={{paddingBottom:'12px',color:'#FFFFFF'}}><i className="fa fa-edit"></i> 수정</div>
                        <div onClick={ this.recommentDelete.bind(this,recomRow.imageBoardNo,recomRow.commentNo,recomRow.recommentNo) }><i className="fa fa-trash"></i> 삭제</div>
                    </Fragment>
                } else {
                    redelDecRender =
                    <Fragment>
                        <div onClick={ this.recommentReport.bind(this, recomRow.recommentNo) }><i className="fa fa-exclamation-circle"></i> 신고</div>
                    </Fragment>
                }
            }
            return (
                <Fragment key={index}>
                    <div style={{border:0 , marginTop:20, paddingBottom:20, borderBottom:"1px solid #eee"}}>
                        <div className="commentTableContentTop" style={{display:"flex",justifyContent:"space-between"}}>
                            <div style={{paddingLeft:15,paddingRight:15}}><img src={recomRow.userProfilePath} className="commentWriterProfile" />&nbsp;{recomRow.recommentWriter} | {recomRow.recommentRegdate}</div>
                            <div><img src={extra} alt='더보기' onClick={this.addMoreReSel.bind(this,recomRow.imageBoardNo,recomRow.commentNo,recomRow.recommentNo)} className='extraBtn' /></div>
                        </div>
                        <div className="commentTableContentBody" style={{display:"flex",justifyContent:"space-between"}}>
                            <div style={{display:"flex",justifyContent:"space-between"}} className={`recomContentWin${recomRow.imageBoardNo+'-'+recomRow.commentNo+'-'+recomRow.recommentNo}`} style={{width:'100%'}}>
                                <ReactQuill theme="bubble" value={ recomRow.recommentContent } readOnly />
                            </div>
                            <div className={`extraWinRecom${recomRow.imageBoardNo+'-'+recomRow.commentNo+'-'+recomRow.recommentNo}`} value={recomRow.recommentNo} style={{display:'none'}}>
                                <div className="extraWinRecom">
                                    { redelDecRender }
                                </div>
                            </div>
                            <div className={`recomModifyWin${recomRow.imageBoardNo+'-'+recomRow.commentNo+'-'+recomRow.recommentNo}`} style={{display:'none',width:'100%'}}>
                                <div className="commentTableReg">
                                    <ReactQuill theme="bubble" 
                                                value={ this.state.recommentUpd } 
                                                onChange={this.recommentUpd.bind(this)} />
                                    <hr />
                                    <div className="commentTableRegButton">
                                        <span onClick={this.recomModifyCancel.bind(this,recomRow.imageBoardNo,recomRow.commentNo,recomRow.recommentNo)} style={{cursor:'pointer'}}>취소</span>
                                        &nbsp;
                                        <span onClick={this.recomModifySubmit.bind(this,recomRow.imageBoardNo,recomRow.commentNo,recomRow.recommentNo)} style={{cursor:'pointer'}}>수정</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )    
        },this)
        //대댓글 더보기 
        let addRecommentListRender = null;
        if(this.state.recommentPaging.endPage===1||this.state.addRecommentPagenum===this.state.recommentPaging.endPage||this.state.recommentPaging.totalcount===0){
            addRecommentListRender=""
        }else if(this.state.recommentPaging.endPage>1){
            addRecommentListRender=
            <Fragment>
                <div onClick={this.addRecommentList.bind(this)} style={{marginTop:20,marginBottom:20,paddingTop:8,paddingBottom:8,paddingLeft:12,paddingRight:12,border:"0.5px solid black",backgroundColor:"rgb(37 79 110)",color:"white",cursor:"pointer",textAlign:"center"}}>더보기 +</div>
            </Fragment>
        }
         //로그인 한 사용자만 댓글 , 대댓글
         let loginCommentRender=null;
         let loginReCommentRender=null;
         if(this.state.uDTO!=null){
             loginCommentRender=
                 <Fragment>
                     <div className="commentTableReg">
                         <ReactQuill theme="bubble"
                                     onChange={this.commentTitleInsert.bind(this)} 
                                     value={ this.state.commentTitleInsert }
                                     placeholder="댓글을 입력해 주세요."/>
                         <hr />
                         <div className="commentTableRegButton">
                             <span style={{cursor:'pointer'}} onClick={this.commentRegister.bind(this,`${ibDetailResponse.imageBoardNo}`,`${this.state.uDTO.userNo}`)}>등록</span>
                         </div>
                     </div>
                 </Fragment>
             loginReCommentRender=
                 <Fragment>
                     <div className="commentTableReg">
                         <ReactQuill theme="bubble"
                                     onChange={this.recommentTitleInsert.bind(this)}
                                     value={ this.state.recommentTitleInsert }
                                     placeholder="답글을 입력해 주세요." />
                         <hr />
                         <div className="commentTableRegButton">
                             <span style={{cursor:'pointer'}} onClick={this.recommentRegister.bind(this,`${ibDetailResponse.imageBoardNo}`)}>등록</span>
                         </div>
                     </div>
                 </Fragment>
         }
          //댓글 더보기
        let addCommentRender=null;
        if(this.state.paging.endPage===1||this.state.addCommentPagenum===this.state.paging.endPage||this.state.paging.totalcount===0){
            addCommentRender=""
        }else if(this.state.paging.endPage>1){
            addCommentRender=
            <Fragment>
                <div onClick={this.addCommentList.bind(this)} style={{marginTop:20,marginBottom:20,paddingTop:8,paddingBottom:8,paddingLeft:12,paddingRight:12,border:"0.5px solid black",backgroundColor:"rgb(37 79 110)",color:"white",cursor:"pointer",textAlign:"center"}}>더보기 +</div>
            </Fragment>
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
        // 수정, 삭제 버튼 만들기
        let infoButton = null;
        if(this.state.uDTO === null) {
        infoButton =
            <Fragment>
                 <div><i className="fa fa-exclamation-circle"></i> 신고</div>
                {/* <div onClick={ this.noticeReport.bind(this) }><i className="fa fa-exclamation-circle"></i> 신고</div> */}
            </Fragment>   
        } else {
            if(this.state.uDTO.userNickName === ibDetailResponse.imageBoardWriter){
                infoButton =
                <Fragment>
                    <Link to={`/imageBoardModify/${ ibDetailResponse.imageBoardNo }`}><div style={{paddingBottom:'12px',color:'#FFFFFF'}}><i className="fa fa-edit"></i> 수정</div></Link>
                    <div><i className="fa fa-trash"></i> 삭제</div>
                    {/* <div onClick={ this.noticeDel.bind(this, ibDetailResponse.imageBoardNo) }><i className="fa fa-trash"></i> 삭제</div> */}
                </Fragment>
            } else {
                infoButton = 
                <Fragment>
                    <div><i className="fa fa-exclamation-circle"></i> 신고</div>
                    {/* <div onClick={ this.noticeReport.bind(this) }><i className="fa fa-exclamation-circle"></i> 신고</div> */}
                </Fragment>
            }
        }
        let delDecRender = null
        commentListRender = commentListResponse.map(function(comment,index){
            if(this.state.uDTO!==null){
                if(comment.userNo===this.state.uDTO.userNo){
                    delDecRender=
                        <Fragment>
                            <div onClick={ this.comModifyWin.bind(this,comment.imageBoardNo,comment.commentNo)} style={{paddingBottom:'12px',color:'#FFFFFF'}}><i className="fa fa-edit"></i> 수정</div>
                            <div onClick={this.commentDelete.bind(this,comment.imageBoardNo,comment.commentNo)}><i className="fa fa-trash"></i> 삭제</div>
                        </Fragment>
                }else{
                    delDecRender=
                    <Fragment>
                        <div><i className="fa fa-exclamation-circle"></i> 신고</div>
                    </Fragment>
                }
            }else{
                delDecRender=
                    <Fragment>
                        <div><i className="fa fa-exclamation-circle"></i> 신고</div>
                    </Fragment>
            }
            return(
                <Fragment key={index}>
                    <div style={{border:0 , marginTop:20, paddingBottom:20, borderBottom:"1px solid #eee"}}>
                        <div className="commentTableContentTop">
                            <div><img src={ comment.userProfilePath } className="commentWriterProfile" />&nbsp;{comment.commentWriter} | {comment.commentRegdate.split(" ")[0]}</div>
                            <div><img src={extra} alt='더보기' onClick={this.addMoreSel.bind(this,comment.imageBoardNo,comment.commentNo)} className='extraBtn' /></div>
                        </div>
                        <div className="commentTableContentBody" style={{display:"flex",justifyContent:"space-between"}}>
                            <div style={{display:"flex",justifyContent:"space-between"}} className={`comContentWin${comment.imageBoardNo+'-'+comment.commentNo}`} style={{width:'100%'}}>
                                <ReactQuill theme="bubble" value={ comment.commentContent } style={{minWidth:'100%'}} readOnly />
                            </div>
                            <div className={`extraWin${comment.imageBoardNo+'-'+comment.commentNo}`} style={{display:'none'}} >
                                <div className="extraWin">
                                    {delDecRender}
                                </div>
                            </div>
                            <div className={`comModifyWin${comment.imageBoardNo+'-'+comment.commentNo}`} style={{display:'none',width:'100%'}}>
                                <div className="commentTableReg">
                                    <ReactQuill theme="bubble"
                                                onChange={ this.commentUpd.bind(this) }
                                                value={ this.state.commentUpd } />
                                    <hr />
                                    <div className="commentTableRegButton">
                                        <span onClick={this.comModifyCancel.bind(this,comment.imageBoardNo,comment.commentNo)} style={{cursor:'pointer'}}>취소</span>
                                        &nbsp;
                                        <span onClick={this.comModifySubmit.bind(this,comment.imageBoardNo,comment.commentNo)} style={{cursor:'pointer'}}>수정</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{paddingTop:15,display:"flex",justifyContent:"space-between"}}>
                            <span className="recommentListShow" onClick={this.toggleShHi.bind(this,comment.commentNo)} style={{paddingTop:8,paddingBottom:8,paddingLeft:12,paddingRight:12,border:"0.5px solid black",backgroundColor:"rgb(37 79 110)",color:"white",cursor:"pointer"}}>답글</span>
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                               {/* <span className="likeCommentCount" value={comment.commentNo} onClick={this.likeComCheck.bind(this,comment.commentNo,'y',index)} style={{paddingTop:8,paddingBottom:8,paddingLeft:12,paddingRight:12,marginRight:2,border:"0.5px solid black",cursor:"pointer"}}><i className='fa fa-thumbs-up'></i> 0</span>*/} 
                            </div>
                        </div>
                    <div className='recommentListClass' value={comment.commentNo} style={{display:"none",marginTop:10,backgroundColor:"#fafafa"}}>
                        <div>
                            {recommentTotalCount}개의 답글이 달렸습니다
                        </div>
                        {loginReCommentRender}
                        {recommentListRender}
                        {addRecommentListRender}
                        </div>
                    </div>
                </Fragment>
            )
        },this)

          // 공지사항 작성자 프로필 사진
          let writerProfileImg = null;
          // 댓글 작성자 프로필 사진
          let comWriterProfileImg = null;
          if(this.state.commentListResponse.commentWriterImg === null) {
              comWriterProfileImg = <img src={defaultUser} />
          } else {
              comWriterProfileImg = <img src={this.state.commentListResponse.commentWriterImg} />
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
                       
                        <div className="noticeTable">
                            <div className="noticeTableTopFlex" style={{borderBottom: "1px solid rgb(228 228 228)"}}>
                                <div className="boardTitle">포토 게시판</div>
                                <div className="moreButton">전체 {imageBoardTotalCount}건</div>
                            </div>
                            <div className="noticeTableTitle">
                                {ibDetailResponse.imageBoardTitle}
                                <div onClick={ this.noticeExtra.bind(this) } style={{fontSize:'12px',color:'#A1A1A1'}}><img src={ extra } className="extraBtn" /></div>
                                <div id="noticeExtraWin" style={{display:'none'}}>
                                    { infoButton }
                                </div>
                            </div>
                            <div style={{display:"flex",paddingTop:10}} className="padLR">
                                <img src={"http://placehold.it/300x200"} className="imgInstaUserImg" />
                                <div style={{fontSize:"14px",display:"grid", gridTemplateRows: "1fr 1fr 1fr"}}>
                                    <div style={{gridRow:2 }}>{ibDetailResponse.imageBoardWriter}</div>
                                </div>
                            </div>
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
                        <img src="http://placehold.it/96x96"  style={{height:"100%"}}alt=""/>
                        <div>
                            <div><i className="fa fa-users"></i>{ibDetailResponse.imageBoardReadcount} 회</div>
                            <div><i className="fa fa-thumbs-up"></i>{imageBoardLikeCount} 개</div>
                            <div><i className="fa fa-comment"></i>{commentTotalCount} 개</div>
                            <div><i className="fa fa-clock-o"></i>{ibDetailResponse.imageBoardRegdate.split(" ")[0]}</div>
                        </div>
                    </div>
                    
                    <div className="padLR">
                        <div className="commentTable">
                             <div className="commentTableTop">
                                댓글 {commentTotalCount}개
                            </div>
                            {/* {commentListRender}
                             */}
                             {commentListRender}
                             {addCommentRender}
                            {loginCommentRender}
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