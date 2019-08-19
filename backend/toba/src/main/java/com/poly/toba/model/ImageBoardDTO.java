package com.poly.toba.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("ImageBoardDTO")
public class ImageBoardDTO {
   private String imageBoardNo;
   private String imageBoardTitle;
   private String imageBoardContent;
   private String imageBoardRegdate;
   private String imageBoardWriter;
   private String imageBoardPrev;
   private String imageBoardNext;
   private String imageBoardReadcount;
   private String imageBoardStatus;
   
	 //이미지 게시판에서만 쓰이는 변수
	 private String prevThumb;
	 private String nextThumb;
}
