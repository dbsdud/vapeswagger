package com.poly.toba.model;

public class RecomPagingDTO {
	private int totalcount;//전체 게시물 개수
	private int pagenum;//현재 페이지 번호
	private int contentnum=5;//한 페이지에 몇개 표시
	private int startPage=1;//현재페이지블록의 시작페이지
	private int endPage=10;//현재페이지블록의 마지막 페이지
	private boolean prev=false;//이전페이지로 가는 화살표
	private boolean next;//다음페이지로 가는화살표
	private int currentblock;//현재페이지블록
	private int lastblock;//마지막페이지블록
	
//	 //검색하기 위한 변수
	 private String searchWord;
	 private String searchCategory;
//	 
//	 //1대1문의 검색 변수
//	 private String classfication;
//	 
	 
	 
	
	public void prevnext(int pagenum) {
		if(pagenum>0 && pagenum<11) {
			setPrev(false);
			setNext(true);
			
		}else if(getLastblock() == getCurrentblock()) {
			setPrev(true);
			setNext(false);
		}else {
			setPrev(true);
			setNext(true);
		}
	}
	
	public String getSearchWord() {
		return searchWord;
	}

	public void setSearchWord(String searchWord) {
		this.searchWord = searchWord;
	}

	public String getSearchCategory() {
		return searchCategory;
	}

	public void setSearchCategory(String searchCategory) {
		this.searchCategory = searchCategory;
	}

	public int calcpage(int totalcount,int contentnum) {// 전체 페이지 수를 계산하는 함수
		//125/10 = > 12.5
		//13페이지
		int totalpage = totalcount/ contentnum;
		if(totalcount%contentnum>0) {
			totalpage++;
		}
		return totalpage;
	}
	
	
	public int getTotalcount() {
		return totalcount;
	}
	public void setTotalcount(int totalcount) {
		this.totalcount = totalcount;
	}
	public int getPagenum() {
		return pagenum;
	}
	public void setPagenum(int pagenum) {
		this.pagenum = pagenum;
	}
	public int getContentnum() {
		return contentnum;
	}
	public void setContentnum(int contentnum) {
		this.contentnum = contentnum;
	}
	public int getStartPage() {
		return startPage;
	}
	//시작페이지 수정 블록을 가지고  한페이지 블록마다 페이지 10개 씩 보이게
	public void setStartPage(int currentblock ) {
			this.startPage = (currentblock*10)-9;
			// 1//1 2 3 4 5 6 7 8 9 10
			// 2//11 12 13 14 15 16 17 18 19 20
	}
	public int getEndPage() {
		return endPage;
	}
	public void setEndPage(int getlastblock,int getcurrentblock) {
		if(getlastblock == getcurrentblock) {
			this.endPage = calcpage(getTotalcount(),getContentnum());
		}else {
			this.endPage = getStartPage()+9;
		}
		
	}
	public boolean isPrev() {
		return prev;
	}
	public void setPrev(boolean prev) {
		this.prev = prev;
	}
	public boolean isNext() {
		return next;
	}
	public void setNext(boolean next) {
		this.next = next;
	}
	public int getCurrentblock() {
		return currentblock;
	}
	//현재페이지블록 수정
	public void setCurrentblock(int pagenum) {
		//페이지 번호를 통해서 구한다
		//페이지 번호 / 페이지 그룹안의 페이지 개수
		//1p 1/5 => 0.2  0 +1  1=>페이지 블로1
		this.currentblock = pagenum/10;
		if(pagenum%10>0) {
			this.currentblock++;
		}
	}
	public int getLastblock() {
		return lastblock;
	}
	public void setLastblock(int totalcount) {
		//10개씩 게시물 가져오고 한페이지블록당 10개 씩=> 10 *10  100개의 게시물
		//125 / 50
		this.lastblock = totalcount / (10*this.contentnum);
		if(totalcount%(20*this.contentnum)>0) {
			this.lastblock++;
		}
	}

}
