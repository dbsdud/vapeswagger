package com.poly.toba.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("NoticeDTO")
public class NoticeDTO {
   private String noticeNo;
   private String noticeTitle;
   private String noticeContent;
   private String noticeRegdate;
   private String noticeWriter;
   private String noticePrev;
   private String noticeNext;
   private String noticeReadcount;
   private String noticeStatus;
}
