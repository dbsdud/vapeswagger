package com.poly.toba.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.toba.mapper.AdmanageMapper;
import com.poly.toba.model.AdmanageDTO;
import com.poly.toba.service.impl.IAdmanageService;

@Service
public class AdmanageService implements IAdmanageService<AdmanageDTO>{

	@Autowired
	private AdmanageMapper admanageMapper;
	
	// 광고 단일조회
	@Override
	public AdmanageDTO getAdDetail(AdmanageDTO t) throws Exception {
	
		return admanageMapper.getAdDetail(t);
	}
	// 광고 조회수
	@Override
	public int adUpdateCount(AdmanageDTO nDTO) throws Exception {
		return admanageMapper.adUpdateCount(nDTO);
		
	}
	
	//페이징
	//광고 총개수
	@Override
	public int adTotalCount() throws Exception {
		return admanageMapper.adTotalCount();
	}
	//광고 리스트
	@Override
	public List<AdmanageDTO> getAdList(HashMap<String, Integer> hMap) throws Exception {
		return admanageMapper.getAdList(hMap);
	}
	//노출 광고리스트
	@Override
	public List<AdmanageDTO> getAdEnableList(HashMap<String, Integer> hMap) throws Exception {
		return admanageMapper.getAdEnableList(hMap);
	}
	//비활 광고리스트
	@Override
	public List<AdmanageDTO> getAdDisableList(HashMap<String, Integer> hMap) throws Exception {
		return admanageMapper.getAdDisableList(hMap);
	}
	//광고 등록
	@Override
	public int insertAd(AdmanageDTO adDTO) throws Exception {
		return admanageMapper.insertAd(adDTO);
	}
	//광고 수정
	@Override
	public int updateAd(AdmanageDTO adDTO) throws Exception {
		return admanageMapper.updateAd(adDTO);
	}
	//광고 비활성화
	@Override
	public int adEnDisable(String able, String adNoList) throws Exception {
		return admanageMapper.adEnDisable(able, adNoList);
	}
	@Override
	public List<AdmanageDTO> getAdSearchList(HashMap<String, Object> hMap) throws Exception {
		return admanageMapper.getAdSearchList(hMap);
	}
	// 노출 광고 개수
	@Override
	public int adEnableCount() throws Exception {
		return admanageMapper.adEnableCount();
	}
	// 비활성 광고 개수
	@Override
	public int adDisableCount() throws Exception {
		return admanageMapper.adDisableCount();
	}
	// 광고 검색 개수
	@Override
	public int adSearchCount(String adSearch) throws Exception {
		return admanageMapper.adSearchCount(adSearch);
	}
	//광고 노출 리스트 
	@Override
	public List<AdmanageDTO> getAdExposeList(String adActive) throws Exception {
		// TODO Auto-generated method stub
		return admanageMapper.getAdExposeList(adActive);
	}
	//메인 광고 1개 노출 카운트
	@Override
	public int updateMainAdExposeCountUp(String adNo) throws Exception {
		// TODO Auto-generated method stub
		return admanageMapper.updateMainAdExposeCountUp(adNo);
	}
}
