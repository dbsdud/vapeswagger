package com.poly.toba.service.impl;

import java.util.HashMap;
import java.util.List;

import com.poly.toba.model.AdmanageDTO;

public interface IAdmanageService<T> {
	
	//광고 단일조회
	public T getAdDetail(T t) throws Exception;
	
	// 광고 조회수
	public int adUpdateCount(AdmanageDTO nDTO) throws Exception;

	//페이징
	//광고 총개수 
	public int adTotalCount() throws Exception;
	//광고 리스트
	public List<AdmanageDTO> getAdList(HashMap<String, Integer> hMap) throws Exception ;
	
	//노출 광고리스트
	public List<AdmanageDTO> getAdEnableList(HashMap<String, Integer> hMap) throws Exception;
	//비활 광고리스트
	public List<AdmanageDTO> getAdDisableList(HashMap<String, Integer> hMap) throws Exception;
	//광고 등록
	public int insertAd(AdmanageDTO adDTO) throws Exception;
	//광고 수정
	public int updateAd(AdmanageDTO adDTO) throws Exception;
	//광고 비활성
	public int adEnDisable(String able, String adNo) throws Exception;
	//광고 검색
	public List<AdmanageDTO> getAdSearchList(HashMap<String, Object> hMap) throws Exception;
	//노출 광고개수
	public int adEnableCount() throws Exception;
	//비활성 광고 개수
	public int adDisableCount() throws Exception;
	//검색 광고 개수
	public int adSearchCount(String adSearch) throws Exception;
	//광고 노출
	public List<AdmanageDTO> getAdExposeList(String adActive) throws Exception;
	
	//메인 광고 1개 노출 카운트 
	public int updateMainAdExposeCountUp(String adNo) throws Exception;

}
