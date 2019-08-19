package com.poly.toba.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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
import com.poly.toba.model.LikeDTO;
import com.poly.toba.model.PagingDTO;
import com.poly.toba.service.impl.ICommentService;

@SpringBootApplication
@RestController
@RequestMapping("/comments")
public class CommentController {
	@Autowired
	private ICommentService commentService;

	@GetMapping("/list/{noticeNo}/{pageno}")
	public ResponseEntity<HashMap<String, Object>> getCommentList(@PathVariable String noticeNo,
			@PathVariable String pageno) throws Exception {
		System.out.println("aucqua:" + pageno);
		// 페이징
		PagingDTO paging = new PagingDTO();
		int pagenum = Integer.parseInt(pageno);
		int contentnum = 10;
		int totalcount = 0;
		CommentDTO cDTO = new CommentDTO();
		List<CommentDTO> cList = new ArrayList<>();
		HashMap<String, Object> hMap = new HashMap<>();
		cDTO.setNoticeNo(noticeNo);

		totalcount = commentService.commentListTotalCount(cDTO);
		paging.setTotalcount(totalcount);// 전체 게시글 지정
		paging.setPagenum(pagenum - 1);// 현재페이지를 페이지 객체에 지정한다 -1 해야 쿼리에서 사용가능
		paging.setContentnum(contentnum);// 한 페이지에 몇개 씩 게시글을 보여줄지 지정
		paging.setCurrentblock(pagenum);// 현재 페이지 블록이 몇번인지 현재 페이지 번호를 통해서 지정함
		paging.setLastblock(paging.getTotalcount());// 마지막 블록 번호를 전체 게시글 수를 통해 정함
		paging.prevnext(pagenum); // 현재 페이지 번호로 화살표를 나타낼지 정함
		paging.setStartPage(paging.getCurrentblock());// 시작페이지를 페이지 블록번호로 정함
		paging.setEndPage(paging.getLastblock(), paging.getCurrentblock());// 마지막 페이지를 마지막 페이지 블록과 현재 페이지 블록번호로 정함
		int i = paging.getPagenum() * 10;
		int j = paging.getContentnum();
		hMap.put("pagenum", i);
		hMap.put("contentnum", j);
		hMap.put("noticeNo", cDTO.getNoticeNo());
		cList = commentService.getCommentList(hMap);
		System.out.println(cList);
		
		// 좋아요 개수
		List<String> cLikeList = new ArrayList<>();
		List<CommentDTO> cLikeCountList = new ArrayList<>();
		if (cList.size() == 0) {
			hMap.put("commentTotalCount", 0);
			hMap.put("cLikeCountList", "");
			hMap.put("cList", cList);
			hMap.put("commentTotalCount", paging.getTotalcount());
			hMap.put("paging", paging);
		} else {
			hMap.put("cList", cList);
			hMap.put("commentTotalCount", paging.getTotalcount());
			hMap.put("paging", paging);
			for (int k = 0; k < cList.size(); k++) {
				cLikeList.add(cList.get(k).getCommentNo());
			}
			hMap.put("cLikeList", cLikeList);
			cLikeCountList = commentService.pagingLikeCnt(hMap);
			hMap.put("cLikeCountList", cLikeCountList);
		}
		return new ResponseEntity<HashMap<String, Object>>(hMap, HttpStatus.OK);
	}

	@PostMapping("/register")
	public ResponseEntity<String> insertComment(@RequestBody CommentDTO cDTO) throws Exception {
		int result = commentService.insertComment(cDTO);

		if (result == 1) {
			return new ResponseEntity<String>("success", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("failed", HttpStatus.BAD_REQUEST);
		}
	}

	@CrossOrigin(origins = "*")
	@DeleteMapping("/delete/{commentNo}")
	public ResponseEntity<String> deleteComment(@PathVariable String commentNo) throws Exception {
		System.out.println("삭제" + commentNo);
		int result = commentService.deleteComment(commentNo);

		if (result == 1) {
			return new ResponseEntity<String>("success", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("failed", HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/likeUp")
	public ResponseEntity<HashMap<String, Object>> likeUp(@RequestBody LikeDTO likeDTO) throws Exception {

		LikeDTO result = new LikeDTO();
		int result2 = 0;
		int likeCommentCount = 0;
		boolean check = false;
		HashMap<String, Object> hMap = new HashMap<>();
		result = commentService.likeCheck(likeDTO);
		if (result == null) {
			result2 = commentService.likeUp(likeDTO);
			result = commentService.likeCheck(likeDTO);
			likeCommentCount = commentService.likeCommentCount(likeDTO);
			hMap.put("result", result);
			hMap.put("likeCommentCount", likeCommentCount);
		} else {
			result2 = commentService.likeDown(likeDTO);
			if (result2 == 1) {

				likeCommentCount = commentService.likeCommentCount(likeDTO);
				result.setLikeCheck("n");
				hMap.put("result", result);
				hMap.put("likeCommentCount", likeCommentCount);
			}
		}
		return new ResponseEntity<HashMap<String, Object>>(hMap, HttpStatus.OK);
	}

	
	@GetMapping("/detail/{noticeNo}/{commentNo}") 
	public ResponseEntity<String> getCommentDetail(@PathVariable String noticeNo, @PathVariable String commentNo) throws Exception { 
		System.out.println("댓글 가져와"); 
		CommentDTO cDTO = new CommentDTO(); 
		cDTO.setNoticeNo(noticeNo); 
		cDTO.setCommentNo(commentNo);
		String content =(commentService.getContent(cDTO)).toString();
		System.out.println(content); 
		return new ResponseEntity<String>(content, HttpStatus.OK); 
	}
	
	@CrossOrigin(origins = "*")
	@PutMapping("/update")
	public ResponseEntity<String> updateComment(@RequestBody CommentDTO cDTO) throws Exception {
		commentService.commentUpd(cDTO);
		String content = cDTO.getCommentContent();
		return new ResponseEntity<String>(content, HttpStatus.OK);
	}
}