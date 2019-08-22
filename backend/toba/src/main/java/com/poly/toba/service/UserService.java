package com.poly.toba.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poly.toba.mapper.UserMapper;
import com.poly.toba.model.EmailDTO;
import com.poly.toba.model.NoticeDTO;
import com.poly.toba.model.UserDTO;
import com.poly.toba.service.impl.IUserService;

@Service
public class UserService implements IUserService{
	@Autowired
	private UserMapper userMapper;

	@Override
	public int regUser(UserDTO uDTO) throws Exception {
		return userMapper.regUser(uDTO);
	}
	// 중복확인
	@Override
	public int getUserEmailCheck(String userEmail) throws Exception {
		return userMapper.getUserEmailCheck(userEmail);
	}
	@Override
	public int getUserNickCheck(String userNick) throws Exception {
		return userMapper.getUserNickCheck(userNick);
	}
	// 인증번호 발급
	@Override
	public int regKey(EmailDTO eDTO) throws Exception {
		return userMapper.regKey(eDTO);
	}
	@Override
	public UserDTO getUserAuth(UserDTO uDTO) throws Exception {
		long random = (long)(Math.random() * 900000001) + 100000001;
		String authNum = Long.toHexString(random);
		uDTO.setUserAuthKey(authNum);
		return uDTO;
	}
	@Override
	public int getEmailKey(String emailKey) throws Exception {
		return userMapper.getEmailKey(emailKey);
	}
	@Override
	public int changeStatus(EmailDTO eDTO) throws Exception {
		return userMapper.changeStatus(eDTO);
	}
	
	// Login
	@Override
	public UserDTO getUserLogin(UserDTO uDTO) throws Exception {
		return userMapper.getUserLogin(uDTO);
	}
	// 비밀번호 변경
	@Override
	public int updatePassword(UserDTO uDTO) throws Exception {
		return userMapper.updatePassword(uDTO);
	}
	@Override
	public int changeNick(UserDTO uDTO) throws Exception {
		return userMapper.changeNick(uDTO);
	}
	@Override
	public int profileUpd(UserDTO uDTO) throws Exception {
		return userMapper.profileUpd(uDTO);
	}
	// 전체 회원 수
	@Override
	public int userTotalCount(HashMap<String, String> sMap) throws Exception {
		return userMapper.userTotalCount(sMap);
	}
	// 회원 리스트
	@Override
	public List<NoticeDTO> getUserList(HashMap<String, Object> hMap) throws Exception {
		return userMapper.getUserList(hMap);
	}
	// 회원 활성화/비활성화
	@Override
	public int userEnDisable(String enabled, String userNo) throws Exception {
		return userMapper.userEnDisable(enabled, userNo);
	}
}
