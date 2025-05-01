import torch
from transformers import BertTokenizer, BertForSequenceClassification
import torch.nn.functional as F
from transformers import PreTrainedTokenizerFast, BartForConditionalGeneration
import requests
from bs4 import BeautifulSoup
import re

# KoBART 요약 모델
bart_tokenizer = PreTrainedTokenizerFast.from_pretrained('gogamza/kobart-base-v2')
bart_model = BartForConditionalGeneration.from_pretrained('gogamza/kobart-base-v2')

# BERT 감성 분석 모델
bert_tokenizer = BertTokenizer.from_pretrained("kykim/bert-kor-base")
bert_model = BertForSequenceClassification.from_pretrained("kykim/bert-kor-base", num_labels=2)

# 요약 함수
def summarize(text):
    text = re.sub(r'(.)\1{2,}', r'\1', text.strip())
    inputs = bart_tokenizer([text], max_length=1024, return_tensors='pt', truncation=True)
    summary_ids = bart_model.generate(
        inputs['input_ids'],
        max_length=100,
        num_beams=4,
        no_repeat_ngram_size=3,
        repetition_penalty=2.0,
        early_stopping=True
    )
    return bart_tokenizer.decode(summary_ids[0], skip_special_tokens=True)

# 감성 분석 함수
def classify_emotion(text):
    tokens = bert_tokenizer(text, padding=True, truncation=True, return_tensors="pt")
    with torch.no_grad():
        prediction = bert_model(**tokens)
    prediction = F.softmax(prediction.logits, dim=1)
    output = prediction.argmax(dim=1).item()
    labels = ["부정적", "긍정적"]
    return labels[output]

# HTML 가져오기
def fetch_html(url):
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return BeautifulSoup(response.text, "html.parser")

# 뉴스 파싱
def parse_naver(soup):
    title = soup.select_one('h2#title_area') or soup.select_one('h3#articleTitle')
    title = title.get_text(strip=True) if title else ""
    time = soup.select_one('span._ARTICLE_DATE_TIME')
    time = time.get_text(strip=True) if time else ""
    content = soup.select_one('article') or soup.select_one('#articleBodyContents')
    content = content.get_text(separator=' ', strip=True) if content else ""
    return title, time, content

def parse_daum(soup):
    title = soup.select_one('h3.tit_view')
    title = title.get_text(strip=True) if title else ""
    time = soup.select_one('span.num_date')
    time = time.get_text(strip=True) if time else ""
    content = soup.select_one('section p')
    content = content.get_text(separator=' ', strip=True) if content else ""
    return title, time, content

# 전체 실행
def run_news_summary_and_emotion():
    url = input("뉴스 기사 URL을 입력하세요: ").strip()
    try:
        soup = fetch_html(url)

        if "naver.com" in url:
            title, time, content = parse_naver(soup)
            print("[네이버 뉴스]")
        elif "daum.net" in url:
            title, time, content = parse_daum(soup)
            print("[다음 뉴스]")
        else:
            print("⚠ 현재는 네이버와 다음 뉴스만 지원합니다.")
            return

        summary = summarize(content)
        sentiment = classify_emotion(summary)

        print(f"\n제목: {title}")
        print(f"작성 시간: {time}")
        print(f"\n📄 기사 요약:\n{summary}")
        print(f"\n🧠 감성 분석 결과: {sentiment}")

    except requests.exceptions.RequestException as e:
        print("요청 오류:", e)

# 실행
run_news_summary_and_emotion()
