//npm install @material-ui/core
import React,{ Component,Fragment } from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

//import ListSubheader from '@material-ui/core/ListSubheader';
// import IconButton from '@material-ui/core/IconButton';
// import InfoIcon from '@material-ui/icons/Info';
//import tileData from './tileData';

var thisIbProp = this
const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: "90%"
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));

  export default function TitlebarGridList(thisIbProp) {
    const classes = useStyles();
    const ibData =[]
    thisIbProp.ibListResponse.map(function(ibRow,index){
        ibData.push({img:thisIbProp.thumbImgList[index],title:ibRow.imageBoardTitle,author:ibRow.imageBoardWriter,ibNo:ibRow.imageBoardNo,imageBoardCommentCountList:thisIbProp.imageBoardCommentCountList[index],ibRegdate:ibRow.imageBoardRegdate.split(' ')[0]})
    });
    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          {ibData.map((ib,index) => (
            <GridListTile key={ib.ibNo}>
               <Link to={{pathname:`/imageBoardDetail/${ib.ibNo}`}}><img src={ib.img} alt={ib.title}/></Link>
              <GridListTileBar
                title={ib.title}
                subtitle={
                    <Fragment>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div>by <i className="fa fa-user"></i> {ib.author}</div>
                        <div><i className="fa fa-comments"></i> {ib.imageBoardCommentCountList}</div>
                    </div>
                    <div style={{paddingTop:5}}><i className="fa fa-clock-o"></i>{ib.ibRegdate}</div>
                    </Fragment>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }