import React from 'react';
import { Component,Fragment } from 'react';
import axios from 'axios';

class AdExposeList extends Component {
    async adClickUpdate(adNo,adLink ){
        const response = await axios.put(`http://15.164.160.236:8080/admanage/adClickUpdate/${adNo}`)
        window.open(adLink)
    }
    render(){
        let adExposeListRender = "";
        let thisAdExposeList = this.props.adExposeList;
        let adExposeList=this.props.adExposeList.map(function(aRow,index){
        let adExposeListRender2 ="";
            if(index%2===0){
                adExposeListRender=
                <div className="sponArrayList" style={{width:"94%",margin:"0 auto",marginBottom: 10,cursor:"pointer"}}>
                    <img className="sponArrayListIn" onClick={this.adClickUpdate.bind(this,aRow.adNo,aRow.adLink)} style={{width:"100%",height:"15vw"}}  src={aRow.adImg}/> 
                </div>
            }else if(index%2===1){
                adExposeListRender=
                <div className="sponArrayList" style={{width:"94%",margin:"0 auto",marginBottom: 10,cursor:"pointer"}}>
                    <img className="sponArrayListIn"onClick={this.adClickUpdate.bind(this,aRow.adNo,aRow.adLink)} style={{width:"100%",height:"15vw"}}  src={aRow.adImg}/> 
                </div>
              
            }
            if(thisAdExposeList.length%2===1&&index===thisAdExposeList.length-1){
                adExposeListRender2=
                <div className="sponArrayList" style={{width:"94%",margin:"0 auto",marginBottom: 10,cursor:"pointer"}}>
                    <img className="sponArrayListIn"onClick={this.adClickUpdate.bind(this,aRow.adNo,aRow.adLink)} style={{width:"100%",height:"15vw"}}  src={"http://placehold.it/1920x1080"}/> 
                </div>
            }
            return (
                <Fragment key={index}>
                    {adExposeListRender}
                    {adExposeListRender2}
                </Fragment>
            )
        },this)
         
        return(
            <Fragment>
            <div style={{border: 0,borderTop: "1px solid #eee", color: "#000000",fontWeight: "bolder",fontSize: 18,textAlign:"center",paddingTop:10,marginBottom:10}}>VapeSwagger와 함께하는 광고</div>
                <div className="gridList">
                    {adExposeList}
                </div>
            </Fragment>
        )
    }

}
export default AdExposeList;