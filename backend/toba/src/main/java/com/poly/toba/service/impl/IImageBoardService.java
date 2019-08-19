package com.poly.toba.service.impl;

import java.util.HashMap;
import java.util.List;

import com.poly.toba.model.ImageBoardDTO;
import com.poly.toba.model.ImageBoardLikeDTO;

public interface IImageBoardService {

	public List<ImageBoardDTO> getMainImgBoardList() throws Exception;

	public int imageBoardTotalCount() throws Exception;

	public List<ImageBoardDTO> getImageBoardList(HashMap<String, Object> hMap) throws Exception;

	public int imageBoardCommentCountList(int imageBoardNo) throws Exception;

	public int imageBoardLikeCountList(int imageBoardNo) throws Exception;

	public List<ImageBoardDTO> getImageBoardSearchTitleList(HashMap<String, Object> hMap) throws Exception;

	public int getImageBoardSearchCommentCount(HashMap<String, Object> hMap) throws Exception;

	public int getImageBoardSearchLikeCount(HashMap<String, Object> hMap) throws Exception;

	public int imageBoardSearchTitleTotalCount(HashMap<String, Object> hMap) throws Exception;

	public ImageBoardDTO getImageBoardDetail(ImageBoardDTO ibDTO) throws Exception;

	public int imageBoardUpdateCount(ImageBoardDTO ibDTO) throws Exception;

	public int imageBoardLikeTotalCount(ImageBoardLikeDTO blDTO) throws Exception;

	public int getImageBoardCommentCount(ImageBoardDTO nextDTO) throws Exception;


}
