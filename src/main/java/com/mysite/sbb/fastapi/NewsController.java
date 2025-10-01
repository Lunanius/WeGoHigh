package com.mysite.sbb.fastapi;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class NewsController {


    private final FastApiService fastApiService;

    @PostMapping("/parse-news")
    public FastApiResponse fetchNewsFromFastAPI(@RequestBody FastApiDTO body) {
        return fastApiService.fetchAndSaveNews(body);
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

    @GetMapping("/posts")
    public ResponseEntity<Page<FastApiEntity>> getPosts(
            @RequestParam("username") String username,
            @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<FastApiEntity> posts = fastApiService.getUserById(username, pageable);
        return ResponseEntity.ok(posts);
    }





}