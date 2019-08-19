package com.poly.toba.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.poly.toba.model.AdmanageDTO;

@Mapper
public interface AdmanageMapper {

	// 광고 단일조회
	public AdmanageDTO getAdDetail(AdmanageDTO t) throws Exception;

	// 광고 조회수
	public int adUpdateCount(AdmanageDTO nDTO) throws Exception;

	// 페이징
	// 광고 총개수
	public int adTotalCount() throws Exception;

	// 광고 리스트
	public List<AdmanageDTO> getAdList(HashMap<String, Integer> hMap) throws Exception;
	// 노출 광고 리스트
	public List<AdmanageDTO> getAdEnableList(HashMap<String, Integer> hMap) throws Exception;
	// 노출 광고 리스트
	public List<AdmanageDTO> getAdDisableList(HashMap<String, Integer> hMap) throws Exception;
	// 광고등록
	public int insertAd(AdmanageDTO adDTO) throws Exception;
	// 광고수정
	public int updateAd(AdmanageDTO adDTO) throws Exception;

	public int adEnDisable(String able, String adNo) throws Exception;

	public List<AdmanageDTO> getAdSearchList(HashMap<String, Object> hMap) throws Exception;

	public int adEnableCount() throws Exception;

	public int adDisableCount() throws Exception;

	public int adSearchCount(String adSearch) throws Exception;

	//광고 노출 총
	public List<AdmanageDTO> getAdExposeList(String adActive) throws Exception;
	
	//메인 광고 1개 노출 카운트
	public int updateMainAdExposeCountUp(String adNo) throws Exception;

	//광고 클릭
	public void updateAdClick(String adNo) throws Exception;
}
