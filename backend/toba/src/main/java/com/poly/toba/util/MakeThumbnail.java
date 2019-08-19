package com.poly.toba.util;

import java.awt.AlphaComposite;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.xml.bind.DatatypeConverter;

import org.apache.commons.io.FileUtils;
import org.imgscalr.Scalr;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.MetadataException;
import com.drew.metadata.exif.ExifIFD0Directory;

public class MakeThumbnail {
	
	private static final int IMG_WIDTH2 = 828;
	private static final int IMG_HEIGHT2 = 150;

	public static String makeThumbnail(String path, String newFileName, String fileName, String extension, String year,
		String month, String day, String hour, String noticeNo) throws Exception {
		BufferedImage originalImage = ImageIO.read(new File(newFileName));
		 if(extension == "jpg"||extension == "jpeg") {
			 //
			byte[] imageBytes = FileUtils.readFileToByteArray(new File(newFileName));
			BufferedInputStream bufferedIS = new BufferedInputStream(new ByteArrayInputStream(imageBytes));
			int orientation = MakeThumbnail.getOrientation(bufferedIS);
			  if(orientation == 6){ //정위치
				  originalImage = rotateImage(originalImage, 90);
	          } else if (orientation == 1){ //왼쪽으로 눞였을때
	        	 //originalImage = originalImage;
	          } else if (orientation == 3){//오른쪽으로 눞였을때
	                rotateImage(originalImage, 180);
	          } else if (orientation == 8){//180도
	                  rotateImage(originalImage, 270);      
	          } else{
	                 // bi;
	          }     
		 }
		
		int type = originalImage.getType() == 0 ? BufferedImage.TYPE_INT_ARGB : originalImage.getType();
		BufferedImage resizeImageHintJpg = resizeImageWithHint(originalImage, type);
		File thumbFolder = new File(path + "/" + year + "/" + month + "/" + day + "/" + hour + "/" + noticeNo + "/thumbs/");
		if (!thumbFolder.isDirectory()) {
			thumbFolder.mkdirs();
		}
		String thumbName = "THUMB_" + fileName + "." + extension;
		File thumbFile = new File(path + "/" + year + "/" + month + "/" + day + "/" + hour + "/" + noticeNo + "/thumbs/" + thumbName);
		ImageIO.write(resizeImageHintJpg, "jpg", thumbFile);
		return path + year + "/" + month + "/" + day + "/" + hour + "/" + noticeNo + "/thumbs/" + thumbName;
	}

	 public static BufferedImage rotateImage(BufferedImage orgImage,int radians) {
         BufferedImage newImage;
          if(radians==90 || radians==270){
                newImage = new BufferedImage(orgImage.getHeight(),orgImage.getWidth(),orgImage.getType());
         } else if (radians==180){
                newImage = new BufferedImage(orgImage.getWidth(),orgImage.getHeight(),orgImage.getType());
         } else{
                 return orgImage;
         }
         Graphics2D graphics = (Graphics2D) newImage.getGraphics();
         graphics.rotate(Math. toRadians(radians), newImage.getWidth() / 2, newImage.getHeight() / 2);
         graphics.translate((newImage.getWidth() - orgImage.getWidth()) / 2, (newImage.getHeight() - orgImage.getHeight()) / 2);
         graphics.drawImage(orgImage, 0, 0, orgImage.getWidth(), orgImage.getHeight(), null );
         
          return newImage;
  }

	private static BufferedImage resizeImageWithHint(BufferedImage originalImage, int type) {
			BufferedImage resizedImage = new BufferedImage(originalImage.getWidth(),originalImage.getHeight(),type);
			
			resizedImage = new BufferedImage(originalImage.getWidth(), originalImage.getHeight(), type);
			Graphics2D g = resizedImage.createGraphics();
			g.drawImage(originalImage, 0, 0, originalImage.getWidth(), originalImage.getHeight(), null);
			g.dispose();
			g.setComposite(AlphaComposite.Src);
			g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
			g.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
			g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
			//g.rotate(Math.toRadians(90),resizedImage.getWidth(),resizedImage.getHeight());
			return resizedImage;
	}
	
	 public static int getOrientation(BufferedInputStream is) throws IOException {
          int orientation = 1;
          try {
                Metadata metadata = ImageMetadataReader.readMetadata(is, true);
                Directory directory = metadata.getDirectory(ExifIFD0Directory.class);
                 try {
                      orientation = directory.getInt(ExifIFD0Directory. TAG_ORIENTATION);
                } catch (MetadataException me) {
                      System. out.println("Could not get orientation" );
                }
         } catch (ImageProcessingException e) {
                e.printStackTrace();
         }
          //사진 촬영 각도
          return orientation;
	 }

	public static String makeThumbnailAd(String path, String newFileName, String thumbFileName, String extension,
			String year, String month, String day, String hour, String adNo) throws Exception {

		BufferedImage originalImage = ImageIO.read(new File(newFileName));
		int type = originalImage.getType() == 0 ? BufferedImage.TYPE_INT_ARGB : originalImage.getType();
		BufferedImage resizeImageHintJpg = resizeImageWithHint(originalImage, type);
		File thumbFolder = new File(path + "/" + year + "/" + month + "/" + day + "/" + hour + "/" + adNo + "/thumbs/");
		if (!thumbFolder.isDirectory()) {
			thumbFolder.mkdirs();
		}
		String thumbName = "THUMB_" + thumbFileName + "." + extension;
		File thumbFile = new File(path + "/" + year + "/" + month + "/" + day + "/" + hour + "/" + adNo + "/thumbs/" + thumbName);
		ImageIO.write(resizeImageHintJpg, "jpg", thumbFile);
		return path + year + "/" + month + "/" + day + "/" + hour + "/" + adNo + "/thumbs/" + thumbName;

	}

	private static BufferedImage resizeImageWithHintAd(BufferedImage originalImage, int type) {

		BufferedImage resizedImage = new BufferedImage(IMG_WIDTH2, IMG_HEIGHT2, type);
		Graphics2D g = resizedImage.createGraphics();
		g.drawImage(originalImage, 0, 0, IMG_WIDTH2, IMG_HEIGHT2, null);
		g.dispose();
		g.setComposite(AlphaComposite.Src);

		g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
		g.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
		g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

		return resizedImage;
	}

	// 광고 이미지 리사이징
	public static String adImgResize(String datatype, String data, String now) throws Exception {
		String succes = "";
		byte[] imageBytes = DatatypeConverter.parseBase64Binary(data);
		String year = now.substring(0, 4);
		String month = now.substring(4, 6);
		String day = now.substring(6, 8);
		UUID uid = UUID.randomUUID();

		String srcAdImg = "http://15.164.160.236:8080/imageUpload/ad/" + year + "/" + month + "/" + day + "/Thum_";
		String path = "/usr/local/tomcat/webapps/ROOT/imageUpload/ad/" + year + "/" + month + "/" + day;

		String fileName = uid + now + "." + datatype;

		try {
			File filePath = new File(path);
			if (!filePath.exists()) { // 파일존재여부확인
				filePath.mkdirs();
			}
			BufferedImage srcImg = ImageIO.read(new ByteArrayInputStream(imageBytes));

			// 원본이미지를 높이 160px로 수정
			BufferedImage destImg = Scalr.resize(srcImg, Scalr.Method.AUTOMATIC, Scalr.Mode.FIT_TO_HEIGHT, 60);
			// 썸네일을 저장합니다. 이미지 이름 앞에 "Thum_" 표시
			String thumName = path + "/Thum_" + fileName;
			// 파일 생성
			try {
				File thumbFile = new File(thumName);
				ImageIO.write(destImg, datatype, thumbFile);
				succes = srcAdImg + fileName;
			} catch (IOException e) {
				e.printStackTrace();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return succes;
	}

	public static String makeThumnailProfile(String path, String newFileName, String thumbFileName, String extension,
			String year, String month, String day, String hour, String userNo) throws Exception {
		BufferedImage originalImage = ImageIO.read(new File(newFileName));
		int type = originalImage.getType() == 0 ? BufferedImage.TYPE_INT_ARGB : originalImage.getType();
		BufferedImage resizeImageHintJpg = resizeImageWithHintProfile(originalImage, type);
		File thumbFolder = new File(
				path + "/" + year + "/" + month + "/" + day + "/" + hour + "/userNo/" + userNo + "/");
		if (!thumbFolder.isDirectory()) {
			thumbFolder.mkdirs();
		}
		String thumbName = "profile_" + thumbFileName + "." + extension;
		File thumbFile = new File(
				path + "/" + year + "/" + month + "/" + day + "/" + hour + "/userNo/" + userNo + "/" + thumbName);
		ImageIO.write(resizeImageHintJpg, "jpg", thumbFile);
		return path + year + "/" + month + "/" + day + "/" + hour + "/userNo/" + userNo + "/" + thumbName;
	}

	private static BufferedImage resizeImageWithHintProfile(BufferedImage originalImage, int type) {
		BufferedImage resizedImage = new BufferedImage(IMG_WIDTH2, IMG_HEIGHT2, type);
		Graphics2D g = resizedImage.createGraphics();
		g.drawImage(originalImage, 0, 0, IMG_WIDTH2, IMG_HEIGHT2, null);
		g.dispose();
		g.setComposite(AlphaComposite.Src);

		g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
		g.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
		g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

		return resizedImage;
	}
}