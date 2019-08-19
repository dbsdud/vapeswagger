package com.poly.toba.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("LikeDTO")
public class LikeDTO {
	private String likeNo;
	private String userNo;
	private String commentNo;
	private String noticeNo;
	private String likeCheck;
}
