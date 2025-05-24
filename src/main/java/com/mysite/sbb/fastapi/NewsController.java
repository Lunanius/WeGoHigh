package com.mysite.sbb.fastapi;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysite.sbb.user.SiteUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class NewsController {


    @PostMapping("/parse-news")
    public FastApiResponse fetchNewsFromFastAPI(@RequestBody FastApiDTO body) {
        String newsUrl = body.getUrl();
        String id = body.getId();
        String fastapiUrl = "http://localhost:8000/parse-news"; // FastAPI 서버 주소

        // 요청 바디 구성
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String jsonBody = String.format("{\"url\": \"%s\", \"id\": %s}",
                newsUrl,
                id == null ? "null" : "\"" + id + "\"");
        HttpEntity<String> request = new HttpEntity<>(jsonBody, headers);

        // FastAPI에 POST 요청 보내기
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<FastApiResponse> response = restTemplate.postForEntity(fastapiUrl, request, FastApiResponse.class);

        return response.getBody();
    }

}