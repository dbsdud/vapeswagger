package com.poly.toba.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poly.toba.model.CommentDTO;
import com.poly.toba.model.PagingDTO;
import com.poly.toba.model.RecomPagingDTO;
import com.poly.toba.model.RecommentDTO;
import com.poly.toba.service.impl.ICommentService;
@SpringBootApplication
@RestController
@MapperScan(basePackages = "com.poly.toba")
@RequestMapping("/recomments")
public class RecommentController {
	@Autowired
	private ICommentService commentService;
	
	@GetMapping("/list/{noticeNo}/{commentno}/{pageno}")
	public ResponseEntity<HashMap<String,Object>> getCommentList(@PathVariable String noticeNo,@PathVariable String commentno,@PathVariable String pageno) throws Exception{
		System.out.println("aucqua:"+pageno);
		System.out.println("aucquaas:"+commentno);
		//페이징
		RecomPagingDTO paging = new RecomPagingDTO();
		int pagenum = Integer.parseInt(pageno);
		int contentnum = 5;
		int totalcount = 0;
		RecommentDTO recDTO = new RecommentDTO();
		List<RecommentDTO> cList = new ArrayList<>();
		HashMap<String,Object> hMap = new HashMap<>();
		recDTO.setNoticeNo(noticeNo);
		recDTO.setCommentNo(commentno);
		
		/*
		 * if(cList==null) { hMap.put("commentTotalCount", 0); }else { hMap.put("cList",
		 * cList); hMap.put("commentTotalCount", cList.size()); }
		 */
		totalcount=commentService.recommentListTotalCount(recDTO);
		paging.setTotalcount(totalcount);//전체 게시글 지정
 		paging.setPagenum(pagenum-1);// 현재페이지를 페이지 객체에 지정한다 -1 해야 쿼리에서 사용가능
 		paging.setContentnum(contentnum);// 한 페이지에 몇개 씩 게시글을 보여줄지 지정
 		paging.setCurrentblock(pagenum);//현재 페이지 블록이 몇번인지 현재 페이지 번호를 통해서 지정함
 		paging.setLastblock(paging.getTotalcount());//마지막 블록 번호를 전체 게시글 수를 통해 정함
 		paging.prevnext(pagenum); //현재 페이지 번호로 화살표를 나타낼지 정함
 		paging.setStartPage(paging.getCurrentblock());//시작페이지를 페이지 블록번호로 정함
 		paging.setEndPage(paging.getLastblock(), paging.getCurrentblock());//마지막 페이지를 마지막 페이지 블록과 현재 페이지 블록번호로 정함
 		int i = paging.getPagenum()*5;
		int j = paging.getContentnum();
		hMap.put("pagenum",i);
		hMap.put("contentnum", j);
		hMap.put("noticeNo", recDTO.getNoticeNo());
		hMap.put("commentno", recDTO.getCommentNo());
		cList = commentService.getRecommentList(hMap);
		if(cList==null) {
			hMap.put("recommentTotalCount", 0);
		}else {
			hMap.put("cList", cList);
			hMap.put("recommentTotalCount", paging.getTotalcount());
			hMap.put("paging", paging);	
		}
		return new ResponseEntity<HashMap<String,Object>>(hMap,HttpStatus.OK);
	}
	@PostMapping("/register")
	public ResponseEntity<String> insertComment(@RequestBody RecommentDTO recDTO) throws Exception{
		int result = commentService.insertRecomment(recDTO);
		
		if(result == 1) {
			return new ResponseEntity<String>("success",HttpStatus.OK);
		}else {
			return new ResponseEntity<String>("failed",HttpStatus.BAD_REQUEST);
		}
	
	}
	@CrossOrigin(origins = "*")
	@PutMapping("/delete/{noticeNo}/{commentNo}/{recommentNo}")
	public ResponseEntity<String> deleteComment(@PathVariable String noticeNo,
												@PathVariable String commentNo,
												@PathVariable String recommentNo) throws Exception{
		RecommentDTO reDTO = new RecommentDTO();
		reDTO.setNoticeNo(noticeNo);											
		reDTO.setCommentNo(commentNo);
		reDTO.setRecommentNo(recommentNo);
		int result = commentService.deleteRecommentSel(reDTO);
		if(result == 1) {
			return new ResponseEntity<String>("success",HttpStatus.OK);
		}else {
			return new ResponseEntity<String>("failed",HttpStatus.BAD_REQUEST);
		}
	}
	@CrossOrigin(origins = "*")
	@PutMapping("/update")
	public ResponseEntity<String> updateRecomment(@RequestBody RecommentDTO rDTO) throws Exception{
		commentService.remmentUpd(rDTO);
		String content = rDTO.getRecommentContent();
		return new ResponseEntity<String>(content, HttpStatus.OK);
	}
	@GetMapping("/detail/{noticeNo}/{commentNo}/{recommentNo}")
	   public ResponseEntity<String> getRecomContent(@PathVariable String noticeNo, @PathVariable String commentNo, @PathVariable String recommentNo) throws Exception {
	      System.out.println("대댓글 가져와");
	      RecommentDTO reDTO = new RecommentDTO();
	      reDTO.setNoticeNo(noticeNo);
	      reDTO.setCommentNo(commentNo);
	      reDTO.setRecommentNo(recommentNo);
	      String content = (commentService.getRecomContent(reDTO)).toString();
	      return new ResponseEntity<String>(content, HttpStatus.OK);
	   }
}
