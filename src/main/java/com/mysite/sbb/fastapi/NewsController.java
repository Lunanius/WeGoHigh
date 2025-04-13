package com.mysite.sbb.fastapi;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class NewsController {

    @PostMapping("/parse-news")
    public FastApiResponse fetchNewsFromFastAPI(@RequestBody Map<String, String> body) {
        String newsUrl = body.get("url");
        String fastapiUrl = "http://localhost:8000/parse-news"; // FastAPI 서버 주소

        // 요청 바디 구성
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String jsonBody = String.format("{\"url\": \"%s\"}", newsUrl);
        HttpEntity<String> request = new HttpEntity<>(jsonBody, headers);

        // FastAPI에 POST 요청 보내기
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<FastApiResponse> response = restTemplate.postForEntity(fastapiUrl, request, FastApiResponse.class);

        return response.getBody();
    }
}