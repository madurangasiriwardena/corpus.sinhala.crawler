package corpus.sinhala.crawler.parser;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class RawayaParser implements Parser {
	Document doc;
	String url;
	Element titleElement;
	Element p;
	String[] arr;
	
	public RawayaParser(String page, String url){
		doc = Jsoup.parse(page);
		this.url = url;
	}
	
	public String getTitle(){
		
			titleElement =  doc.select("h1").first();
		
			return titleElement.text();
	}
	
	public String getAuthor(){
		return doc.select("a[rel=author]").first().text();
	}
	
	public String getContent(){
		
		//return 
		Elements contents = titleElement.parent().select("strong");
		String content="";
		for(int i=0;i<contents.size();i++){
			if(!contents.get(i).attr("class").equals("subIN"))
			content = content + contents.get(i).text();
		}
		return content;
	}
	
	public String getUrl(){
		return url;
	}
	
	public String getYear(){
		
		return doc.select("div[class=prl-article-meta]").first().text().split(" ")[2];
	}
	
	public String getMonth(){
		String month = doc.select("div[class=prl-article-meta]").first().text().split(" ")[1];
		
		if(month.equals("Jan")){
			return "01";
		}else if(month.equals("Feb")){
			return "02";
		}else if(month.equals("Mar")){
			return "03";
		}else if(month.equals("Apr")){
			return "04";
		}else if(month.equals("May")){
			return "05";
		}else if(month.equals("Jun")){
			
			return "06";
		}else if(month.equals("Jul")){
			return "07";
			//Unicode need to be changed after july
		}else if(month.equals("Aug")){
			return "08";
		}else if(month.equals("Sep")){
			return "09";
		}else if(month.equals("Oct")){
			return "10";
		}else if(month.equals("Nov")){
			return "11";
		}else if(month.equals("Dec")){
			return "12";
		}
		return month;
	}
	
	public String getDate(){
		
		return doc.select("div[class=prl-article-meta]").first().text().split(" ")[0].split(",")[1];
	}
	
}
