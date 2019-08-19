package com.poly.toba.util;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringUtil {
	public static List<String> getImgSrc(String str) {
		Pattern nonValidPattern = Pattern.compile("<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>");
		List<String> result = new ArrayList<>();
		Matcher matcher = nonValidPattern.matcher(str);
		while (matcher.find()) {
			result.add(matcher.group(1));
		}
		return result;
	}

	public static String getImgSrcReplace(String str, List<String> oldSrc, List<String> newSrc) {
		for (int i = 0; i < oldSrc.size(); i++) {
			String oldSrcString = oldSrc.get(i).toString();
			if (str.contains(oldSrcString)) {
				str = str.replace(oldSrcString, newSrc.get(i));
			}
		}
		return str;
	}
}
