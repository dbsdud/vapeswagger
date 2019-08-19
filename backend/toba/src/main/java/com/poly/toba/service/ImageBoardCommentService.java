package com.poly.toba.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.toba.mapper.ImageBoardCommentMapper;
import com.poly.toba.model.CommentDTO;
import com.poly.toba.model.RecommentDTO;
import com.poly.toba.service.impl.IImageBoardCommentService;
@Service
public class ImageBoardCommentService implements IImageBoardCommentService {
	
	@Autowired
	ImageBoardCommentMapper imageBoardCommentMapper;
	@Override
	public int commentCount(int imageBoardNo) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardCommentMapper.commentCount(imageBoardNo);
	}
	@Override
	public List<CommentDTO> getCommentList(HashMap<String, Object> hMap) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardCommentMapper.getCommentList(hMap);
	}
	@Override
	public List<CommentDTO> pagingLikeCnt(HashMap<String, Object> hMap) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardCommentMapper.pagingLikeCnt(hMap);
	}
	@Override
	public int commentListTotalCount(CommentDTO cDTO) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardCommentMapper.commentListTotalCount(cDTO);
	}
	@Override
	public int insertComment(CommentDTO cDTO) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardCommentMapper.insertComment(cDTO);
	}
	@Override
	public int deleteComment(String commentNo) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardCommentMapper.deleteComment(commentNo);
	}
	@Override
	public String getContent(CommentDTO cDTO) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardCommentMapper.getContent(cDTO);
	}
	@Override
	public void commentUpd(CommentDTO cDTO) throws Exception {
		// TODO Auto-generated method stub
		imageBoardCommentMapper.commentUpd(cDTO);
		
	}
	@Override
	public int recommentListTotalCount(RecommentDTO recDTO) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardCommentMapper.recommentListTotalCount(recDTO);
	}
	@Override
	public List<RecommentDTO> getRecommentList(HashMap<String, Object> hMap) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardCommentMapper.getRecommentList(hMap);
	}
	@Override
	public int insertRecomment(RecommentDTO recDTO) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardCommentMapper.insertRecomment(recDTO);
	}
	@Override
	public int deleteRecommentSel(String recommentNo) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardCommentMapper.deleteRecommentSel(recommentNo);
	}
	@Override
	public String getRecomContent(RecommentDTO reDTO) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardCommentMapper.getRecomContent(reDTO);
	}
	@Override
	public void recommentUpd(RecommentDTO rDTO) throws Exception {
		// TODO Auto-generated method stub
		imageBoardCommentMapper.recommentUpd(rDTO);
		
	}

}
