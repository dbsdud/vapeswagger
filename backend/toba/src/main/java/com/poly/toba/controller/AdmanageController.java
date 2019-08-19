package com.poly.toba.controller;


import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.xml.bind.DatatypeConverter;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poly.toba.model.AdPagingDTO;
import com.poly.toba.model.AdmanageDTO;
import com.poly.toba.model.PagingDTO;
import com.poly.toba.service.impl.IAdmanageService;
import com.poly.toba.util.MakeThumbnail;

@SpringBootApplication
@MapperScan(basePackages = "com.poly.toba")
@RestController
@RequestMapping("/admanage")
public class AdmanageController {
	@Autowired
	private IAdmanageService admanageService;
	
	
	// 전체조회
	@GetMapping("/totalAdmanage/{pageno}")
	public ResponseEntity<HashMap<String, Object>> getAdList(@PathVariable String pageno) throws Exception {
		// 페이징
		int page = Integer.parseInt(pageno);
		int listCnt = admanageService.adTotalCount();
		AdPagingDTO paging = new AdPagingDTO();
		paging.pageInfo(page, listCnt);
		HashMap<String, Integer> hMap = new HashMap<>();
		int i = paging.getStartList();
		int j = paging.getListSize();
		hMap.put("startlist", i);
		hMap.put("listsize", j);
		
		List<AdmanageDTO> adList = admanageService.getAdList(hMap);
		
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("adList", adList);
		resultMap.put("paging", paging);

		return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
	}
	// 노출광고 관리
		@GetMapping("/EnableAdManage/{pageno}")
		public ResponseEntity<HashMap<String, Object>> getAdEnableList(@PathVariable String pageno) throws Exception {
			// 페이징
			int page = Integer.parseInt(pageno);
			int listCnt = admanageService.adEnableCount();
			AdPagingDTO paging = new AdPagingDTO();
			paging.pageInfo(page, listCnt);
			HashMap<String, Integer> hMap = new HashMap<>();
			int i = paging.getStartList();
			int j = paging.getListSize();
			hMap.put("startlist", i);
			hMap.put("listsize", j);
			
			List<AdmanageDTO> adEnableList = admanageService.getAdEnableList(hMap);
			
			HashMap<String, Object> resultMap = new HashMap<>();
			resultMap.put("adList", adEnableList);
			resultMap.put("paging", paging);
			resultMap.put("listCnt", listCnt);

			return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
		}
		// 비활성 광고 관리
		@GetMapping("/DisableAdManage/{pageno}")
		public ResponseEntity<HashMap<String, Object>> getAdDisableList(@PathVariable String pageno) throws Exception {
			// 페이징
			int page = Integer.parseInt(pageno);
			int listCnt = admanageService.adDisableCount();
			AdPagingDTO paging = new AdPagingDTO();
			paging.pageInfo(page, listCnt);
			HashMap<String, Integer> hMap = new HashMap<>();
			int i = paging.getStartList();
			int j = paging.getListSize();
			hMap.put("startlist", i);
			hMap.put("listsize", j);
			List<AdmanageDTO> adDisableList = admanageService.getAdDisableList(hMap);
			
			HashMap<String, Object> resultMap = new HashMap<>();
			resultMap.put("adList", adDisableList);
			resultMap.put("paging", paging);
			resultMap.put("listCnt", listCnt);
			
			return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
		}
		// 광고 등록
		@PostMapping("/adRegister")
		public ResponseEntity<String> adRegister(@RequestBody AdmanageDTO adDTO) throws Exception{
			//
			String datatype = adDTO.getAdImg().split(",")[0];
			switch (datatype) {//이미지 타입 체크
            case "data:image/jpeg;base64":
            	datatype = "jpeg";
                break;
            case "data:image/png;base64":
            	datatype = "png";
                break;
            case "data:image/gif;base64":
            	datatype = "gif";
                break;
            default://이미지 타입
            	datatype = "jpg";
                break;
			}
			String data = adDTO.getAdImg().split(",")[1];
		    String now = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()); // 현재시간 나타내는 변수
			try {
				String adImgResize = MakeThumbnail.adImgResize(datatype, data, now);
				adDTO.setAdImg(adImgResize);
				adDTO.setAdChgdate(now);
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			int result = admanageService.insertAd(adDTO);
			
			if (result == 1) {
				return new ResponseEntity<String>("success", HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("failed", HttpStatus.BAD_REQUEST);
			}
		}
		// 상세 조회
		@GetMapping("/adDetail/{adNo}")
		public ResponseEntity<HashMap<String, Object>> getAdDetail(@PathVariable String adNo) throws Exception {
			AdmanageDTO adDTO = new AdmanageDTO();
			HashMap<String, Object> hMap = new HashMap<>();
			adDTO.setAdNo(adNo);
			adDTO = (AdmanageDTO) admanageService.getAdDetail(adDTO);
			hMap.put("adDTO", adDTO);
			return new ResponseEntity<HashMap<String, Object>>(hMap, HttpStatus.OK);
		}
		// 광고 수정
		@CrossOrigin("*")
		@PutMapping("/adUpdate")
		public ResponseEntity<String> adUpdate(@RequestBody AdmanageDTO adDTO) throws Exception {
			String datatype = adDTO.getAdImg().split(",")[0];
			switch (datatype) {//이미지 타입 체크
            case "data:image/jpeg;base64":
            	datatype = "jpeg";
                break;
            case "data:image/png;base64":
            	datatype = "png";
                break;
            case "data:image/gif;base64":
            	datatype = "gif";
                break;
            default://이미지 타입
            	datatype = "jpg";
                break;
			}
			String data = adDTO.getAdImg().split(",")[1];
		    String now = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()); // 현재시간 나타내는 변수
			try {
				String adImgResize = MakeThumbnail.adImgResize(datatype, data, now);
				adDTO.setAdImg(adImgResize);
				adDTO.setAdChgdate(now);
			} catch (IOException e) {
				e.printStackTrace();
			}
			int result = admanageService.updateAd(adDTO);
			if (result == 1) {
				return new ResponseEntity<String>("success", HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("failed", HttpStatus.BAD_REQUEST);
			}
		}
		// 광고 활성화/비활성화
		@CrossOrigin("*")
		@PutMapping("/adEnDisable")
		public ResponseEntity<HashMap<String,Object>> adEnDisable(@RequestBody List<String> adNoList) throws Exception {
			int adNoListSize = adNoList.size()-1;
			int result;
			if (adNoList.get(adNoListSize).toString().equals("disable")) {
				for (int i=0; i < adNoListSize; i++) {
					result = admanageService.adEnDisable("0",adNoList.get(i).toString());
				}
			} else if (adNoList.get(adNoListSize).toString().equals("enable")) {
				for (int i=0; i < adNoListSize; i++) {
					result = admanageService.adEnDisable("1",adNoList.get(i).toString());
				}
			}
			return new ResponseEntity<HashMap<String, Object>>(HttpStatus.OK);
		}
		// 광고 검색
		@GetMapping("/adSearch/{adActive}/{adSearch}/{pageno}")
		public ResponseEntity<HashMap<String, Object>> getAdSearch(@PathVariable String adSearch, @PathVariable String adActive, @PathVariable String pageno) throws Exception {
			if(adSearch.equals("all")) {
				adSearch = "";
			}
			// 페이징
			int page = Integer.parseInt(pageno);
			int listCnt = admanageService.adSearchCount(adSearch);
			AdPagingDTO paging = new AdPagingDTO();
			paging.pageInfo(page, listCnt);
			HashMap<String, Object> hMap = new HashMap<>();
			switch(adActive) {
			case "total" :
				adActive = "";
				break;
			case "enable" :
				adActive = "1";
				break;
			case "disable" :
				adActive = "0";
				break;
		}
			Object i = paging.getStartList();
			Object j = paging.getListSize();
			hMap.put("adSearch", adSearch);
			hMap.put("adActive", adActive);
			hMap.put("startlist", i);
			hMap.put("listsize", j);
			
			List<AdmanageDTO> adSearchList = admanageService.getAdSearchList(hMap);
			
			HashMap<String, Object> resultMap = new HashMap<>();
			resultMap.put("adSearchList", adSearchList);
			resultMap.put("paging", paging);
			resultMap.put("listCnt", listCnt);
			
			return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
		}
		//메인 광고 랜덤 한개만 노출 , 전체 노출
		@GetMapping("/exposeAd")
		public ResponseEntity<HashMap<String,Object>> getExposeAd() throws Exception{
			List<AdmanageDTO> adExposeList = new ArrayList();
			AdmanageDTO aDTO = new AdmanageDTO();
			HashMap<String,Object> hMap = new HashMap<>();
			String adNo;
			String adActive = "1";
			adExposeList = admanageService.getAdExposeList(adActive);
			int adRandomExposeNo = (int) (Math.random()*adExposeList.size()); //0<= x <5  1<= x <2 
			aDTO = adExposeList.get(adRandomExposeNo);
			System.out.println("번호:"+adRandomExposeNo);
		    System.out.println(aDTO.getAdNo());
		    adNo = aDTO.getAdNo();
		    
			//메인 광고 노출 카운트 1 증가 하는 서비스 
			int result  = admanageService.updateMainAdExposeCountUp(adNo);
			//광고 노출 횟수가 0 이면 완료 컬럼
			//광고 노출 
			hMap.put("adExposeList",adExposeList);
			hMap.put("aDTO", aDTO);
			return new ResponseEntity<HashMap<String,Object>>(hMap,HttpStatus.OK);
		}
		
}