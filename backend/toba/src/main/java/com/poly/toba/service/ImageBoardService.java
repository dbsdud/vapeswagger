package com.poly.toba.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.toba.mapper.ImageBoardMapper;
import com.poly.toba.model.ImageBoardDTO;
import com.poly.toba.model.ImageBoardLikeDTO;
import com.poly.toba.service.impl.IImageBoardService;
@Service
public class ImageBoardService implements IImageBoardService{

	@Autowired
	private ImageBoardMapper imageBoardMapper;

	@Override
	public List<ImageBoardDTO> getMainImgBoardList() throws Exception {
		return imageBoardMapper.getMainImgBoardList();
	}

	@Override
	public int imageBoardTotalCount() throws Exception {
		// TODO Auto-generated method stub
		return imageBoardMapper.imageBoardTotalCount();
	}

	@Override
	public List<ImageBoardDTO> getImageBoardList(HashMap<String, Object> hMap) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardMapper.getImageBoardList(hMap);
	}

	@Override
	public int imageBoardCommentCountList(int imageBoardNo) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardMapper.imageBoardCommentCountList(imageBoardNo);
	}

	@Override
	public int imageBoardLikeCountList(int imageBoardNo) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardMapper.imageBoardCommentCountList(imageBoardNo);
	}

	@Override
	public List<ImageBoardDTO> getImageBoardSearchTitleList(HashMap<String, Object> hMap) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardMapper.getImageBoardSearchTitleList(hMap);
	}

	@Override
	public int getImageBoardSearchCommentCount(HashMap<String, Object> hMap) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardMapper.getImageBoardSearchCommentCount(hMap);
	}

	@Override
	public int getImageBoardSearchLikeCount(HashMap<String, Object> hMap) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardMapper.getImageBoardSearchLikeCount(hMap);
	}

	@Override
	public int imageBoardSearchTitleTotalCount(HashMap<String, Object> hMap) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardMapper.imageBoardSearchTitleTotalCount(hMap);
	}

	@Override
	public ImageBoardDTO getImageBoardDetail(ImageBoardDTO ibDTO) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardMapper.getImageBoardDetail(ibDTO);
	}

	@Override
	public int imageBoardUpdateCount(ImageBoardDTO ibDTO) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardMapper.imageBoardUpdateCount(ibDTO);
	}

	@Override
	public int imageBoardLikeTotalCount(ImageBoardLikeDTO blDTO) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardMapper.imageBoardLikeTotalCount(blDTO);
	}

	@Override
	public int getImageBoardCommentCount(ImageBoardDTO nextDTO) throws Exception {
		// TODO Auto-generated method stub
		return imageBoardMapper.getImageBoardCommentCount(nextDTO);
	}


}
