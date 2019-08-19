package com.poly.toba.controller;

import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poly.toba.model.CommentDTO;
import com.poly.toba.model.NoticeDTO;
import com.poly.toba.model.VisitorDTO;
import com.poly.toba.service.impl.ICommentService;
import com.poly.toba.service.impl.ICommonService;
import com.poly.toba.service.impl.IVisitorService;

@SpringBootApplication
@MapperScan(basePackages = "com.poly.toba")
@RestController
@RequestMapping("/mains")
public class MainController {
	@Autowired
	private ICommonService noticeService;
	@Autowired
	private ICommentService commentService;
	@Autowired
	private IVisitorService visitorService;
	// 공지사항 최신 순 5개 리스트 가져오기
	@GetMapping("/mainNoticeList")
	public ResponseEntity<HashMap<String, Object>> getMainNoticeList() throws Exception {
		int noticeNo, commentCount;
		List<Integer> commentCountList = new ArrayList<>();
		HashMap<String, Object> hMap = new HashMap<>();
		List<NoticeDTO> nList = noticeService.getMainNoticeList();
		hMap.put("nList", nList);
		System.out.println("nList : "+nList);
		for (int i = 0; i < nList.size(); i++) {
			noticeNo = Integer.valueOf(nList.get(i).getNoticeNo());
			commentCount = commentService.commentCount(noticeNo);
			commentCountList.add(commentCount);
		}
		hMap.put("commentCountList", commentCountList);
		System.out.println(hMap);
		return new ResponseEntity<HashMap<String, Object>>(hMap, HttpStatus.OK);
	}

	// 총 방문자수 체킹
	@PostMapping("/visitorChecking")
	public ResponseEntity<Integer> getVisitorChecking(@RequestBody VisitorDTO visitDTO) throws Exception {
		String ipAddr = "";
		SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
		Date time = new Date();
		String todayDate = format1.format(time);
		try {
			for (Enumeration<NetworkInterface> en = NetworkInterface.getNetworkInterfaces(); en.hasMoreElements();) {
				NetworkInterface intf = en.nextElement();
				for (Enumeration<InetAddress> enumIpAddr = intf.getInetAddresses(); enumIpAddr.hasMoreElements();) {
					InetAddress inetAddress = enumIpAddr.nextElement();
					if (!inetAddress.isLoopbackAddress() && inetAddress instanceof Inet4Address) {
						ipAddr = inetAddress.getHostAddress();
					}
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		visitDTO.setVisitorIpaddr(ipAddr);
		visitDTO.setTodayDate(todayDate);

		int checkResult = visitorService.getVisitorCheck(visitDTO);
		int result = 0;
		if (checkResult == 0) {
			result = visitorService.insertVisitor(visitDTO);
		}
		int totalVisitor = visitorService.getTotalVisitor(visitDTO);
		System.out.println(totalVisitor);
		return new ResponseEntity<Integer>(totalVisitor, HttpStatus.OK);

	}

}
