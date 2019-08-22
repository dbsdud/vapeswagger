package com.poly.toba.controller;

import com.poly.toba.model.ReportDTO;
import com.poly.toba.service.impl.IReportService;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@MapperScan(basePackages = "com.poly.toba")
@RestController
@RequestMapping("/reports")
public class ReportController {
	 @Autowired
	 private IReportService reportService;
	
	@PostMapping("/boardReport")
	public ResponseEntity<Integer> insertBoardReport(@RequestBody ReportDTO rDTO) throws Exception {
	
		int result = reportService.insertBoardReport(rDTO);

	   return new ResponseEntity<Integer>(result, HttpStatus.OK);
	}
}