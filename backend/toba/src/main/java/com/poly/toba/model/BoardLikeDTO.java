package com.poly.toba.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("BoardLikeDTO")
public class BoardLikeDTO {
	private String likeNo;
	private String noticeNo;
	private String userNo;
}
