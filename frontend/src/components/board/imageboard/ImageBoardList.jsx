import React,{ Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import ImageGridList from './ImageGridList';
import axios from 'axios';
class ImageBoardList extends Component{
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
         ibListResponse:[
            {
               imageBoardNo:"",
               imageBoardTitle:"",
               imageBoardContent:"",
               imageBoardRegdate:"",
               imageBoardWriter:"",
               imageBoardReadcount:''
            }
         ],
         imageBoardCommentCountList:"",
         imageBoardCommentCount:"",
         imageBoardLikeCountList:"",
         thumbImgList:"",
         pagingRender:"",
         selectCategory:"title",
         searchWord:"",
         selectCategoryMaintain:"",
         searchWordMaintain:"",
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
        const response = await axios.get('http://15.164.160.236:8080/imageBoards/list/1')
        const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
        this.setState({
            ibListResponse:response.data.ibList,
            paging:response.data.paging,
            imageBoardCommentCountList:response.data.imageBoardCommentCountList,
            imageBoardLikeCountList:response.data.imageBoardLikeCountList,
            thumbImgList:response.data.thumbImgList,
            adExposeList:exposeAd.data.adExposeList,
            aDTO:exposeAd.data.aDTO
        })
        let pagingRend=[]
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
           const response = await axios.get(`http://15.164.160.236:8080/imageBoards/list/${pagenum}`)
           const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
           this.setState({
              ibListResponse:response.data.ibList,
              paging:response.data.paging,
              imageBoardCommentCountList: response.data.imageBoardCommentCountList,
              imageBoardLikeCountList: response.data.imageBoardLikeCountList,
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
           const response = await axios.get(`http://15.164.160.236:8080/imageBoards/list/${pagenum}/${this.state.searchWord}/${this.state.selectCategory}`)
           const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
           this.setState({
                ibListResponse:response.data.ibList,
                paging:response.data.paging,
                imageBoardCommentCountList: response.data.imageBoardCommentCountList,
                imageBoardLikeCountList: response.data.imageBoardLikeCountList,
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
           const pagenum = parseInt(parseInt(this.state.paging.startPage)/10)*10
           const response = await axios.get(`http://15.164.160.236:8080/imageBoards/list/${pagenum}`)
           const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
           this.setState({
                ibListResponse:response.data.ibList,
                paging:response.data.paging,
                imageBoardCommentCountList: response.data.imageBoardCommentCountList,
                imageBoardLikeCountList: response.data.imageBoardLikeCountList,
                uDTO:JSON.parse(sessionStorage.getItem('uDTO')),
                adExposeList:exposeAd.data.adExposeList,
                aDTO:exposeAd.data.aDTO
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
           const response = await axios.get(`http://15.164.160.236:8080/imageBoards/list/${pagenum}/${this.state.searchWord}/${this.state.selectCategory}`)
           const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
           this.setState({
                ibListResponse:response.data.ibList,
                paging:response.data.paging,
                imageBoardCommentCountList: response.data.imageBoardCommentCountList,
                imageBoardLikeCountList: response.data.imageBoardLikeCountList,
                uDTO:JSON.parse(sessionStorage.getItem('uDTO')),
                adExposeList:exposeAd.data.adExposeList,
                aDTO:exposeAd.data.aDTO
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
           const response = await axios.get(`http://15.164.160.236:8080/imageBoards/list/${pagenum}`)
           const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
           this.setState({
                ibListResponse:response.data.ibList,
                paging:response.data.paging,
                imageBoardCommentCountList: response.data.imageBoardCommentCountList,
                imageBoardLikeCountList: response.data.imageBoardLikeCountList,
                uDTO:JSON.parse(sessionStorage.getItem('uDTO')),
                adExposeList:exposeAd.data.adExposeList,
                aDTO:exposeAd.data.aDTO
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
           const response = await axios.get(`http://15.164.160.236:8080/imageBoards/list/${pagenum}/${this.state.searchWord}/${this.state.selectCategory}`)
           const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
           this.setState({
                ibListResponse:response.data.ibList,
                paging:response.data.paging,
                imageBoardCommentCountList: response.data.imageBoardCommentCountList,
                imageBoardLikeCountList: response.data.imageBoardLikeCountList,
                uDTO:JSON.parse(sessionStorage.getItem('uDTO')),
                adExposeList:exposeAd.data.adExposeList,
                aDTO:exposeAd.data.aDTO
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
       const response = await axios.get(`http://15.164.160.236:8080/imageBoards/list/1/${this.state.searchWord}/${this.state.selectCategory}`)
       const exposeAd = await axios.get('http://15.164.160.236:8080/admanage/exposeAd')
       this.setState({
          searchWordMaintain:this.state.searchWord,
          selectCategoryMaintain:this.state.selectCategory,
          ibListResponse:response.data.ibList,
          paging:response.data.paging,
          imageBoardCommentCountList: response.data.imageBoardCommentCountList,
          imageBoardLikeCountList: response.data.imageBoardLikeCountList,
          uDTO:JSON.parse(sessionStorage.getItem('uDTO')),
          adExposeList:exposeAd.data.adExposeList,
          aDTO:exposeAd.data.aDTO
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
    // thumbClick(index){
    //     console.log('호가'+index);
    // }
    render(){
        let {ibListResponse,paging,imageBoardCommentCountList,imageBoardLikeCountList,thumbImgList,uDTO,pagingRender,adExposeList,aDTO} = this.state;
        let imageBoardListRender="";
        let images=[];
      //등록하기 버튼
        let imageBoardRegBut=null;
        if(uDTO===""){
            imageBoardRegBut="";
        }else if(uDTO!==null){
            imageBoardRegBut=<Link to="/imageBoardReg"><div className="noticeTableTopFlexRegIn" >글쓰기</div></Link>
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
                <div className="padTop124">
                    <div className="padLR">
                     <div className="sponserBanner">
                           <div className="sponDiv">
                              <img style={{paddingTop:5,height:"20vw"}}  src={ aDTO.adImg } />
                           </div>
                     </div>
                        <div className="noticeTable">
                            <div className="noticeTableTopFlex">
                                <div className="boardTitle">이미지 게시판</div> 
                                <div className="noticeTableTopFlexReg">
                                    {imageBoardRegBut}
                                  <div className="noticeTableTopFlexRegCount">전체 {paging.totalcount}건</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ImageGridList ibListResponse={ibListResponse} thumbImgList={thumbImgList} imageBoardCommentCountList={imageBoardCommentCountList}/>
                <div style={{paddingTop:20}}>
                    {pagingDiv}
                    <div className="padLR">
                        <div className="noticeTable">
                            <div className="noticeSearchDiv">
                                <select className="selectCategory" name="selectCategory" style={{paddingTop:0}} onChange={this.tagChange.bind(this)} value={this.state.selectCategory}>
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
                </div>
            
            </Fragment>
        )
    }
}
export default ImageBoardList;