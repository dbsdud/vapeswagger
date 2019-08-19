package com.poly.toba.model;

import java.io.Serializable;
import java.util.List;

import lombok.Data;

@Data
public class LoginParams implements Serializable {
	private static final long serialVersionUID = 7710662072308044971L;

	private String userEmail;
	private String userPassword;
	private List<String> authorizes;
}
