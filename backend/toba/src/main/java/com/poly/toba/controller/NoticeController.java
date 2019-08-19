package com.poly.toba.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;
import javax.xml.bind.DatatypeConverter;

import org.apache.commons.collections.CollectionUtils;
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

import com.poly.toba.model.BoardLikeDTO;
import com.poly.toba.model.CommentDTO;
import com.poly.toba.model.NoticeDTO;
import com.poly.toba.model.PagingDTO;
import com.poly.toba.service.impl.ICommentService;
import com.poly.toba.service.impl.ICommonService;
import com.poly.toba.util.CmmUtil;
import com.poly.toba.util.MakeThumbnail;
import com.poly.toba.util.StringUtil;

@SpringBootApplication
@MapperScan(basePackages = "com.poly.toba")
@RestController
@RequestMapping("/notices")
public class NoticeController {
   @Autowired
   private ICommonService noticeService;
   @Autowired
   private ICommentService commentService;

   // 전체조회
   @GetMapping("/list/{pageno}")
   public ResponseEntity<HashMap<String, Object>> getNoticeAllList(@PathVariable String pageno) throws Exception {
      System.out.println("확인");
      HashMap<String, Object> resultMap = new HashMap<>();
      // 페이징
      PagingDTO paging = new PagingDTO();
      int pagenum = Integer.parseInt(pageno);
      int contentnum = 10;
      int totalcount = 0;
      totalcount = noticeService.noticeTotalCount();
      paging.setTotalcount(totalcount);// 전체 게시글 지정
      paging.setPagenum(pagenum - 1);// 현재페이지를 페이지 객체에 지정한다 -1 해야 쿼리에서 사용가능
      paging.setContentnum(contentnum);// 한 페이지에 몇개 씩 게시글을 보여줄지 지정
      paging.setCurrentblock(pagenum);// 현재 페이지 블록이 몇번인지 현재 페이지 번호를 통해서 지정함
      paging.setLastblock(paging.getTotalcount());// 마지막 블록 번호를 전체 게시글 수를 통해 정함
      paging.prevnext(pagenum); // 현재 페이지 번호로 화살표를 나타낼지 정함
      paging.setStartPage(paging.getCurrentblock());// 시작페이지를 페이지 블록번호로 정함
      paging.setEndPage(paging.getLastblock(), paging.getCurrentblock());// 마지막 페이지를 마지막 페이지 블록과 현재 페이지 블록번호로 정함
      List<NoticeDTO> nList = new ArrayList();
      HashMap<String, Object> hMap = new HashMap<>();
      
      int i = paging.getPagenum() * 10;
      int j = paging.getContentnum();
      hMap.put("pagenum", i);
      hMap.put("contentnum", j);
      nList = noticeService.getNoticeList(hMap);
      resultMap.put("nList", nList);
      resultMap.put("paging", paging);
      // 댓글, 좋아요 개수 가져오기
      int noticeNo, commentCount, likeCount;
      List<Integer> commentCountList = new ArrayList<>();
      List<Integer> likeCountList = new ArrayList<>();
      for(int k=0; k<nList.size(); k++) {
         noticeNo = Integer.valueOf(nList.get(k).getNoticeNo());
         System.out.println(noticeNo);
         commentCount = noticeService.commentCountList(noticeNo);
         likeCount = noticeService.likeCountList(noticeNo);
         commentCountList.add(commentCount);
         likeCountList.add(likeCount);
      }
      resultMap.put("commentCountList", commentCountList);
      resultMap.put("likeCountList", likeCountList);
      return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
   }

   @GetMapping("/list/{pageno}/{searchWord}/{searchCategory}")
   public ResponseEntity<HashMap<String, Object>> getNoticeList(@PathVariable String pageno,
         @PathVariable String searchWord, @PathVariable String searchCategory) throws Exception {

      HashMap<String, Object> resultMap = new HashMap<>();
      // 페이징
      PagingDTO paging = new PagingDTO();
      int pagenum = Integer.parseInt(pageno);
      int contentnum = 10;
      int totalcount = 0;
      int noticeNo, commentCount, likeCount;
      List<Integer> commentCountList = new ArrayList<>();
      List<Integer> likeCountList = new ArrayList<>();
      if (CmmUtil.nvl(searchWord) != "") {
         HashMap<String, Object> hMap = new HashMap<>();
         hMap.put("searchWord", searchWord);
         hMap.put("searchCategory", searchCategory);
         totalcount = noticeService.noticeSearchTitleTotalCount(hMap);
         paging.setTotalcount(totalcount);// 전체 게시글 지정
         paging.setPagenum(pagenum - 1);// 현재페이지를 페이지 객체에 지정한다 -1 해야 쿼리에서 사용가능
         paging.setContentnum(contentnum);// 한 페이지에 몇개 씩 게시글을 보여줄지 지정
         paging.setCurrentblock(pagenum);// 현재 페이지 블록이 몇번인지 현재 페이지 번호를 통해서 지정함
         paging.setLastblock(paging.getTotalcount());// 마지막 블록 번호를 전체 게시글 수를 통해 정함
         paging.prevnext(pagenum); // 현재 페이지 번호로 화살표를 나타낼지 정함
         paging.setStartPage(paging.getCurrentblock());// 시작페이지를 페이지 블록번호로 정함
         paging.setEndPage(paging.getLastblock(), paging.getCurrentblock());// 마지막 페이지를 마지막 페이지 블록과 현재 페이지 블록번호로
                                                            // 정함
         List<NoticeDTO> nList = new ArrayList();
         int i = paging.getPagenum() * 10;
         int j = paging.getContentnum();
         hMap.put("pagenum", i);
         hMap.put("contentnum", j);
         nList = noticeService.getNoticeSearchTitleList(hMap);
         resultMap.put("nList", nList);
         resultMap.put("paging", paging);
         for (int k = 0; k < nList.size(); k++) {
            noticeNo = Integer.valueOf(nList.get(k).getNoticeNo());
            hMap.put("noticeNo", noticeNo);
            commentCount = noticeService.getSearchCommentCount(hMap);
            likeCount = noticeService.getSearchLikeCount(hMap);
            commentCountList.add(commentCount);
            likeCountList.add(likeCount);
         }
         resultMap.put("commentCountList", commentCountList);
         resultMap.put("likeCountList", likeCountList);
      }
      return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);

   }

   // 단일조회
   @GetMapping("/detail/{noticeNo}")
   public ResponseEntity<HashMap<String, Object>> getNoticeDetail(@PathVariable String noticeNo) throws Exception {
      NoticeDTO nDTO = new NoticeDTO();
      NoticeDTO prevDTO = new NoticeDTO();
      NoticeDTO nextDTO = new NoticeDTO();
      HashMap<String, Object> hMap = new HashMap<>();
      nDTO.setNoticeNo(noticeNo);
      nDTO = (NoticeDTO) noticeService.getDetail(nDTO);
      // 조회수
      int result = noticeService.noticeUpdateCount(nDTO);
      hMap.put("nDTO", nDTO);
      hMap.put("noticeTotalCount", noticeService.noticeTotalCount());
      // 좋아요 수 가져오기
      BoardLikeDTO blDTO = new BoardLikeDTO();
      blDTO.setNoticeNo(noticeNo);
      int likeCount = noticeService.noticeLikeTotalCount(blDTO);
      hMap.put("noticeLikeCount", likeCount);
      // 이전글, 다음글 댓글 개수
      int prevCommentCount, nextCommentCount;
      // 페이징
      String prev, next;
      if (nDTO.getNoticePrev() == null && nDTO.getNoticeNext() != null) {
         prev = "이전 글이 없습니다.";
         prevDTO.setNoticeNo("0");
         prevDTO.setNoticeTitle(prev);
         nextDTO.setNoticeNo(nDTO.getNoticeNext());
         nextDTO = (NoticeDTO) noticeService.getDetail(nextDTO);
         nextCommentCount = noticeService.getCommentCount(nextDTO);
         hMap.put("prevDTO", prevDTO);
         hMap.put("nextDTO", nextDTO);
         hMap.put("nextCommentCount", nextCommentCount);
      } else if (nDTO.getNoticePrev() != null && nDTO.getNoticeNext() == null) {
         prevDTO.setNoticeNo(nDTO.getNoticePrev());
         prevDTO = (NoticeDTO) noticeService.getDetail(prevDTO);
         next = "다음 글이 없습니다.";
         prevCommentCount = noticeService.getCommentCount(prevDTO);
         nextDTO.setNoticeNo("0");
         nextDTO.setNoticeTitle(next);
         hMap.put("prevDTO", prevDTO);
         hMap.put("nextDTO", nextDTO);
         hMap.put("prevCommentCount", prevCommentCount);
      } else if (nDTO.getNoticeNext() != null && nDTO.getNoticePrev() != null) {
         prevDTO.setNoticeNo(nDTO.getNoticePrev());
         prevDTO = (NoticeDTO) noticeService.getDetail(prevDTO);
         nextDTO.setNoticeNo(nDTO.getNoticeNext());
         nextDTO = (NoticeDTO) noticeService.getDetail(nextDTO);
         nextCommentCount = noticeService.getCommentCount(nextDTO);
         prevCommentCount = noticeService.getCommentCount(prevDTO);
         hMap.put("prevDTO", prevDTO);
         hMap.put("nextDTO", nextDTO);
         hMap.put("nextCommentCount", nextCommentCount);
         hMap.put("prevCommentCount", prevCommentCount);
      } else {
         prev = "이전 글이 없습니다.";
         next = "다음 글이 없습니다.";
         prevDTO.setNoticeNo("0");
         prevDTO.setNoticeTitle(prev);
         nextDTO.setNoticeNo("0");
         nextDTO.setNoticeTitle(next);
         hMap.put("prevDTO", prevDTO);
         hMap.put("nextDTO", nextDTO);
      }
      
      return new ResponseEntity<HashMap<String, Object>>(hMap, HttpStatus.OK);
   }

   @PostMapping("/noticeSubmit")
      public ResponseEntity<Integer> regNotice(@RequestBody NoticeDTO nDTO) throws Exception {
         // 리눅스 기준으로 파일 경로를 작성 ( 루트 경로인 /으로 시작한다. )
         // 윈도우라면 workspace의 드라이브를 파악하여 JVM이 알아서 처리해준다.
         // 따라서 workspace가 C드라이브에 있다면 C드라이브에 upload 폴더를 생성해 놓아야 한다.
         String path = "/usr/local/tomcat/webapps/ROOT/imageUpload/notice/";
         String newFileName = "";
         String thumbFileName ="";
         String extension = "";
         UUID uid = UUID.randomUUID();
         String now = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()); // 현재시간 나타내는 변수
         String year = now.substring(0,4);
        String month = now.substring(4,6);
        String day = now.substring(6,8);
        String hour = now.substring(8,10);
         String contentBase64 = nDTO.getNoticeContent();
         int result = 0;
         List<String> oldSrc = new ArrayList<>();
         List<String> newSrc = new ArrayList<>();
         List<String> newFileNameList = new ArrayList<>();
         List<String> thumbFileNameList = new ArrayList<>();
         List<String> imgList = new ArrayList();
         List<String> newThumbFilelist = new ArrayList<>();
         
         result=noticeService.noticeReg(nDTO);
         imgList = StringUtil.getImgSrc(contentBase64);
         if(imgList.size()>0) {
            for (int i = 0; i < imgList.size(); i++) {
                String[] strings = imgList.get(i).toString().split(",");
                switch (strings[0]) {// 이미지 타입 체크
                case "data:image/jpeg;base64":
                   extension = "jpeg";
                   break;
                case "data:image/png;base64":
                   extension = "png";
                   break;
                case "data:image/gif;base64":
                   extension = "gif";
                   break;
                default:// 이미지 타입
                   extension = "jpg";
                   break;
                }
                // 변환 base64 string to binary data
                byte[] data = DatatypeConverter.parseBase64Binary(strings[1]);
                newFileName = path+year+"/"+month+"/"+day+"/"+hour+"/"+nDTO.getNoticeNo()+"/"+uid + now + i + "." + extension;
                thumbFileName = uid + now + i;
                File filePath = new File(path+year+"/"+month+"/"+day+"/"+hour+"/"+nDTO.getNoticeNo()+"/");
                if (!filePath.isDirectory()) {
                   filePath.mkdirs();
                }
                File file = new File(newFileName);
                try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(file))) {
                   outputStream.write(data);
                } catch (IOException e) {
                   e.printStackTrace();
                }
                //이미지 이동
                oldSrc.add(imgList.get(i).toString());
                newSrc.add("http://15.164.160.236:8080/imageUpload/notice/"+year+"/"+month+"/"+day+"/"+hour+"/"+nDTO.getNoticeNo()+"/thumbs/"+"THUMB_" + uid + now + i + "." + extension);
                newFileNameList.add(newFileName);
                thumbFileNameList.add(thumbFileName);
             }
            String replaceContent = StringUtil.getImgSrcReplace(contentBase64, oldSrc, newSrc);
            nDTO.setNoticeContent(replaceContent);
            for(int k=0; k<thumbFileNameList.size();k++) {
               String thumbnailPath=MakeThumbnail.makeThumbnail(path,newFileNameList.get(k), thumbFileNameList.get(k),extension,year,month,day,hour,nDTO.getNoticeNo());
               newThumbFilelist.add(thumbnailPath);
            }
           
            int result2 = noticeService.updateThumbnail(nDTO);
            //원본 파일 삭제
            if(result2 == 1) {
               for (String imgPath : newFileNameList) {
                  File file2 = new File(imgPath);
                  file2.delete();
               } 
            }
         }else if(imgList.size()== 0) {
            int result2 = noticeService.updateThumbnail(nDTO);
         }
         newFileNameList=null;
         thumbFileNameList=null;
         oldSrc=null;
         newSrc=null;
         imgList=null;
         if (result == 1) {
            return new ResponseEntity<Integer>(result, HttpStatus.OK);
         } else {
            return new ResponseEntity<Integer>(result, HttpStatus.OK);
         }
      }

   // 공지사항 좋아요
   @PostMapping("/noticeLike")
   public ResponseEntity<Integer> noticeLike(@RequestBody BoardLikeDTO blDTO) throws Exception {
      int likeCount, result;
      // 좋아요 여부 확인
      result = noticeService.noticeLikeCheck(blDTO);
      // 좋아요 하지 않았었으면
      if (result == 0) {
         result = noticeService.noticeLike(blDTO);
         likeCount = noticeService.noticeLikeTotalCount(blDTO);
      } else {
         // 좋아요 했었으면
         result = noticeService.noticeLikeDelete(blDTO);
         likeCount = noticeService.noticeLikeTotalCount(blDTO);
      }
      return new ResponseEntity<Integer>(likeCount, HttpStatus.OK);
   }
   // 삭제
   @CrossOrigin(origins = "*")
   @PutMapping("/delete/{noticeNo}")
   public ResponseEntity<String> deleteNotice(@PathVariable String noticeNo) throws Exception {
      System.out.println("delete : " + noticeNo);
      int result = noticeService.deleteNotice(noticeNo);
      if(result == 1) {
         return new ResponseEntity<String>("success", HttpStatus.OK); 
      } else {
         return new ResponseEntity<String>("failed", HttpStatus.BAD_REQUEST);
      }
   }
   //수정
   @CrossOrigin(origins = "*")
   @PutMapping("/update")
   public ResponseEntity<String> updateNotice(@RequestBody NoticeDTO nDTO) throws Exception {
      List<String> imgList = new ArrayList();
      List<String> detailImgList = new ArrayList();
      List<String> oldSrc = new ArrayList<>();
      List<String> newSrc = new ArrayList<>();
      List<String> newFileNameList = new ArrayList<>();
      List<String> thumbFileNameList = new ArrayList<>();
      List<String> newList = new ArrayList<>();
      List<String> newThumbFilelist = new ArrayList<>();
      String compFile = "";
      String path = "/usr/local/tomcat/webapps/ROOT/imageUpload/notice/";
      String newFileName = "";
      String thumbFileName = "";
      String extension = "";
      UUID uid = UUID.randomUUID();
      String now = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()); // 현재시간 나타내는 변수
      String year = now.substring(0,4);
      String month = now.substring(4,6);
      String day = now.substring(6,8);
      String hour = now.substring(8,10);
      String contentBase64 = nDTO.getNoticeContent();
      // 바꿔서 들어온값
      imgList = StringUtil.getImgSrc(nDTO.getNoticeContent());
      NoticeDTO nDetail = new NoticeDTO();
      nDetail = (NoticeDTO) noticeService.getDetail(nDTO);
      // 기존 값
      detailImgList = StringUtil.getImgSrc(nDetail.getNoticeContent());
      if (imgList.size() > 0) {
         for (int i = 0; i < imgList.size(); i++) {
            compFile = imgList.get(i).replace("http://15.164.160.236:8080/imageUpload/notice/", path);
            File refile = new File(compFile);
            boolean isExists = refile.exists();
            if (!(isExists)) {
               System.out.println("파일 존재안해 임마 " + i);
               String[] strings = imgList.get(i).toString().split(",");
               switch (strings[0]) {// 이미지 타입 체크
               case "data:image/jpeg;base64":
                  extension = "jpeg";
                  break;
               case "data:image/png;base64":
                  extension = "png";
                  break;
               case "data:image/gif;base64":
                  extension = "gif";
                  break;
               default:// 이미지 타입
                  extension = "jpg";
                  break;
               }
               // 변환 base64 string to binary data
               byte[] data = DatatypeConverter.parseBase64Binary(strings[1]);

               newFileName = path +year+"/"+month+"/"+day+"/"+hour+"/"+nDTO.getNoticeNo()+"/"+ uid + now + i + "." + extension;
               thumbFileName ="/"+year+"/"+month+"/"+day+"/"+hour+"/"+ uid + now + i;
               File filePath = new File(path+year+"/"+month+"/"+day+"/"+hour+"/"+nDTO.getNoticeNo()+"/");
               if (!filePath.isDirectory()) {
                  filePath.mkdirs();
               }
               File file = new File(newFileName);
               try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(file))) {
                  outputStream.write(data);
               } catch (IOException e) {
                  e.printStackTrace();
               }
               // 이미지 이동
               oldSrc.add(imgList.get(i).toString());
               newSrc.add("http://15.164.160.236:8080/imageUpload/notice/"+year+"/"+month+"/"+day+"/"+hour+"/"+nDTO.getNoticeNo()+"/thumbs/"+"THUMB_" + uid + now + i + "." + extension);
               newFileNameList.add(newFileName);
               thumbFileNameList.add(thumbFileName);
            }
         }
            for(int k=0; k<thumbFileNameList.size();k++) {
               String thumbnailPath=MakeThumbnail.makeThumbnail(path,newFileNameList.get(k), thumbFileNameList.get(k),extension,year,month,day,hour,nDTO.getNoticeNo());
               newThumbFilelist.add(thumbnailPath);
            }
          
         String replaceContent = StringUtil.getImgSrcReplace(contentBase64, oldSrc, newSrc);
         nDTO.setNoticeContent(replaceContent);
         newList = StringUtil.getImgSrc(replaceContent);
         Collection<String> imgDelFile = CollectionUtils.subtract(detailImgList, newList);
         for (String imgPath : imgDelFile) {
            File file2 = new File(imgPath.replace("http://15.164.160.236:8080/imageUpload/notice/", path));
            file2.delete();
         }
         //변환안된 원본 파일
         if(newFileNameList.size()>0) {
            for (String imgPath : newFileNameList) {
               File file3 = new File(imgPath);
               file3.delete();
            }
         }
         int result2 = noticeService.updateThumbnail(nDTO);
      } else if (imgList.size() == 0) {
         Collection<String> imgDelFile = CollectionUtils.subtract(detailImgList, newList);
         for (String imgPath : imgDelFile) {
            File file2 = new File(imgPath.replace("http://15.164.160.236:8080/imageUpload/notice/", path));
            file2.delete();
         }
         int result2 = noticeService.updateThumbnail(nDTO);
      }

      return new ResponseEntity<String>("success", HttpStatus.OK);
   }
   
   
   // 수정 > 내용 가져오기
   @GetMapping("/noticeModify/{noticeNo}")
   public ResponseEntity<HashMap<String, Object>> noticeModify(@PathVariable String noticeNo) throws Exception {
      NoticeDTO nDTO = new NoticeDTO();
      HashMap<String, Object> hMap = new HashMap<>();
      nDTO.setNoticeNo(noticeNo);
      nDTO = (NoticeDTO) noticeService.getDetail(nDTO);
      hMap.put("nDTO", nDTO);
      return new ResponseEntity<HashMap<String, Object>>(hMap, HttpStatus.OK);
   }
}