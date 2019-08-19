package com.poly.toba.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("EmailDTO")
public class EmailDTO {
	private String emailKey;
	private String userEmail;
	private String userRegDate;
	private String expiredDate;
}
