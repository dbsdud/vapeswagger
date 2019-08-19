package com.poly.toba.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("AdmanageDTO")
public class AdmanageDTO {
	private String adNo;	//광고번호
	private String adTitle;	//광고명
	private String adEnable;   //노출횟수
	private String adClick;    // 클릭 횟수
	private String adImg;  // 이미지 경로
	private String adLink; // 사이트 주소
	private String adClientName;   // 광고주 명
	private String adClientNumber; // 광고주 연락처
	private String adActive; // 광고 노출여부
	private String adRegdate;  // 등록일시
	private String adChgdate;   // 수정일시
}
