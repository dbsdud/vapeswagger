package com.poly.toba.service.impl;

import java.util.HashMap;
import java.util.List;

import com.poly.toba.model.BoardLikeDTO;
import com.poly.toba.model.NoticeDTO;

public interface ICommonService<T> {
	
	
	//공지사항 단일 조회
	public T getDetail(T t) throws Exception;
	
	//조회수
	public int noticeUpdateCount(NoticeDTO nDTO) throws Exception;

	
	//페이징//////////////////////////////////
	//게시물 총 개수 
	public int noticeTotalCount() throws Exception;
	//게시물 조회
	public List<NoticeDTO> getNoticeList(HashMap<String, Integer> hMap) throws Exception ;
	
	//검색 후 all 게시물 개수
	public int noticeSearchTitleTotalCount(HashMap<String, Object> hMap) throws Exception;
	//검색 후 all  게시물 리스트
	public List<NoticeDTO> getNoticeSearchTitleList(HashMap<String, Object> hMap) throws Exception;
	// 등록
	public int noticeReg(NoticeDTO nDTO) throws Exception;
	// 좋아요
	public int noticeLikeCheck(BoardLikeDTO blDTO) throws Exception;
	public int noticeLike(BoardLikeDTO blDTO) throws Exception;
	public int noticeLikeDelete(BoardLikeDTO blDTO) throws Exception;
	public int noticeLikeTotalCount(BoardLikeDTO blDTO) throws Exception;
	// 메인 리스트 뿌리기
	public List<NoticeDTO> getMainNoticeList() throws Exception;
	
	public List<NoticeDTO> noticePagingLikeCnt(HashMap<String, Object> hMap) throws Exception;
	
	public int commentCountList(int noticeNo) throws Exception;
	public int likeCountList(int noticeNo) throws Exception;

	public int getCommentCount(NoticeDTO nextDTO) throws Exception;

	public int getSearchCommentCount(HashMap<String, Object> hMap) throws Exception;

	public int getSearchLikeCount(HashMap<String, Object> hMap) throws Exception;
	
	public int deleteNotice(String noticeNo) throws Exception;

	public int updateThumbnail(NoticeDTO nDTO) throws Exception;
}

