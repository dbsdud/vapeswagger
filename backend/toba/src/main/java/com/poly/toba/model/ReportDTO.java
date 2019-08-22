package com.poly.toba.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("ReportDTO")
public class ReportDTO {

	private String reportNo;
	private String reportCategory;
	private String reportContent;
	private String userNo;
	private String commentNo;
	private String recommentNo;
	private String boardType;
	private String noticeNo;
	
	//이미지만 변수넣음
	private String imageBoardNo;

	
}
