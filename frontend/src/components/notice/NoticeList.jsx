import React, { Component,Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
class NoticeList extends Component{
   state={
      ntListResponse:[
         {
            noticeNo:"",
            noticeTitle:"",
            noticeContent:"",
            noticeRegdate:"",
            noticeWriter:"",
            noticeReadcount:''
         }
      ],
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
      uDTO:"",
      pagingRender:"",
      selectCategory:"title",
      searchWord:"",
      selectCategoryMaintain:"",
      searchWordMaintain:"",
      commentCountList: '',
      likeCountList: '',
      noticeLikeTotalCount: '',
      nLikeCountList: '',
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
   async componentDidMount(){
      const response = await axios.get('http://15.164.160.236:8080/notices/list/1')
      const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
      this.setState({
         ntListResponse:response.data.nList,
         paging:response.data.paging,
         commentCountList: response.data.commentCountList,
         likeCountList: response.data.likeCountList,
         uDTO:JSON.parse(sessionStorage.getItem('uDTO')),
         adExposeList:exposeAd.data.adExposeList,
         aDTO:exposeAd.data.aDTO
      })
      let commentNoticeCount = document.getElementsByClassName("commentNoticeCount")

      if(response.data.nLikeCountList === ""){
         for(let i = 0; i < commentNoticeCount.length; i++) {
               let getValue = commentNoticeCount[i].getAttribute('value');
               console.log(getValue)
            for(let j=0; j < response.data.nlist[j].noticeNo; j++) {
               if(getValue === response.data.nlist[j].noticeNo){
                  commentNoticeCount[j].innerHTML = 0
               }
            }
         }
      }
      var pagingRend=[]
      let startPage = this.state.paging.startPage;
      let endPage = this.state.paging.endPage;
      for(var i = startPage; i<=endPage;i++){
         if(i===startPage){
            pagingRend.push(<div className="pageNum pageActive" key={i} onClick={this.pagingMove.bind(this,`${i}`)}>{i}</div>)
         } else {
            pagingRend.push(<div className="pageNum" key={i} onClick={this.pagingMove.bind(this,`${i}`)}>{i}</div>)
         }
      }
      this.setState({
         pagingRender:pagingRend
      })
   }

   async pagingMove(pagenum){
      if(this.state.searchWordMaintain===""){
         const response = await axios.get(`http://15.164.160.236:8080/notices/list/${pagenum}`)
         const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
         this.setState({
            ntListResponse:response.data.nList,
            paging:response.data.paging,
            commentCountList: response.data.commentCountList,
            likeCountList: response.data.likeCountList,
            uDTO:JSON.parse(sessionStorage.getItem('uDTO')),
            adExposeList:exposeAd.data.adExposeList,
            aDTO:exposeAd.data.aDTO
         })
         let pagingRend=[]
         let startPage = this.state.paging.startPage;
         let endPage = this.state.paging.endPage;
         for(let i = startPage; i<=endPage;i++){
            if((parseInt(pagenum))===i){
               pagingRend.push(<div className="pageNum pageActive" key={i} onClick={this.pagingMove.bind(this,`${i}`)}>{i}</div>)
            }else{
               pagingRend.push(<div className="pageNum" key={i} onClick={this.pagingMove.bind(this,`${i}`)}>{i}</div>)
            }
         }
         this.setState({
            pagingRender:pagingRend
         })
      }else{
         const response = await axios.get(`http://15.164.160.236:8080/notices/list/${pagenum}/${this.state.searchWord}/${this.state.selectCategory}`)
         const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
         this.setState({
            ntListResponse:response.data.nList,
            paging:response.data.paging,
            commentCountList: response.data.commentCountList,
            likeCountList: response.data.likeCountList,
            uDTO:JSON.parse(sessionStorage.getItem('uDTO')),
            adExposeList:exposeAd.data.adExposeList,
            aDTO:exposeAd.data.aDTO
         })
         let pagingRend=[]
         let startPage = this.state.paging.startPage;
         let endPage = this.state.paging.endPage;
         for(let i = startPage; i<=endPage;i++){
            if((parseInt(pagenum))===i){
               pagingRend.push(<div className="pageNum pageActive" key={i} onClick={this.pagingMove.bind(this,`${i}`)}>{i}</div>)
            }else{
               pagingRend.push(<div className="pageNum" key={i} onClick={this.pagingMove.bind(this,`${i}`)}>{i}</div>)
            }
         }
         
         this.setState({
            pagingRender:pagingRend
         })
      }
   
   }
   async pagingPrev(){
      if(this.state.searchWordMaintain===""){
         const pagenum = parseInt(parseInt(this.state.paging.startPage)/10)
         const response = await axios.get(`http://15.164.160.236:8080/notices/list/${pagenum}`)
         const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
         this.setState({
            ntListResponse:response.data.nList,
            paging:response.data.paging,
            commentCountList: response.data.commentCountList,
            likeCountList: response.data.likeCountList,
            uDTO:JSON.parse(sessionStorage.getItem('uDTO')),
            adExposeList:exposeAd.data.adExposeList,
            aDTO:exposeAd.data.adExposeList
         })
         let pagingRend=[]
         let startPage = this.state.paging.startPage;
         let endPage = this.state.paging.endPage;
         for(let i = startPage; i<=endPage;i++){
            if(i===startPage){
               pagingRend.push(<div className="pageNum pageActive" key={i} onClick={this.pagingMove.bind(this,`${i}`)}>{i}</div>)
            } else {
               pagingRend.push(<div className="pageNum" key={i} onClick={this.pagingMove.bind(this,`${i}`)}>{i}</div>)
            }
         }
         this.setState({
            pagingRender:pagingRend
         })
      }else{
         const pagenum = parseInt(parseInt(this.state.paging.startPage)/10)
         const response = await axios.get(`http://15.164.160.236:8080/notices/list/${pagenum}/${this.state.searchWord}/${this.state.selectCategory}`)
         const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
         this.setState({
            ntListResponse:response.data.nList,
            paging:response.data.paging,
            commentCountList: response.data.commentCountList,
            likeCountList: response.data.likeCountList,
            uDTO:JSON.parse(sessionStorage.getItem('uDTO')),
            adExposeList:exposeAd.data.adExposeList,
            aDTO:exposeAd.data.adExposeList
         })
         let pagingRend=[]
         let startPage = this.state.paging.startPage;
         let endPage = this.state.paging.endPage;
         for(let i = startPage; i<=endPage;i++){
            if(i===startPage){
               pagingRend.push(<div className="pageNum pageActive" key={i} onClick={this.pagingMove.bind(this,`${i}`)}>{i}</div>)
            } else {
               pagingRend.push(<div className="pageNum" key={i} onClick={this.pagingMove.bind(this,`${i}`)}>{i}</div>)
            }
         }
         this.setState({
            pagingRender:pagingRend
         })
      }
   }
   
   async pagingNext(){
      if(this.state.searchWordMaintain===""){
         const pagenum = parseInt(this.state.paging.endPage)+1
         const response = await axios.get(`http://15.164.160.236:8080/notices/list/${pagenum}`)
         const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
         this.setState({
            ntListResponse:response.data.nList,
            paging:response.data.paging,
            commentCountList: response.data.commentCountList,
            likeCountList: response.data.likeCountList,
            uDTO:JSON.parse(sessionStorage.getItem('uDTO')),
            adExposeList:exposeAd.data.adExposeList,
            aDTO:exposeAd.data.adExposeList
         })
         let pagingRend=[]
         let startPage = this.state.paging.startPage;
         let endPage = this.state.paging.endPage;
         for(let i = startPage; i<=endPage;i++){
            if(i===startPage){
               pagingRend.push(<div className="pageNum pageActive" key={i} onClick={this.pagingMove.bind(this,`${i}`)}>{i}</div>)
            } else {
               pagingRend.push(<div className="pageNum" key={i} onClick={this.pagingMove.bind(this,`${i}`)}>{i}</div>)
            }
         }
         this.setState({
            pagingRender:pagingRend
         })
      }else{
         const pagenum = parseInt(this.state.paging.endPage)+1
         const response = await axios.get(`http://15.164.160.236:8080/notices/list/${pagenum}/${this.state.searchWord}/${this.state.selectCategory}`)
         const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
         this.setState({
            ntListResponse:response.data.nList,
            paging:response.data.paging,
            commentCountList: response.data.commentCountList,
            likeCountList: response.data.likeCountList,
            uDTO:JSON.parse(sessionStorage.getItem('uDTO')),
            adExposeList:exposeAd.data.adExposeList,
            aDTO:exposeAd.data.adExposeList
         })
         let pagingRend=[]
         let startPage = this.state.paging.startPage;
         let endPage = this.state.paging.endPage;
         for(let i = startPage; i<=endPage;i++){
            if(i===startPage){
               pagingRend.push(<div className="pageNum pageActive" key={i} onClick={this.pagingMove.bind(this,`${i}`)}>{i}</div>)
            } else {
               pagingRend.push(<div className="pageNum" key={i} onClick={this.pagingMove.bind(this,`${i}`)}>{i}</div>)
            }
         }
         this.setState({
            pagingRender:pagingRend
         })
      }
   

   }
   //  change
   tagChange(e){
      this.setState({
         [e.target.name]:e.target.value
      })
   }
   async searchAxios(){
      if(this.state.searchWord===""){
         alert('검색어를 입력해주세요')
         return false;
      }else{
         const response = await axios.get(`http://15.164.160.236:8080/notices/list/1/${this.state.searchWord}/${this.state.selectCategory}`)
         const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
         this.setState({
            searchWordMaintain:this.state.searchWord,
            selectCategoryMaintain:this.state.selectCategory,
            ntListResponse:response.data.nList,
            paging:response.data.paging,
            commentCountList: response.data.commentCountList,
            likeCountList: response.data.likeCountList,
            uDTO:JSON.parse(sessionStorage.getItem('uDTO')),
            adExposeList:exposeAd.data.adExposeList,
            aDTO:exposeAd.data.adExposeList
         })
         let pagingRend=[]
         let startPage = this.state.paging.startPage;
         let endPage = this.state.paging.endPage;
         for(let i = startPage; i<=endPage;i++){
            if(i===startPage){
               pagingRend.push(<div className="pageNum pageActive" key={i} onClick={this.pagingMove.bind(this,`${i}`)}>{i}</div>)
            } else {
               pagingRend.push(<div className="pageNum" key={i} onClick={this.pagingMove.bind(this,`${i}`)}>{i}</div>)
            }
         }
         this.setState({
            pagingRender:pagingRend
         })
      }
   }
      
   render(){
      const { ntListResponse,uDTO,pagingRender,paging,commentCountList,likeCountList, nLikeCountList,adExposeList,aDTO } = this.state;
      let newIconRender = null;
      let ntListRender = ntListResponse.map(function(ntRow,index) {
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
            <Fragment key={index} >
               <Link to={{pathname:`/noticeDetail/${ntRow.noticeNo}`}}>
                  <div className="titleArea">
                     { newIconRender }&nbsp;
                        <div className="titleAreaText">
                           {ntRow.noticeTitle}
                        </div>
                     <div className="titleAreaCommentCount">
                        <span className="commentNoticeCount"  value={ntRow.noticeNo} >&nbsp;[{ commentCountList[index] }]</span>
                     </div>
                  </div>
                  <div className="infoArea">
                     <span><i className="fa fa-thumbs-up"></i> { likeCountList[index] }</span>
                     <span><i className="fa fa-eye"></i> { ntRow.noticeReadcount }</span>
                     <span><i className="fa fa-user"></i> { ntRow.noticeWriter }</span>
                     <span><i className="fa fa-clock-o"></i> { ntRow.noticeRegdate.split(" ")[0] }</span>
                  </div>
               </Link>
               <hr />
            </Fragment>
         )
      })

      let noticeRegBut=null;
      if(uDTO===""){
         noticeRegBut="";
      }else if(uDTO!==null){
         if(uDTO.userNo==="1"){
            noticeRegBut=<Link to="/NoticeReg"><div className="noticeTableTopFlexRegIn" >글쓰기</div></Link>
         }
      }
      //페이징
      let pagingDiv = null;
      if(paging.prev===false&&paging.next===true){
         if(parseInt(paging.lastblock)>=2){
            pagingDiv=
            <Fragment>
               <div style={{display:"flex",justifyContent:"center",paddingBottom:20}}>
                     {pagingRender}
                     <div style={{marginRight:10,fontSize:15}} onClick={this.pagingNext.bind(this)} > {`\>`} </div>
               </div>
            </Fragment>
         }else if(parseInt(paging.lastblock)===1){
            pagingDiv=
            <Fragment>
               <div style={{display:"flex",justifyContent:"center",paddingBottom:20}}>
                     {pagingRender}
               </div>
            </Fragment>
         }
      }else if(paging.prev===true&&paging.next===false){
         pagingDiv=
         <Fragment>
            <div style={{display:"flex",justifyContent:"center",paddingBottom:20}}>
                  <div style={{marginRight:10,fontSize:15}} onClick={this.pagingPrev.bind(this)} > {`\<`} </div>
                  {pagingRender}
            </div>
         </Fragment>
      }else if(paging.prev===true&&paging.next===true){
         pagingDiv=
         <Fragment>
            <div style={{display:"flex",justifyContent:"center",paddingBottom:20}}>
                  <div style={{marginRight:10,fontSize:15}}  onClick={this.pagingPrev.bind(this)}> {`\<`} </div>
                  {pagingRender}
                  <div style={{marginRight:10,fontSize:15}} onClick={this.pagingNext.bind(this)}> {`\>`} </div>
            </div>
         </Fragment>
      }
      return(
         <Fragment>
            <div className="padTop124 padLR">
               <div className="sponserBanner">
                  <div className="sponDiv">
                     <img style={{paddingTop:5}}  src={ aDTO.adImg } />
                  </div>
               </div>
               <div className="padLR">
                  <div className="noticeTable">
                     <div className="noticeTableTopFlex">
                        <div className="boardTitle">공지사항</div>
                        <div className="noticeTableTopFlexReg">
                           {noticeRegBut}
                           <div className="noticeTableTopFlexRegCount">전체 {paging.totalcount}건</div>
                        </div>
                     </div>
                  {ntListRender}
                  {pagingDiv}
                  {/* */}
                  <div className="noticeSearchDiv">
                        <select className="selectCategory" name="selectCategory" onChange={this.tagChange.bind(this)} value={this.state.selectCategory}>
                           <option value="title">제목</option>
                           <option value="content">내용</option>
                           <option value="writer">글쓴이</option>
                        </select>
                        <input className="searchItem" name="searchWord" onChange={this.tagChange.bind(this)} value={this.state.searchWord} placeholder="검색어를 입력하세요" />
                        <i className="fa fa-search" onClick={this.searchAxios.bind(this)}></i>
                  </div>
                  </div>
               </div>
            </div>
         </Fragment>
      )
   }
}

export default NoticeList