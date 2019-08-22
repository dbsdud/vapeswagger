package com.poly.toba.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.toba.mapper.AdmanageMapper;
import com.poly.toba.mapper.ReportMapper;
import com.poly.toba.model.ReportDTO;
import com.poly.toba.service.impl.IReportService;

@Service
public class ReportService implements IReportService{

	@Autowired
	private ReportMapper reportMapper;

	@Override
	public int insertBoardReport(ReportDTO rDTO) throws Exception {
		return reportMapper.insertBoardReport(rDTO);
	}
	
	
}
