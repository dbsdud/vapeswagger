package com.poly.toba.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("VisitorDTO")
public class VisitorDTO {
	private String visitorNo;
	private String visitorStaticIp;
	private String visitorCheck;
	private String visitorTim;
	private String visitorIpaddr;
	private String todayDate;
}