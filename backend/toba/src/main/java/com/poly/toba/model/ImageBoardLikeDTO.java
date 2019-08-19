package com.poly.toba.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("ImageBoardLikeDTO")
public class ImageBoardLikeDTO {
	private String likeNo;
	private String imageBoardNo;
	private String userNo;
}
