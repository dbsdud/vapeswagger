import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import ReactQuill from 'react-quill';
var this2 = this;

const useStyles = makeStyles(theme => ({

  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
  
}));

export default function RadioButtonsGroup(this2) {
  window.scrollTo(0,0)
  const classes = useStyles();
  const [value, setValue] = React.useState('unsuit');

  function handleChange(event) {
    setValue(event.target.value);
  }



let imageBoardNo = "";
let boardWriter ="";
let boardTitle = "";
let boardType = "";
let boardRegdate = "";
let userNickname="";
let userNo="";
let reportRender="";
let commentNo="";
let commentWriter = "";
let recommentNo="";
let recommentWriter = "";

if(this2.location.query!==undefined){
  userNickname =  JSON.parse(sessionStorage.getItem('uDTO')).userNickName;
  userNo =  JSON.parse(sessionStorage.getItem('uDTO')).userNo;
  boardType = this2.location.query.boardType;

  if(this2.location.query.ibDetailResponse !== undefined && this2.location.query.commentNo === undefined &&this2.location.query.recommentNo === undefined ){
    imageBoardNo =  this2.location.query.ibDetailResponse.imageBoardNo;
    boardWriter = this2.location.query.ibDetailResponse.imageBoardWriter;
    boardTitle = this2.location.query.ibDetailResponse.imageBoardTitle;
    boardRegdate = this2.location.query.ibDetailResponse.imageBoardRegdate;
  }
  if(this2.location.query.ibDetailResponse===undefined){
    if(this2.location.query.imageBoardNo !== undefined && this2.location.query.commentNo !== undefined &&this2.location.query.recommentNo === undefined ){
     imageBoardNo=this2.location.query.imageBoardNo;
      commentNo =this2.location.query.commentNo;
      boardWriter = this2.location.query.commentWriter;
      boardRegdate = this2.location.query.commentRegdate;
      boardTitle = this2.location.query.commentContent; 
      
    }
    if(this2.location.query.imageBoardNo !== undefined && this2.location.query.commentNo !== undefined &&this2.location.query.recommentNo !== undefined ){
       imageBoardNo=this2.location.query.imageBoardNo;
      commentNo =this2.location.query.commentNo;
      recommentNo =this2.location.query.recommentNo;
      boardWriter = this2.location.query.recommentWriter;
      boardRegdate = this2.location.query.recommentRegdate;
      boardTitle = this2.location.query.recommentContent;
    }
  }
}else{
window.history.back();
}
  // 게시물 신고
  function noticeReport() {
    if(userNo !== null) {
      //material 에서 name 설정이 gender1 로 되어있음
      let radio= document.getElementsByName('gender1')
      var radioVal; // 여기에 선택된 radio 버튼의 값이 담기게 된다.
      for(var i=0; i<radio.length; i++) {
          if(radio[i].checked) {
            radioVal = radio[i].value;
          }
      }
    let reportContent = document.getElementById('standard-bare');
    if(reportContent.value==""){
      window.alert('신고 사유를 입력해주세요');
      return false;
    }else if(reportContent.value.length>=100&&reportContent.value.length<0){
      window.alert('최대 100자 까지 작성할수 있습니다.');
      return false;
    }
   const response = axios.post("http://15.164.160.236:8080/reports/boardReport",{
      boardType:boardType,
      reportCategory:radioVal,
      userNo:userNo,
      imageBoardNo:imageBoardNo,
      commentNo:commentNo,
      recommentNo:recommentNo,
      reportContent:reportContent.value
    })
    .then(resultReport => resultReport.data)
    .then(data=>{
        if(data === 1 ){
          window.alert('신고가 접수되었습니다.')
          window.history.back();
        }else {
          window.history.back();
        }
    })
    
    
    } else {
      alert("로그인 후 이용이 가능합니다")
      window.location("/login");
      return false;
    }
  }
  return (
    <div className={classes.root} style={{paddingTop:102}}>
      <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend" ><h3>신고 하기</h3></FormLabel>
   
      <FormLabel component="legend" style={{paddingTop:10}}>글 작성자 : <ReactQuill theme="bubble" style={{display:"  inline-flex"}} value={ boardWriter} readOnly /></FormLabel>
      <FormLabel component="legend" style={{paddingTop:10}}>글 작성일 :  <ReactQuill theme="bubble" style={{display:"  inline-flex"}} value={ boardRegdate} readOnly /></FormLabel>
      <FormLabel component="legend" style={{paddingTop:10}}>글 제목 :   <ReactQuill theme="bubble" style={{display:"  inline-flex"}} value={ boardTitle} readOnly /></FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          className={classes.group}
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="unsuit" control={<Radio />} label="부적절한 홍보 게시물" />
          <FormControlLabel value="adultContent" control={<Radio />} label="음란적인 내용" />
          <FormControlLabel value="specific" control={<Radio />} label="특정인 대상의 욕설 및 비방" />
          <FormControlLabel value="defamation" control={<Radio />} label="명예 훼손 및 사생활 침해 및 저작권 침해" />
          <FormControlLabel
            value="disabled"
            disabled
            control={<Radio />}
            label="(신고 사유를 클릭해주세요)"
          />
        </RadioGroup>
      </FormControl>
      <div className="padLR">
      <FormLabel component="legend">신고 사유</FormLabel>
      <TextField
        style={{width:"100%"}}
        id="standard-bare"
        className={classes.textField}
        defaultValue=""
        placeholder="신고 사유를 적어주세요"
        margin="normal"
        inputProps={{ 'aria-label': 'bare' }}
      />
      </div>
      <div style={{textAlign: "center"}}>
        <Button variant="contained" color="primary" onClick={noticeReport}  className={classes.button}>
          신고 하기
        </Button>
      </div>
    </div>
  );
}