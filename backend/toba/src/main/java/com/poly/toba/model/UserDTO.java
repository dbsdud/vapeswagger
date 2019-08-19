package com.poly.toba.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("UserDTO")
public class UserDTO {
	private String userNo;
	private String userEmail;
	private String userPassword;
	private String userNickName;
	private String userName;
	private String userRegDate;
	private String userProfilePath;
	private String userProfileName;
	private String userProfileNameOrin;
	private String enabled;
	private String userAuthKey;
}
