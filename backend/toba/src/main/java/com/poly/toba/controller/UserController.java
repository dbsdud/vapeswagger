package com.poly.toba.controller;


import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
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
import com.poly.toba.model.NoticeDTO;
import com.poly.toba.model.PagingDTO;
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
		System.out.println(uDTO);
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
	// git test
	// 회원
	@GetMapping("/membermanage/{index}")
	public ResponseEntity<HashMap<String, Object>> getUserList(@PathVariable List<String> index) throws Exception {
		String userActive = index.get(0);
		String pageno = index.get(1);
		String searchOption = index.get(2);
		String userSearch = index.get(3);
		System.out.println("userActive : " + userActive);
		System.out.println("pageno : " + pageno);
		System.out.println("searchOption : " + searchOption);
		System.out.println("userSearch : " + userSearch);
		if(userSearch.equals("all")) {
			userSearch = "";
		}
		switch(userActive) {
		case "total" :
			userActive = "";
			break;
		case "enable" :
			userActive = "1";
			break;
		case "disable" :
			userActive = "0";
			break;
		}
		String userEmailSearch ="";
		String userNickNameSearch ="";
		switch(searchOption) {
			case "아이디" :
				userEmailSearch = userSearch;
				break;
			case "닉네임" :
				userNickNameSearch = userSearch;
				break;
		}
		
		HashMap<String, String> sMap = new HashMap<>();
		sMap.put("userActive", userActive);
		sMap.put("userEmailSearch", userEmailSearch);
		sMap.put("userNickNameSearch", userNickNameSearch);
		
		// 페이징
	    PagingDTO paging = new PagingDTO();
	    int pagenum = Integer.parseInt(pageno);
	    int contentnum = 10;
	    int totalcount = 0;
	    
		totalcount = userService.userTotalCount(sMap);
		paging.setTotalcount(totalcount);// 전체 게시글 지정
	    paging.setPagenum(pagenum - 1);// 현재페이지를 페이지 객체에 지정한다 -1 해야 쿼리에서 사용가능
	    paging.setContentnum(contentnum);// 한 페이지에 몇개 씩 게시글을 보여줄지 지정
	    paging.setCurrentblock(pagenum);// 현재 페이지 블록이 몇번인지 현재 페이지 번호를 통해서 지정함
	    paging.setLastblock(paging.getTotalcount());// 마지막 블록 번호를 전체 게시글 수를 통해 정함
	    paging.prevnext(pagenum); // 현재 페이지 번호로 화살표를 나타낼지 정함
	    paging.setStartPage(paging.getCurrentblock());// 시작페이지를 페이지 블록번호로 정함
	    paging.setEndPage(paging.getLastblock(), paging.getCurrentblock());// 마지막 페이지를 마지막 페이지 블록과 현재 페이지 블록번호로 정함

	    HashMap<String, Object> hMap = new HashMap<>();
	    
	    switch(userActive) {
		case "total" :
			userActive = "";
			break;
		case "enable" :
			userActive = "1";
			break;
		case "disable" :
			userActive = "0";
				break;
		}
	    int i = paging.getPagenum() * 10;
	    int j = paging.getContentnum();
	    hMap.put("userActive", userActive);
		hMap.put("userEmailSearch", userEmailSearch);
		hMap.put("userNickNameSearch", userNickNameSearch);
	    hMap.put("pagenum", i);
	    hMap.put("contentnum", j);
	    
	    List<NoticeDTO> userList = userService.getUserList(hMap);
	    
	    HashMap<String, Object> resultMap = new HashMap<>();
	    resultMap.put("userList", userList);
	    resultMap.put("paging", paging);
	    resultMap.put("totalcount", totalcount);
	    
	    return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
	}
	// 회원 활성화/비활성화
	@CrossOrigin("*")
	@PutMapping("/userEnDisable")
	public ResponseEntity<HashMap<String,Object>> userEnDisable(@RequestBody List<String> userNoList) throws Exception {
		int userNoListSize = userNoList.size()-1;
		int result;
		if (userNoList.get(userNoListSize).toString().equals("disable")) {
			for (int i=0; i < userNoListSize; i++) {
				result = userService.userEnDisable("0",userNoList.get(i).toString());
			}
		} else if (userNoList.get(userNoListSize).toString().equals("enable")) {
			for (int i=0; i < userNoListSize; i++) {
				result = userService.userEnDisable("1",userNoList.get(i).toString());
			}
		} else {
			result = userService.userEnDisable(userNoList.get(0).toString(),userNoList.get(1).toString());
		}
		return new ResponseEntity<HashMap<String, Object>>(HttpStatus.OK);
	}
}
