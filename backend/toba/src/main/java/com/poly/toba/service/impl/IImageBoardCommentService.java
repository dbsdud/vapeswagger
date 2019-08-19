package com.poly.toba.service.impl;

import java.util.HashMap;
import java.util.List;

import com.poly.toba.model.CommentDTO;
import com.poly.toba.model.RecommentDTO;

public interface IImageBoardCommentService {

	public int commentCount(int imageBoardNo) throws Exception;

	public List<CommentDTO> getCommentList(HashMap<String, Object> hMap) throws Exception;

	public List<CommentDTO> pagingLikeCnt(HashMap<String, Object> hMap) throws Exception;

	public int commentListTotalCount(CommentDTO cDTO) throws Exception;

	public int insertComment(CommentDTO cDTO) throws Exception;

	public int deleteComment(String commentNo) throws Exception;

	public String getContent(CommentDTO cDTO) throws Exception;

	public void commentUpd(CommentDTO cDTO) throws Exception;

	public int recommentListTotalCount(RecommentDTO recDTO) throws Exception;

	public List<RecommentDTO> getRecommentList(HashMap<String, Object> hMap) throws Exception;

	public int insertRecomment(RecommentDTO recDTO) throws Exception;

	public int deleteRecommentSel(String recommentNo) throws Exception;

	public String getRecomContent(RecommentDTO reDTO) throws Exception;

	public void recommentUpd(RecommentDTO rDTO) throws Exception; 

}
