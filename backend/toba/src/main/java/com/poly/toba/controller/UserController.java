package com.poly.toba.controller;


import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
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

import com.poly.toba.model.EmailDTO;
import com.poly.toba.model.UserDTO;
import com.poly.toba.service.impl.IUserService;
import com.poly.toba.util.Email;
import com.poly.toba.util.EmailSender;
import com.poly.toba.util.MakeThumbnail;
import com.poly.toba.util.SecurityUtil;
import com.poly.toba.util.TempKey;
@SpringBootApplication
@MapperScan(basePackages = "com.poly.toba")
@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	private IUserService userService;
	@Autowired
	private EmailSender emailSender;
	
	// 중복확인
	@GetMapping("/emailCheck/{userEmail}")
	public ResponseEntity<String> emailCheck(@PathVariable String userEmail) throws Exception {
		int count = 0;
		count = userService.getUserEmailCheck(userEmail);
		System.out.println(this.getClass() + " count : " + count);
		
		if(count!=0) {
			return new ResponseEntity<String>("1", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("0", HttpStatus.OK);
		}
	}
	@GetMapping("/nickCheck/{userNick}")
	public ResponseEntity<String> nickCheck(@PathVariable String userNick) throws Exception {
		int count = 0;
		count = userService.getUserNickCheck(userNick);
		System.out.println(this.getClass() + " count : " + count);
		if(count!=0) {
			return new ResponseEntity<String>("1", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("0", HttpStatus.OK);
		}
	}
	@PostMapping("/changeStatus")
	public ResponseEntity<String> changeStatus(@RequestBody EmailDTO eDTO) throws Exception {
		System.out.println("Status 변경");
		if(eDTO.getEmailKey() == null) {
			System.out.println("실패 1");
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		} else {
			int result = userService.changeStatus(eDTO);
			System.out.println("성공");
			return new ResponseEntity<String>(HttpStatus.OK);
		}
	}
	
	@PostMapping("/register")
	public ResponseEntity<String> userRegister(@RequestBody UserDTO uDTO) throws Exception{
		System.out.println("가입 시작");
		if(uDTO.getUserEmail() == null) {
			System.out.println("test");
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		} else {
			// 비밀번호 암호화
			String password = uDTO.getUserPassword();
			SecurityUtil securityUtil = new SecurityUtil();
			String newPassword = securityUtil.encryptSHA256(password);
			uDTO.setUserPassword(newPassword);
			// 회원가입
			int result = userService.regUser(uDTO);
			System.out.println("가입됨");
			// 인증번호 발급
			TempKey key = new TempKey();
			System.out.println(key);
			String emailKey = key.getKey(10, false);
			System.out.println(emailKey);
			EmailDTO eDTO = new EmailDTO(); 
			eDTO.setEmailKey(emailKey);
			eDTO.setUserEmail(uDTO.getUserEmail());
			userService.regKey(eDTO);
			System.out.println("발급 키 : " + emailKey);
			
			// 회원가입 후 메일 발송
			Email sendEmail = new Email();
			sendEmail.setReciver(uDTO.getUserEmail());
			sendEmail.setSubject("toba 회원가입 인증메일 발송 안내");
			sendEmail.setContent(sendEmail.setContents(eDTO));
			emailSender.SendEmail(sendEmail);
			System.out.println("메일발송 : " + sendEmail.getReciver());
			System.out.println("내용 : " + sendEmail.getContent());
			
			return new ResponseEntity<String>(HttpStatus.OK);
		}
	}
	@GetMapping("/authCheck/{emailKey}")
	public ResponseEntity<String> authCheck(@PathVariable String emailKey) throws Exception {
		int count = 0;
		count = userService.getEmailKey(emailKey);
		if(count!=0) {
			return new ResponseEntity<String>("1", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("0", HttpStatus.OK);
		}
	}
	
	@PostMapping("/login")
	public ResponseEntity<UserDTO> login(@RequestBody UserDTO uDTO, HttpSession session, 
										HttpServletResponse res) throws Exception {
		String password = uDTO.getUserPassword();
		SecurityUtil securityUtil = new SecurityUtil();
		String newPassword = securityUtil.encryptSHA256(password);
		uDTO.setUserPassword(newPassword);
		uDTO = userService.getUserLogin(uDTO);
		if(uDTO == null) {
			System.out.println(this.getClass() + " 로그인 실패"); 
			return new ResponseEntity<UserDTO>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<UserDTO>(uDTO, HttpStatus.OK);
		}
	}
	
	@PostMapping("/mypageEnter")
	public ResponseEntity<UserDTO> mypageEnter(@RequestBody UserDTO uDTO) throws Exception {
		String password = uDTO.getUserPassword();
		SecurityUtil securityUtil = new SecurityUtil();
		String newPassword = securityUtil.encryptSHA256(password);
		uDTO.setUserPassword(newPassword);
		uDTO = userService.getUserLogin(uDTO);
		if(uDTO == null) {
			return new ResponseEntity<UserDTO>(uDTO, HttpStatus.OK);
		} else {
			return new ResponseEntity<UserDTO>(uDTO, HttpStatus.OK);
		}
	}
	
	@PostMapping("/changePw")
	public ResponseEntity<String> changePw(@RequestBody UserDTO uDTO) throws Exception {
		String password = uDTO.getUserPassword();
		if(uDTO.getUserPassword() == null) {
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		} else {
			SecurityUtil securityUtil = new SecurityUtil();
			String newPassword = securityUtil.encryptSHA256(password);
			uDTO.setUserPassword(newPassword);
			int result = userService.updatePassword(uDTO);
			System.out.println(result);
			return new ResponseEntity<String>(HttpStatus.OK);
		}
	}
	@CrossOrigin(origins="*")
	@PutMapping("/changeNick")
	public ResponseEntity<String> changeNick(@RequestBody UserDTO uDTO) throws Exception {
		String nickname = uDTO.getUserNickName();
		uDTO.setUserNickName(nickname);
		userService.changeNick(uDTO);
		return new ResponseEntity<String>(HttpStatus.OK);
	}
	@CrossOrigin(origins="*")
	@PutMapping("/profileUpd")
	public ResponseEntity<String> profileUpd(@RequestBody UserDTO uDTO) throws Exception {
		System.out.println("프사 넣어");
		String path = "/usr/local/tomcat/webapps/ROOT/imageUpload/user/";
		String newFileName = "";
		String thumbFileName = "";
		String extension = "";
		UUID uid = UUID.randomUUID();
		String now = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
		String year = now.substring(0,4);
		String month = now.substring(4,6);
		String day = now.substring(6,8);
		String hour = now.substring(8,10);
		String contentBase64 = uDTO.getUserProfilePath();
		String oldSrc = "";
		String newSrc = "";
		
		String[] strings = contentBase64.toString().split(",");
		switch (strings[0]) {
		case "data:image/jpeg;base64":
			extension = "jpeg";
			break;
		case "data:image/png;base64":
			extension = "png";
			break;
		case "data:image/gif;base64":
			extension = "gif";
			break;
		default:
			extension = "jpg";
			break;
		} 
		byte[] data = DatatypeConverter.parseBase64Binary(strings[1]);
		newFileName = path + year + "/" + month + "/" + day + "/" + hour + "/userNo/" + uDTO.getUserNo() + "/"
					+ uid + now + uDTO.getUserNo() + "." + extension;
		System.out.println("newFileName : " + newFileName);
		thumbFileName = uid + now + uDTO.getUserNo();
		System.out.println("thumbFileName : " + thumbFileName);
		File filePath = new File(path + year + "/" + month + "/" + day + "/" + hour +
						"/userNo/" + uDTO.getUserNo() + "/");
		File lowPath = new File(path + year + "/" + month + "/" + day + "/" + hour +
				"/userNo/" + uDTO.getUserNo());
		System.out.println("filePath : " + filePath);
		if (!filePath.isDirectory()) {
			filePath.mkdirs();
		} else {
			lowPath.delete();
			filePath.mkdirs();
		}
		File file = new File(newFileName);
		System.out.println("file : " + file);
		try(OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(file))){
			outputStream.write(data);
		} catch (IOException e) {
			e.printStackTrace();
		}
		newSrc = "http://15.164.160.236:8080/imageUpload/user/" + year + "/" + month + "/" + day + "/" + hour + 
				 "/userNo/" + uDTO.getUserNo() + "/" + "profile_" + uid + now + uDTO.getUserNo() + "." + extension;
		System.out.println("newSrc : " + newSrc);
		String thumbnailPath = MakeThumbnail.makeThumnailProfile(path, newFileName, thumbFileName, extension, year, month, day, hour, uDTO.getUserNo());
		System.out.println("thumbnailPath : " + thumbnailPath);
		
		uDTO.setUserProfilePath(newSrc);
		userService.profileUpd(uDTO);
		File delOrin = new File(newFileName);
		delOrin.delete();
		
		newFileName = "";
		thumbFileName = "";
		thumbnailPath = "";
		newSrc = "";
		contentBase64 = "";
		return new ResponseEntity<String>(HttpStatus.OK);
	}
}
