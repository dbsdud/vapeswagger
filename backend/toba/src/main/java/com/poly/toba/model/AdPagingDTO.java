package com.poly.toba.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("AdPagingDTO")
public class AdPagingDTO {
//	 검색하기 위한 변수
	 private String searchWord;
	 private String searchCategory;
	 //													┌─── 다음 페이지(next)
	 // 페이지 범위(range)->  1  2  3  4  5  6  7  8  9 10 >
	 //												 └───> 끝번호(endPage)
	 //                 < 11 12 13 14 15 16 17 18 19 20 >
	 //	 이전 페이지(prev)──┘
	 //                 < 21 22 23 24 25 26 27 28 29 30 >
	 //                 < 31 32 33
	 // 시작 번호(startPage)─┘
	 
	 private int listCnt;	// 총 게시물의 개수
	 private int pageCnt;	// 총 페이지 범위의 개수
	 private int page;	// 현재 페이지 (1, 2, 3 ,~, 31, 32, 33)
	 private int range;	// 현재 페이지 범위 (1~10, 11~20, 21~30, 30~33)
	 private int listSize=9;	// 한 페이지 목록의 개수 (한 페이지에 출력되는 게시글 개수) 9
	 private int rangeSize=10;	// 한 페이지 범위의 개수 (한 페이지에 출력되는 범위 개수) 10
	 private int startPage;	// 시작번호 (1, 11, 21, 31)
	 private int endPage;	// 끝번호 (10, 20, 30, 33)
	 private int startList; // 게시판 시작번호
	 private boolean prev;	// 이전페이지 (<)
	 private boolean next;	// 다음페이지 (>)
	 
	// 페이지 정보
	// 			            현재 페이지 번호, 총 게시글 개수
	public void pageInfo(int page, int listCnt) {
		this.page = page;
		this.listCnt = listCnt;
		
		//전체 페이지수 
		this.pageCnt = (int) Math.ceil(listCnt/(listSize*1.0));
		//현재 페이지 범위
		this.range = (int) Math.ceil(page/10.0);
		//시작 페이지
		this.startPage = (range - 1) * rangeSize + 1;
		//끝 페이지
		this.endPage = range * rangeSize;
		//게시판 시작번호
		this.startList = (page - 1) * listSize;
		//이전 버튼 상태
		this.prev = range == 1 ? false : true;
		//다음 버튼 상태
		this.next = endPage > pageCnt ? false : true;
		if (this.endPage > this.pageCnt) {
			this.endPage = this.pageCnt;
			this.next = false;
		}
	}
}
