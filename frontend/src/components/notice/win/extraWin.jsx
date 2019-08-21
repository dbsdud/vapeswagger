import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import extra from '../../../images/extra.png';

var thisIbProp = this
if(JSON.parse(sessionStorage.getItem('uDTO')) === null){
  var userNickName = 'temp'
} else {
  var userNickName = JSON.parse(sessionStorage.getItem('uDTO')).userNickName
}
export default function SimpleMenu(thisIbProp) {
  let noticeDel = thisIbProp.noticeDel
  let noticeReport = thisIbProp.noticeReport
  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  if(userNickName === thisIbProp.ntDetailResponse.noticeWriter) {  
    return (  
      <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <img src={ extra } className="extraBtn" />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}><Link to={`/noticeModify/${ thisIbProp.ntDetailResponse.noticeNo }`}><i className="fa fa-edit"></i> 수정</Link></MenuItem>
          <MenuItem onClick={noticeDel}><i className="fa fa-trash"></i> 삭제</MenuItem>
        </Menu>
      </div>
    );
  } else if(userNickName === 'temp') {
    return (
      <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <img src={ extra } className="extraBtn" />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}><i className="fa fa-user"></i>로그인</MenuItem> 
        </Menu>
      </div>    
    );
  } else if(userNickName !== thisIbProp.ntDetailResponse.noticeWriter) {
    return (
      <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <img src={ extra } className="extraBtn" />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={noticeReport}><i className="fa fa-exclamation-circle"></i> 신고</MenuItem>
        </Menu>
      </div>    
    );
  } 
}

