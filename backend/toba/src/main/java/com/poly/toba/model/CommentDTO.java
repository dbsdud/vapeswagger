package com.poly.toba.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("CommentDTO")
public class CommentDTO {
	private String commentNo;
	private String commentContent;
	private String commentRegdate;
	private String noticeNo;
	private String commentWriter;
	private String userNo;
	private String likeUpCnt;
	private String userProfilePath;
}
