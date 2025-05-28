package com.mysite.sbb.fastapi;

import com.mysite.sbb.Dto.CompanyRankDto;
import com.mysite.sbb.Dto.FastApiDTO;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api")
public class NewsController {

    private final FastApiService fastApiService;

    public NewsController(FastApiService fastApiService) {
        this.fastApiService = fastApiService;
    }

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

    @GetMapping("/ranking")
    public ResponseEntity<List<CompanyRankDto>> getCompanyRanking(@RequestParam("period") String period) {
        List<CompanyRankDto> result;
        switch (period) {
            case "daily":
                result = fastApiService.getDailyRanking();
                break;
            case "weekly":
                result = fastApiService.getWeeklyRanking();
                break;
            case "monthly":
                result = fastApiService.getMonthlyRanking();
                break;
            default:
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid period");
        }
        return ResponseEntity.ok(result);
    }


}