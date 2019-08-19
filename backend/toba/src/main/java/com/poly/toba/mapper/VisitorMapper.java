package com.poly.toba.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.poly.toba.model.EmailDTO;
import com.poly.toba.model.UserDTO;
import com.poly.toba.model.VisitorDTO;

@Mapper
public interface VisitorMapper {

	public int getVisitorCheck(VisitorDTO visitDTO) throws Exception;

	public int insertVisitor(VisitorDTO visitDTO) throws Exception;

	public int getTotalVisitor(VisitorDTO visitDTO) throws Exception;

}
