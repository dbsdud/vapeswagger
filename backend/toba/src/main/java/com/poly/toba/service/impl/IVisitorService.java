package com.poly.toba.service.impl;

import java.util.HashMap;
import java.util.List;

import com.poly.toba.model.CommentDTO;
import com.poly.toba.model.LikeDTO;
import com.poly.toba.model.RecommentDTO;
import com.poly.toba.model.VisitorDTO;

public interface IVisitorService {

	public int getVisitorCheck(VisitorDTO visitDTO) throws Exception;

	public int insertVisitor(VisitorDTO visitDTO) throws Exception;

	public int getTotalVisitor(VisitorDTO visitDTO) throws Exception;

}
