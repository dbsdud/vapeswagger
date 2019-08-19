package com.poly.toba.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.toba.mapper.CommentMapper;
import com.poly.toba.mapper.VisitorMapper;
import com.poly.toba.model.CommentDTO;
import com.poly.toba.model.LikeDTO;
import com.poly.toba.model.RecommentDTO;
import com.poly.toba.model.VisitorDTO;
import com.poly.toba.service.impl.ICommentService;
import com.poly.toba.service.impl.IVisitorService;

@Service
public class VisitorService implements IVisitorService{

	@Autowired
	private VisitorMapper visitorMapper;

	@Override
	public int getVisitorCheck(VisitorDTO visitDTO) throws Exception {
		// TODO Auto-generated method stub
		return visitorMapper.getVisitorCheck(visitDTO);
	}

	@Override
	public int insertVisitor(VisitorDTO visitDTO) throws Exception {
		// TODO Auto-generated method stub
		return visitorMapper.insertVisitor(visitDTO);
	}

	@Override
	public int getTotalVisitor(VisitorDTO visitDTO) throws Exception {
		// TODO Auto-generated method stub
		return visitorMapper.getTotalVisitor(visitDTO);
	}

	

}
