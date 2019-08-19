package com.poly.toba.util;

import java.util.HashMap;

import org.springframework.stereotype.Repository;

import com.poly.toba.model.EmailDTO;
import com.poly.toba.model.UserDTO;

@Repository
public class Email {
	private String subject;
	private String content;
	private String regdate;
	private String reciver;
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
        this.subject = subject;
    }
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getRegdate() {
		return regdate;
	}
	public void setRegdate(String regdate) {
		this.regdate = regdate;
	}
	public String getReciver() {
		return reciver;
	}
	public void setReciver(String reciver) {
		this.reciver = reciver;
	}
	public String setContents(EmailDTO eDTO){
    	String contents = "";
    	contents +="<html>";
    	contents +="<head>";
    	contents +="<title></title>";
    	contents +="</head>";
    	contents +="<body>";
    	contents +="<div style='margin: auto;text-align: center;width: 670px; height:365px; border-top: 2px solid #60b9ce;border-right: 1px solid #e7e7e7;border-left: 1px solid #e7e7e7;border-bottom: 1px solid #e7e7e7;'>";
    	contents +="<div style='float: left;background-color: #ffffff;padding: 40px 30px 0 35px;text-align: center;'>";
    	contents +="<div style='float: left;width:605px;border:0px;text-align: left;font-family: '맑은 고딕','돋움';'>";
    	contents +="<div style='float:left; width:50%; color: #2daad1; font-size: 25px; text-align: left; word-spacing: -6px; vertical-align: top;'>";
    	contents +="Tobaco";
    	contents +="<br> 회원가입에 감사합니다.";
    	contents +="<hr style='background-color:#43bdb2; border:0px; width:47px; height:3px; margin: 20px 0 0 0;'>";
    	contents +="</div>";
    	contents +="<div style='float:left;width:50%; text-align:center'>";
//    	contents +="<img src="http://placehold.it/300x110">";
    	contents +="</div>";
    	contents +="<div style='float: left;width: 100%;font-size: 17px;vertical-align: bottom;height: 27px;'> 안녕하세요 <strong>Tobaco</strong> 입니다.</div>";
    	contents +="<div style='float: left;width: 100%;font-size: 13px;word-spacing: -1px;height: 30px;'>아래 인증번호를 입력하시고 계속 작성해 주세요.</div>";
    	contents +="</div>";
    	contents +="</div>";
    	contents +="<div style='float: left; padding: 39px 196px 70px;'>";
    	contents +="<div style='width:278px; height:49px; background-color: #3cbfaf; font-family: '맑은 고딕','돋움';'>";
    	contents +="<div style='padding: 16px 0; color: #fff;'>인증번호 : <span style='font-weight: bolder;'>"+eDTO.getEmailKey()+"</span></div>";
    	contents +="</div>";
    	contents +="</div>";
    	contents +="</div>";
    	contents +="</body>";
    	contents +="</html>";
    	return contents;
    }
}
