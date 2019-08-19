package com.poly.toba.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("RecommentDTO")
public class RecommentDTO {
	private String recommentNo;
	private String recommentContent;
	private String recommentRegdate;
	private String recommentWriter;
	private String noticeNo;
	private String commentNo;
	private String userNo;
	private String userProfilePath;
}
