package com.poly.toba.util;

import java.awt.AlphaComposite;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.xml.bind.DatatypeConverter;

import org.imgscalr.Scalr;

public class MakeThumbnail {
	private static final int IMG_WIDTH = 1920;
	private static final int IMG_HEIGHT = 1080;
	private static final int IMG_WIDTH2 = 828;
	private static final int IMG_HEIGHT2 = 150;

	public static String makeThumbnail(String path, String newFileName, String fileName, String extension, String year,
			String month, String day, String hour, String noticeNo) throws Exception {
		System.out.println(newFileName);
		BufferedImage originalImage = ImageIO.read(new File(newFileName));
		int type = originalImage.getType() == 0 ? BufferedImage.TYPE_INT_ARGB : originalImage.getType();
		BufferedImage resizeImageHintJpg = resizeImageWithHint(originalImage, type);
		File thumbFolder = new File(
				path + "/" + year + "/" + month + "/" + day + "/" + hour + "/" + noticeNo + "/thumbs/");
		if (!thumbFolder.isDirectory()) {
			thumbFolder.mkdirs();
		}
		String thumbName = "THUMB_" + fileName + "." + extension;
		File thumbFile = new File(
				path + "/" + year + "/" + month + "/" + day + "/" + hour + "/" + noticeNo + "/thumbs/" + thumbName);
		ImageIO.write(resizeImageHintJpg, "jpg", thumbFile);
		return path + year + "/" + month + "/" + day + "/" + hour + "/" + noticeNo + "/thumbs/" + thumbName;

	}

	private static BufferedImage resizeImageWithHint(BufferedImage originalImage, int type) {

		BufferedImage resizedImage = new BufferedImage(IMG_WIDTH, IMG_HEIGHT, type);
		Graphics2D g = resizedImage.createGraphics();
		g.drawImage(originalImage, 0, 0, IMG_WIDTH, IMG_HEIGHT, null);
		g.dispose();
		g.setComposite(AlphaComposite.Src);

		g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
		g.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
		g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

		return resizedImage;
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
		File thumbFile = new File(
				path + "/" + year + "/" + month + "/" + day + "/" + hour + "/" + adNo + "/thumbs/" + thumbName);
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

		int width = 828;
		int height = 150;

		try {
			File filePath = new File(path);
			if (!filePath.exists()) { // 파일존재여부확인
				filePath.mkdirs();
			}
			//
			BufferedImage srcImg = ImageIO.read(new ByteArrayInputStream(imageBytes));
			// 이미지 리사이즈
			// Image.SCALE_SMOOTH : 이미지 부드러움을 우선
			Image resizeImage = srcImg.getScaledInstance(width, height, Image.SCALE_SMOOTH);
			BufferedImage resizedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
			Graphics2D graphics2D = resizedImage.createGraphics();
			graphics2D.drawImage(resizeImage, 0, 0, width, height, null);
			graphics2D.dispose();
			// 썸네일을 저장합니다. 이미지 이름 앞에 "Thum_" 표시
			String thumName = path + "/Thum_" + fileName;
			// 파일 생성
			try {
				File thumbFile = new File(thumName);
				ImageIO.write(resizedImage, datatype, thumbFile);
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