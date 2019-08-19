package com.poly.toba.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.poly.toba.model.CommentDTO;
import com.poly.toba.model.LikeDTO;
import com.poly.toba.model.NoticeDTO;
import com.poly.toba.model.RecommentDTO;

@Mapper
public interface ImageBoardCommentMapper {

	public List<CommentDTO> getCommentList(HashMap<String, Object> hMap);;

	public int insertComment(CommentDTO cDTO) throws Exception;
//
	public int commentListTotalCount(CommentDTO cDTO);
	public int recommentListTotalCount(RecommentDTO recDTO) throws Exception;

	public List<RecommentDTO> getRecommentList(HashMap<String, Object> hMap) throws Exception;

	public int insertRecomment(RecommentDTO recDTO) throws Exception;

	public int deleteComment(String commentNo) throws Exception;

	public void deleteRecomment(String commentNo) throws Exception;

	public int deleteRecommentSel(String recommentNo) throws Exception;
//
//	public LikeDTO likeCheck(LikeDTO likeDTO) throws Exception;
//
//	public int likeUp(LikeDTO likeDTO) throws Exception;
//
//	public int likeDown(LikeDTO likeDTO) throws Exception;
//
//	public int likeCommentCount(LikeDTO likeDTO) throws Exception;
//
	public List<CommentDTO> pagingLikeCnt(HashMap<String, Object> hMap);
//
	public int commentCount(int imageBoardNo) throws Exception;
	
	public String getContent(CommentDTO cDTO) throws Exception;
	
	public int commentUpd(CommentDTO cDTO) throws Exception;

	public int recommentUpd(RecommentDTO rDTO) throws Exception;

	public String getRecomContent(RecommentDTO reDTO) throws Exception;

//	public String getProfileImg(String commentWriter) throws Exception;
}
