import React,{ Component,Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import like from '../../../images/like.png';
import "react-quill/dist/quill.bubble.css";
import defaultUser from '../../../images/default-user.png';
import NoticeList from './NoticeList';
import ExtraWin from './win/ExtraWin';
import ComExWin from './win/ComExtraWin';
import RecomExWin from './win/RecomExtraWin';

class NoticeDetail extends Component{
    
    state={
        noticeTotalCount:"",
        ntDetailPrev:[
            {
                noticeNo:"",
                noticeTitle:""
            }
        ],
        ntDetailNext:[
            {
                noticeNo:"",
                noticeTitle:""
            }
        ],
        ntDetailResponse:[
            {
                noticeNo:this.props.match.params.notice,
                noticeTitle:"",
                noticeContent:"",
                noticeRegdate:"",
                noticeWriter:"",
                noticeReadcount:"",
            }
        ],
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
        commentTitleInsert:"",
        recommentTitleInsert:"",
        uDTO:"",
        noticeLikeCount:"",
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
                noticeNo:"",
                userNo:""
            }
        ],
        likeCommentCount:"",
        editorHtml:"",
        commentHtml:'',
        recommentHtml:'',
        prevCommentCount: '',
        nextCommentCount: '',
        commentOrin: '',
        recommentOrin: '',
        commentUpd: '',
        recommentUpd: '',
        tempCommentNo:'',
        tempRecommentNo:'',
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
        shown: true
    }    
    toggle() {
        this.setState({
            shown: !this.state.shown
        });
    }
    //초기 나오는 화면
    async componentDidMount(noticeNo){
        window.scrollTo(0,0)
        const response = await axios.get(`http://15.164.160.236:8080/notices/detail/${this.state.ntDetailResponse[0].noticeNo}`)
        const response2 = await axios.get(`http://15.164.160.236:8080/comments/list/${this.state.ntDetailResponse[0].noticeNo}/1`)
        const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
        this.setState({
            ntDetailResponse:response.data.nDTO,
            noticeTotalCount:response.data.noticeTotalCount,
            ntDetailPrev:response.data.prevDTO,
            ntDetailNext:response.data.nextDTO,
            noticeLikeCount:response.data.noticeLikeCount,
            commentListResponse:response2.data.cList,
            commentTotalCount:response2.data.commentTotalCount,
            paging:response2.data.paging,
            cLikeCountList:response2.data.cLikeCountList,
            uDTO:JSON.parse(sessionStorage.getItem('uDTO')),
            editorHtml: response.data.nDTO.noticeContent,
            prevCommentCount: response.data.prevCommentCount,
            nextCommentCount: response.data.nextCommentCount,
            adExposeList:exposeAd.data.adExposeList,
            aDTO:exposeAd.data.aDTO
        })
        let likeCommentCount = document.getElementsByClassName('likeCommentCount')
        for(let i = 0; i<likeCommentCount.length;i++ ){
            let getVal =likeCommentCount[i].getAttribute('value');
            for(let j=0; j<this.state.cLikeCountList.length;j++){
                if(getVal===this.state.cLikeCountList[j].commentNo){
                    likeCommentCount[i].innerHTML="<i class='fa fa-thumbs-up'></i>&nbsp;"+this.state.cLikeCountList[j].likeUpCnt
                    if(this.state.uDTO!==null){
                        if(this.state.uDTO.userNo===this.state.cLikeCountList[j].userNo){
                            likeCommentCount[i].style.color="red"
                            likeCommentCount[i].style.borderColor="red"
                        }
                    }
                }
            }
        }
    }
    //페이지 이동 클릭시
    async pageMove(noticeNo){
        const response = await axios.get(`http://15.164.160.236:8080/notices/detail/${noticeNo}`)
        const response2 = await axios.get(`http://15.164.160.236:8080/comments/list/${noticeNo}/1`)
        const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
        this.setState({
            ntDetailResponse:response.data.nDTO,
            noticeTotalCount:response.data.noticeTotalCount,
            ntDetailPrev:response.data.prevDTO,
            ntDetailNext:response.data.nextDTO,
            commentListResponse:response2.data.cList,
            commentTotalCount:response2.data.commentTotalCount,
            paging:response2.data.paging,
            prevCommentCount: response.data.prevCommentCount,
            nextCommentCount: response.data.nextCommentCount,
            editorHtml: response.data.nDTO.noticeContent,
            adExposeList: exposeAd.data.adExposeList,
            aDTO:exposeAd.data.aDTO
        }) 
        window.scrollTo(0,0)
    }
    //댓글 더보기 클릭시
    async addCommentList(){
        const response = await axios.get(`http://15.164.160.236:8080/comments/list/${this.state.ntDetailResponse.noticeNo}/${this.state.addCommentPagenum+1}`)
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
    async commentRegister(noticeNo,userNo){
        if(this.state.commentTitleInsert===""){
            alert('댓글을 입력해주세요')
            return false;
        }else if(this.state.commentTitleInsert.length>=100){
            alert('댓글은 최대 100자 이내입니다.');
            return false;
        }else{
            const response = await axios.post(`http://15.164.160.236:8080/comments/register/`,
            {
                noticeNo:this.state.ntDetailResponse.noticeNo,
                userNo:this.state.uDTO.userNo,
                commentWriter:this.state.uDTO.userName,
                commentContent:this.state.commentTitleInsert
            })
            const response2 = await axios.get(`http://15.164.160.236:8080/comments/list/${noticeNo}/1`)
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
    async recommentRegister(noticeNo){
        if(this.state.recommentTitleInsert===""){
            alert('답글을 입력해주세요')
            return false;
        }else if(this.state.recommentTitleInsert.length>=30){
            alert('답글은 최대 30자 이내입니다.');
            return false;
        }else{
            const response = await axios.post(`http://15.164.160.236:8080/recomments/register/`,
            {
                noticeNo:this.state.ntDetailResponse.noticeNo,
                userNo:this.state.uDTO.userNo,
                commentNo:this.state.commentNoThis,
                recommentWriter:this.state.uDTO.userName,
                recommentContent:this.state.recommentTitleInsert
            })
            const response2 = await axios.get(`http://15.164.160.236:8080/recomments/list/${noticeNo}/${this.state.commentNoThis}/1`)
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
        const response = await axios.get(`http://15.164.160.236:8080/recomments/list/${this.state.ntDetailResponse.noticeNo}/${this.state.commentNoThis}/${parseInt(this.state.addRecommentPagenum)+1}`)
        if(response.data.cList!==null){
            this.setState({
                noticeNo:this.state.ntDetailResponse.noticeNo,
                commentNo:this.state.commentNoThis,
                recommentListResponse:this.state.recommentListResponse.concat(response.data.cList),
                recommentTotalCount:response.data.recommentTotalCount,
                recommentPaging:response.data.paging,
                addRecommentPagenum:this.state.addRecommentPagenum+1
            }) 
        }
    }
    //답글 보여주기 가리기 리스트
    async toggleShHi(commentno){
        const response = await axios.get(`http://15.164.160.236:8080/recomments/list/${this.state.ntDetailResponse.noticeNo}/${commentno}/1`)
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
        const exContentWin = document.querySelectorAll(`div[class^="recomContentWin"]:not(.recomContentWin${this.state.noticeNo+'-'+this.state.commentNo+'-'+this.state.recommentListResponse.recommentNo})`)
        const exModifyWin = document.querySelectorAll(`div[class^="recomModifyWin"]:not(.recomModifyWin${this.state.noticeNo+'-'+this.state.commentNo+'-'+this.state.recommentListResponse.recommentNo})`)
        for(var i=0; i<exContentWin.length; i++){
            exModifyWin[i].style.display='none'
            exContentWin[i].style.display='block'
        }
    }
    //댓글더보기 extra
    addMoreSel(noticeNo, commentNo){
        const extra = document.querySelector(`.extraWin${noticeNo+'-'+commentNo}`)
        if(extra.style.display==="none"){
            extra.style.display="block";
            extra.style.position="absolute";
            extra.style.left="70vw";
            extra.style.marginTop="-2vh"
        } else { // 닫기
            extra.style.display="none";
        }
    }
    //대댓글 더보기 extra
    addMoreReSel(noticeNo,commentNo,recommentNo){
        const extraWin = document.getElementsByClassName(`extraWinRecom${noticeNo+'-'+commentNo+'-'+recommentNo}`);
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
    async commentDelete(noticeNo,commentNo){
        let result = window.confirm("댓글을 삭제하시겠습니까? <댓글 및 관련 답글이 삭제됩니다.>");
        if(result){
            const response = await axios.put(`http://15.164.160.236:8080/comments/delete/${noticeNo}/${commentNo}`)
            if(response.status===200){
                const response = await axios.get(`http://15.164.160.236:8080/comments/list/${noticeNo}/1`)
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
    async recommentDelete(noticeNo,commentNo,recommentNo){
        let result = window.confirm("답글을 삭제하시겠습니까? <답글이 삭제됩니다.>");
        if(result){
            const response = await axios.put(`http://15.164.160.236:8080/recomments/delete/${noticeNo}/${commentNo}/${recommentNo}`)
            if(response.status===200){
                const response = await axios.get(`http://15.164.160.236:8080/recomments/list/${this.state.ntDetailResponse.noticeNo}/${this.state.commentNoThis}/1`)
                const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
                this.setState({
                    recommentListResponse:response.data.cList,
                    recommentTotalCount:response.data.recommentTotalCount,
                    paging:response.data.paging,
                    adExposeList: exposeAd.data.adExposeList,
                    aDTO:exposeAd.data.aDTO
                })
            // const extra = document.getElementsByClassName("extraWinRecom")
            // for(let i = 0; i<extra.length;i++){
            //     extra[i].style.display="none"
            // } 
            }else{
                alert('답글 삭제에 실패하였습니다.')
            }
        }
    }
    //좋아요 클릭
    async likeComCheck(commentNo,likeCheck,index){
       if(this.state.uDTO===null){
        alert('로그인 이후에 이용가능합니다.')
        return false;
       }else{
            const response = await axios.post("http://15.164.160.236:8080/comments/likeUp",{
                userNo:this.state.uDTO.userNo,
                commentNo:commentNo,
                likeCheck:likeCheck,
                noticeNo:this.state.ntDetailResponse.noticeNo
            }) 
            this.setState({
                likeComment:response.data.result,
                likeCommentCount:response.data.likeCommentCount
            })

            let likeCommentCount = document.getElementsByClassName('likeCommentCount')
            for(let i = 0; i<likeCommentCount.length;i++ ){
                let getVal =likeCommentCount[i].getAttribute('value');
                    if(getVal===commentNo){
                        likeCommentCount[i].innerHTML='<i class="fa fa-thumbs-up"></i>&nbsp;'+this.state.likeCommentCount
                        if(likeCommentCount[i].style.borderColor==="red"){
                            likeCommentCount[i].style.borderColor="black"
                            likeCommentCount[i].style.color="black"
                        }else{
                            likeCommentCount[i].style.borderColor="red"
                            likeCommentCount[i].style.color="red"
                        }
                    }
            }
       }
    }
    // 게시물 좋아요
    async noticeLike() {
        if(this.state.uDTO === null) {
            alert("로그인 후 이용이 가능합니다")
            return false;
        } else {
            const noticeLike = await axios.post("http://15.164.160.236:8080/notices/noticeLike", {
                userNo: this.state.uDTO.userNo,
                noticeNo: this.state.ntDetailResponse.noticeNo
            })
            this.setState({
                noticeLikeCount: noticeLike.data
            })
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
    async comModifyWin(noticeNo, commentNo){
        const result = await axios.get(`http://15.164.160.236:8080/comments/detail/${noticeNo}/${commentNo}`)
        this.setState({
            commentUpd: result.data
        })
        // 수정하려고하는 댓글의 원본
        const contentWin = document.querySelector(`.comContentWin${noticeNo+'-'+commentNo}`)
        // 수정하려고하는 댓글을 제외한 원본
        const exContentWin = document.querySelectorAll(`div[class^="comContentWin"]:not(.comContentWin${noticeNo+'-'+commentNo})`)
        // 수정하려고하는 댓글의 수정
        const modifyWin = document.querySelector(`.comModifyWin${noticeNo+'-'+commentNo}`)
        // 수정하려고하는 댓글을 제외한 수정
        const exModifyWin = document.querySelectorAll(`div[class^="comModifyWin"]:not(.comModifyWin${noticeNo+'-'+commentNo})`)
        contentWin.style.display='none';
        modifyWin.style.display='block';
        for(var i=0; i<exContentWin.length; i++){
            exContentWin[i].style.display='block'
            exModifyWin[i].style.display='none'
        }
    }
    
    // 댓글 수정 취소
    comModifyCancel(noticeNo, commentNo){
        const contentWin = document.querySelector(`.comContentWin${noticeNo+'-'+commentNo}`)
        const modifyWin = document.querySelector(`.comModifyWin${noticeNo+'-'+commentNo}`)
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
    async comModifySubmit(noticeNo, commentNo) {
        if(this.state.commentUpd === '<p><br></p>' || this.state.commentUpd === '<p><br></p><p><br></p>'){
            alert('내용을 입력하세요');
            return false;
        }
        const updSubmit = await axios.put(`http://15.164.160.236:8080/comments/update`,{
            noticeNo: noticeNo,
            commentNo: commentNo,
            commentContent: this.state.commentUpd
        })
      
        if(updSubmit.status === 200){
            const contentWin = document.querySelector(`.comContentWin${noticeNo+'-'+commentNo}`)
            const modifyWin = document.querySelector(`.comModifyWin${noticeNo+'-'+commentNo}`)
            //window.location.reload(); // 새로고침하지말고 concat 으로 더해주셈
            const response2 = await axios.get(`http://15.164.160.236:8080/comments/list/${noticeNo}/1`)
            const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
            this.setState({
                commentListResponse:response2.data.cList,
                commentTotalCount:response2.data.commentTotalCount,
                paging:response2.data.paging,
                adExposeList:exposeAd.data.adExposeList,
                aDTO:exposeAd.data.aDTO,
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
    async recomModifySubmit(noticeNo, commentNo,  recomNo){
        if(this.state.recommentUpd === '<p><br></p>' || this.state.recommentUpd === '<p><br></p><p><br></p>'){
            alert('내용을 입력하세요');
            return false;
        }
        const updSubmit = await axios.put(`http://15.164.160.236:8080/recomments/update`,{
            noticeNo: noticeNo,
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
    async recomModifyWin(noticeNo,commentNo,recommentNo) {
        const result = await axios.get(`http://15.164.160.236:8080/recomments/detail/${noticeNo}/${commentNo}/${recommentNo}`)
        this.setState({
            recommentUpd: result.data
        })
        // 수정하려고하는 대댓글의 원본
        const contentWin = document.getElementsByClassName(`recomContentWin${noticeNo+'-'+commentNo+'-'+recommentNo}`)
        // 수정하려고하는 대댓글을 제외한 원본
        const exContentWin = document.querySelectorAll(`div[class^="recomContentWin"]:not(.recomContentWin${noticeNo+'-'+commentNo+'-'+recommentNo})`)
        // 수정하려고하는 대댓글의 수정
        const modifyWin = document.getElementsByClassName(`recomModifyWin${noticeNo+'-'+commentNo+'-'+recommentNo}`)
        // 수정하려고하는 대댓글을 제외한 수정
        const exModifyWin = document.querySelectorAll(`div[class^="recomModifyWin"]:not(.recomModifyWin${noticeNo+'-'+commentNo+'-'+recommentNo})`)
        for(var i=0; i<contentWin.length; i++){
            contentWin[i].style.display='none';
            modifyWin[i].style.display='block';
        }
        for(var i=0; i<exContentWin.length; i++){
            exContentWin[i].style.display='block'
            exModifyWin[i].style.display='none'
        }
    }
    // 대댓글 수정 취소
    recomModifyCancel(noticeNo,commentNo,recomNo){
        const contentWin = document.getElementsByClassName(`recomContentWin${noticeNo+'-'+commentNo+'-'+recomNo}`)
        const modifyWin = document.getElementsByClassName(`recomModifyWin${noticeNo+'-'+commentNo+'-'+recomNo}`)
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
    noticeDel(noticeNo) {
        const noticeDel = axios.put(`http://15.164.160.236:8080/notices/delete/${noticeNo}`)
        if(noticeDel.status !== 200) {
            alert("게시물을 삭제하였습니다")
            this.props.history.push('/noticeList')
            axios.get('http://15.164.160.236:8080/notices/list/1')
            return <Fragment><NoticeList/></Fragment>
        }
    }
    render(){
        const { ntDetailResponse,noticeTotalCount,ntDetailPrev,ntDetailNext,commentListResponse,commentTotalCount,recommentListResponse,recommentTotalCount,noticeLikeCount,prevCommentCount,nextCommentCount,adExposeList,aDTO,uDTO } = this.state;
        //댓글 리스트 
        let commentListRender = null;
        //대댓글리스트
        let recommentListRender = null;
        // 수정, 삭제 버튼 만들기
        let infoButton = null;
        if(this.state.uDTO === null || this.state.uDTO === '') {
            infoButton =
            <Fragment>
                <ExtraWin ntDetailResponse={ ntDetailResponse } boardType={'notice'}/>
            </Fragment>
        } else {
            if(this.state.uDTO.userNickName === ntDetailResponse.noticeWriter){
                infoButton =
                <Fragment>
                    <ExtraWin ntDetailResponse={ ntDetailResponse } noticeDel={ this.noticeDel.bind(this, ntDetailResponse.noticeNo) } boardType={'notice'}/>
                </Fragment>
            } else {
                infoButton = 
                <Fragment>
                    <ExtraWin ntDetailResponse={ ntDetailResponse } boardType={'notice'}/>
                </Fragment>
            }
        }
        recommentListRender = recommentListResponse.map(function(recomRow,index){
            return (
                <Fragment key={index}>
                    <div style={{border:0 , marginTop:20, paddingBottom:20, borderBottom:"1px solid #eee"}}>
                        <div className="commentTableContentTop" style={{display:"flex",justifyContent:"space-between"}}>
                            <div style={{paddingLeft:15,paddingRight:15}}><img src={recomRow.userProfilePath} className="commentWriterProfile" />&nbsp;{recomRow.recommentWriter} | {recomRow.recommentRegdate}</div>
                            {/* <div><img src={extra} alt='더보기' onClick={this.addMoreReSel.bind(this,recomRow.noticeNo,recomRow.commentNo,recomRow.recommentNo)} className='extraBtn' /></div> */}
                            <RecomExWin noticeNo={recomRow.noticeNo}
                                        commentNo={recomRow.commentNo}
                                        recommentNo={recomRow.recommentNo}
                                        recommentWriter={recomRow.recommentWriter}
                                        recommentRegdate={recomRow.recommentRegdate}
                                        recommentContent={recomRow.recommentContent}
                                        recomModifyWin={this.recomModifyWin.bind(this, recomRow.noticeNo,recomRow.commentNo,recomRow.recommentNo)}
                                        recommentDelete={this.recommentDelete.bind(this, recomRow.noticeNo,recomRow.commentNo,recomRow.recommentNo)} />
                        </div>
                        <div className="commentTableContentBody" style={{display:"flex",justifyContent:"space-between"}}>
                            <div style={{display:"flex",justifyContent:"space-between"}} className={`recomContentWin${recomRow.noticeNo+'-'+recomRow.commentNo+'-'+recomRow.recommentNo}`} style={{width:'100%'}}>
                                <ReactQuill theme="bubble" value={ recomRow.recommentContent } readOnly />
                            </div>
                            <div className={`recomModifyWin${recomRow.noticeNo+'-'+recomRow.commentNo+'-'+recomRow.recommentNo}`} style={{display:'none',width:'100%'}}>
                                <div className="commentTableReg">
                                    <ReactQuill theme="bubble" 
                                                value={ this.state.recommentUpd } 
                                                onChange={this.recommentUpd.bind(this)} />
                                    <hr />
                                    <div className="commentTableRegButton">
                                        <span onClick={this.recomModifyCancel.bind(this,recomRow.noticeNo,recomRow.commentNo,recomRow.recommentNo)} style={{cursor:'pointer'}}>취소</span>
                                        &nbsp;
                                        <span onClick={this.recomModifySubmit.bind(this,recomRow.noticeNo,recomRow.commentNo,recomRow.recommentNo)} style={{cursor:'pointer'}}>수정</span>
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
                            <span style={{cursor:'pointer'}} onClick={this.commentRegister.bind(this,`${ntDetailResponse.noticeNo}`,`${this.state.uDTO.userNo}`)}>등록</span>
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
                            <span style={{cursor:'pointer'}} onClick={this.recommentRegister.bind(this,`${ntDetailResponse.noticeNo}`)}>등록</span>
                        </div>
                    </div>
                </Fragment>
        }
        
        commentListRender = commentListResponse.map(function(comment,index){
            return(
                <Fragment key={index}>
                    <div style={{border:0 , marginTop:20, paddingBottom:20, borderBottom:"1px solid #eee"}}>
                        <div className="commentTableContentTop">
                            <div><img src={ comment.userProfilePath } className="commentWriterProfile" />&nbsp;{comment.commentWriter} | {comment.commentRegdate.split(" ")[0]}</div>
                            <ComExWin noticeNo={ comment.noticeNo } 
                                        commentNo={ comment.commentNo }
                                        commentWriter={ comment.commentWriter }
                                        commentRegdate={comment.commentRegdate}
                                        commentContent={comment.commentContent}
                                        comModifyWin={ this.comModifyWin.bind(this, comment.noticeNo, comment.commentNo) }
                                        commentDelete={ this.commentDelete.bind(this,comment.noticeNo,comment.commentNo) }
                                        boardType={'notice'}/>
                        </div>
                        <div className="commentTableContentBody" style={{display:"flex",justifyContent:"space-between"}}>
                            <div style={{display:"flex",justifyContent:"space-between"}} className={`comContentWin${comment.noticeNo+'-'+comment.commentNo}`} style={{width:'100%'}}>
                                <ReactQuill theme="bubble" value={ comment.commentContent } style={{minWidth:'100%'}} readOnly />
                            </div>
                            <div className={`comModifyWin${comment.noticeNo+'-'+comment.commentNo}`} style={{display:'none',width:'100%'}}>
                                <div className="commentTableReg">
                                    <ReactQuill theme="bubble"
                                                onChange={ this.commentUpd.bind(this) }
                                                value={ this.state.commentUpd } />
                                    <hr />
                                    <div className="commentTableRegButton">
                                        <span onClick={this.comModifyCancel.bind(this,comment.noticeNo,comment.commentNo)} style={{cursor:'pointer'}}>취소</span>
                                        &nbsp;
                                        <span onClick={this.comModifySubmit.bind(this,comment.noticeNo,comment.commentNo)} style={{cursor:'pointer'}}>수정</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{paddingTop:15,display:"flex",justifyContent:"space-between"}}>
                            <span className="recommentListShow" onClick={this.toggleShHi.bind(this,comment.commentNo)} style={{paddingTop:8,paddingBottom:8,paddingLeft:12,paddingRight:12,border:"0.5px solid black",backgroundColor:"rgb(37 79 110)",color:"white",cursor:"pointer"}}>답글</span>
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                                <span className="likeCommentCount" value={comment.commentNo} onClick={this.likeComCheck.bind(this,comment.commentNo,'y',index)} style={{paddingTop:8,paddingBottom:8,paddingLeft:12,paddingRight:12,marginRight:2,border:"0.5px solid black",cursor:"pointer"}}><i className='fa fa-thumbs-up'></i> 0</span>
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
        if(ntDetailPrev.noticeNo==="0"&&ntDetailNext.noticeNo!=="0"){
            prevRender = 
                <Fragment>
                    <div className="prev">이전글 |&nbsp;</div>
                    <div className="prevTitle">{ ntDetailPrev.noticeTitle }</div>
                    <div className="prevCommentCount"></div>
                </Fragment>
            nextRender = 
                <Fragment>
                    <div className="next">다음글 |&nbsp;</div>
                    <div className="nextTitle" onClick={this.pageMove.bind(this,`${ntDetailNext.noticeNo}`)}><Link to={`/noticeDetail/${ntDetailNext.noticeNo}`}>{ntDetailNext.noticeTitle}</Link></div>
                    <div className="nextCommentCount">[{ nextCommentCount }]</div>
                </Fragment>
        }else if(ntDetailPrev.noticeNo!=="0"&&ntDetailNext.noticeNo==="0"){
            prevRender = 
                <Fragment>
                    <div className="prev">이전글 |&nbsp;</div>
                    <div className="prevTitle" onClick={this.pageMove.bind(this,`${ntDetailPrev.noticeNo}`)}><Link to={`/noticeDetail/${ntDetailPrev.noticeNo}`}>{ntDetailPrev.noticeTitle}</Link></div>
                    <div className="prevCommentCount">[{ prevCommentCount }]</div>
                </Fragment>
            nextRender = 
                <Fragment>
                    <div className="next">다음글 |&nbsp;</div>
                    <div className="nextTitle">{ntDetailNext.noticeTitle}</div>
                    <div className="nextCommentCount"></div>
                </Fragment>
        }
        else if(ntDetailPrev.noticeNo!=="0"&&ntDetailNext.noticeNo!=="0"){
            prevRender = 
                <Fragment>
                    <div className="prev">이전글 |&nbsp;</div>
                    <div className="prevTitle" onClick={this.pageMove.bind(this,`${ntDetailPrev.noticeNo}`)}><Link to={`/noticeDetail/${ntDetailPrev.noticeNo}`}>{ntDetailPrev.noticeTitle}</Link></div>
                    <div className="prevCommentCount">[{ prevCommentCount }]</div>
                </Fragment>
            nextRender = 
                <Fragment>
                    <div className="next">다음글 |&nbsp;</div>
                    <div className="nextTitle" onClick={this.pageMove.bind(this,`${ntDetailNext.noticeNo}`)}><Link to={`/noticeDetail/${ntDetailNext.noticeNo}`}>{ ntDetailNext.noticeTitle }</Link></div>
                    <div className="nextCommentCount">[{ nextCommentCount }]</div>
                </Fragment>
        }
        else{
            prevRender = 
                <Fragment>
                    <div className="prev">이전글</div>
                    <div className="prevTitle">{ntDetailPrev.noticeTitle}</div>
                    <div className="prevCommentCount"></div>
                </Fragment>
            nextRender = 
                <Fragment>
                    <div className="next">다음글</div>
                    <div className="nextTitle">{ntDetailNext.noticeTitle}</div>
                    <div className="nextCommentCount"></div>
                </Fragment>
        }
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
                <div className="padTop124 padLR">
                    <div className="sponserBanner">
                        <div className="sponDiv">
                            <img src={ aDTO.adImg } />
                        </div>
                    </div>
                    <div className="padLR">
                        <div className="noticeTable">
                            <div className="noticeTableTopFlex">
                                <div className="boardTitle">커뮤니티</div>
                                <div className="moreButton">전체 {noticeTotalCount}건</div>
                            </div>
                            <div className="noticeTableTitle">
                                {ntDetailResponse.noticeTitle}
                                { infoButton }
                            </div>
                            <div>작성자 : {ntDetailResponse.noticeWriter}</div>
                            <div>작성일 : {ntDetailResponse.noticeRegdate}</div>
                            <div className="noticeTableTopFlexList">
                                <div>조회수 : {ntDetailResponse.noticeReadcount} | 추천 : { noticeLikeCount } | 댓글 : {commentTotalCount}</div>
                            </div>
                            <hr />
                            <div className="noticeTableContent">
                                 <ReactQuill theme="bubble" value={ this.state.editorHtml } readOnly />
                            </div>
                        </div>
                        <div className="likeButton"><img src={like} alt='추천' className='likeBtn' onClick={ this.noticeLike.bind(this) }/></div>
                        <div className="likeText">{ noticeLikeCount }</div>
                        <div className="backList"><Link to="/noticeList">목록보기</Link></div>
                    </div>
                    <div className="padLR">
                        <div className="commentTable">
                            <div className="commentTableTop">
                                댓글 {commentTotalCount}개
                            </div>
                            {loginCommentRender}
                            {commentListRender}
                            {addCommentRender}
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

export default NoticeDetail
