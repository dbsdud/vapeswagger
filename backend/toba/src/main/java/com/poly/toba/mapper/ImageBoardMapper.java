package com.poly.toba.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.poly.toba.model.BoardLikeDTO;
import com.poly.toba.model.ImageBoardDTO;
import com.poly.toba.model.ImageBoardLikeDTO;
import com.poly.toba.model.NoticeDTO;

@Mapper
public interface ImageBoardMapper {

//	//공지사항 단일조회
	public ImageBoardDTO getImageBoardDetail(ImageBoardDTO ibDTO);
//	//조회수
	public int imageBoardUpdateCount(ImageBoardDTO ibDTO);
//	
//	//페이징 /////////////////////////////
//	//게시물 총 개수
	public int imageBoardTotalCount() throws Exception;
//	//게시물 리스트
	public List<ImageBoardDTO> getImageBoardList(HashMap<String, Object> hMap) throws Exception;
	public List<ImageBoardDTO> getImageBoardSearchTitleList(HashMap<String, Object> hMap) throws Exception;
	//검색 게시물 총개수
	public int imageBoardSearchTitleTotalCount(HashMap<String, Object> hMap);
//	// 등록
//	public int noticeReg(NoticeDTO nDTO) throws Exception;
//	// 좋아요
	
//	public int noticeLikeCheck(BoardLikeDTO blDTO) throws Exception;
//	public int noticeLike(BoardLikeDTO blDTO) throws Exception;
//	public int noticeLikeDelete(BoardLikeDTO blDTO) throws Exception;
	public int imageBoardLikeTotalCount(ImageBoardLikeDTO blDTO);
	// 메인 이미지 리스트 뿌리기
	public List<ImageBoardDTO> getMainImgBoardList() throws Exception;
	
//	public List<NoticeDTO> noticePagingLikeCnt(HashMap<String, Object> hMap) throws Exception;
//	
	public int imageBoardCommentCountList(int imageBoardNo) throws Exception;
//	public int likeCountList(int noticeNo) throws Exception;
//	
	public int getImageBoardCommentCount(ImageBoardDTO nextDTO);
//	
	public int getImageBoardSearchCommentCount(HashMap<String, Object> hMap);
	public int getImageBoardSearchLikeCount(HashMap<String, Object> hMap);
//	public int deleteNotice(String noticeNo) throws Exception;
//	public int updateThumbnail(NoticeDTO nDTO) throws Exception;	
	
}
