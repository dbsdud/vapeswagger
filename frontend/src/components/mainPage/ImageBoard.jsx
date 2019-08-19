import React,{ Component,Fragment } from 'react';
import { Link } from 'react-router-dom';

class ImageBoard extends Component{
   
    render(){
        let {ibList,imageBoardCommentCountList,thumbImgList} = this.props;
        let imageBoardRender = null;
        imageBoardRender=ibList.map(function(ibRow,index){
            return(
                <Fragment key={index}>
                    <div>
                        <Link to={`/imageBoardDetail/${ibRow.imageBoardNo}`}>
                        <img className="imageBoardArrayListIn"  src={thumbImgList[index]}/> 
                        </Link>
                        <div className="imageBoardArrayDetail" >
                            <div className="imageBoardTitle">{ibRow.imageBoardTitle}</div>
                            <div><i className="fa fa-clock-o"></i>{ibRow.imageBoardRegdate.split(" ")[0]}</div>
                            <div><i className="fa fa-comments"></i>{imageBoardCommentCountList[index]}</div>
                            <div><i className="fa fa-user"></i>{ibRow.imageBoardWriter}</div>
                        </div>
                    </div>
                </Fragment>
            )    
        })
        return (
            <Fragment>
                <div className="noticeTable">
                    <div className="noticeTableTopFlex">
                        <div className="boardTitle">이미지 게시판</div> 
                        <div className="moreButton"><Link to="/imageBoardList">more++</Link></div>  
                    </div>
                    <div className="imageBoardScroll">
                        {/* 정사각형이미지형태의 썸넬도 필요함*/}
                        {imageBoardRender}
                        <div>
                         {/*더보러가기 */}
                            <img className="imageBoardArrayListIn" src={"http://placehold.it/1920x1080"}/> 
                        </div>
                      
                    </div>

                </div> 
            </Fragment>
        )
    }
}
export default ImageBoard;