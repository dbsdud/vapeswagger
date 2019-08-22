package com.poly.toba.mapper;

import com.poly.toba.model.ReportDTO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReportMapper {

	public int insertBoardReport(ReportDTO rDTO) throws Exception;

	
}
