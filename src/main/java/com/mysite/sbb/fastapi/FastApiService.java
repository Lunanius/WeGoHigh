package com.mysite.sbb.fastapi;

import com.mysite.sbb.user.SiteUser;
import com.mysite.sbb.user.UserRepository;
import com.mysite.sbb.user.UserService;
import com.mysite.sbb.util.PostNotFoundException;
import jakarta.persistence.LockModeType;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.Lock;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.UnexpectedRollbackException;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FastApiService {


    private final FastApiRepository fastApiRepository;
    private final UserService userService;
    private final RestTemplate restTemplate;
    // 자기 자신을 주입받아 프록시를 통해 saveEntity를 호출
    private final FastApiService self;
    private final UserRepository userRepository;

    public FastApiService(FastApiRepository fastApiRepository, UserService userService, RestTemplate restTemplate, @Lazy FastApiService self, UserRepository userRepository) {
        this.fastApiRepository = fastApiRepository;
        this.userService = userService;
        this.restTemplate = restTemplate;
        this.self = self;
        this.userRepository = userRepository;
    }


    public Page<FastApiEntity> getUserById(String username, Pageable pageable) {

        Page<FastApiEntity> posts = fastApiRepository.findByUser_Username(username, pageable);
        if (posts.isEmpty()) {
            throw new PostNotFoundException("해당 유저의 게시글이 없습니다.");
        }
        return posts;
    }



    LocalDate today = LocalDate.now();
    LocalDateTime startOfToday = today.atStartOfDay();
    LocalDateTime startOfTomorrow = today.plusDays(1).atStartOfDay();

    public List<CompanyRankDto> getDailyRanking() {
        return convertResult(fastApiRepository.getDailyCompanyRanking(startOfToday, startOfTomorrow));
    }
    public List<CompanyRankDto> getWeeklyRanking() {
        LocalDateTime weekAgo = LocalDateTime.now().minusDays(7);
        return convertResult(fastApiRepository.getWeeklyCompanyRanking(weekAgo));
    }
    public List<CompanyRankDto> getMonthlyRanking() {
        LocalDateTime monthAgo = LocalDateTime.now().minusDays(30);
        return convertResult(fastApiRepository.getMonthlyCompanyRanking(monthAgo));
    }

    private List<CompanyRankDto> convertResult(List<Object[]> results) {
        List<CompanyRankDto> rankList = results.stream()
                .map(obj -> new CompanyRankDto((String) obj[0], (Long) obj[1]))
                .collect(Collectors.toList());

        // 👇 10개가 안 되면 "—"로 채움
        while (rankList.size() < 10) {
            rankList.add(new CompanyRankDto("—", 0L));
        }

        return rankList;
    }

    @Transactional(noRollbackFor = DataIntegrityViolationException.class)
    public FastApiResponse fetchAndSaveNews(FastApiDTO body) {


        SiteUser user = new SiteUser();
        if (body.getId() != null) {
            user = userService.findByUsername(body.getId());
        } else {
            // 비회원용 guest 계정 가져오기 또는 생성
            user = userRepository.findByUsername("guest");
            if(user == null){
                SiteUser g = new SiteUser();
                g.setUsername("guest");
                g.setPassword("");
                userRepository.save(g);
            }
        }
        FastApiResponse apiResponse;

        FastApiEntity findEntity = fastApiRepository.findFirstByUrl(body.getUrl());

        if (findEntity != null) {
            apiResponse = findEntity.toResponse();
            // user별 insert 여부만 확인
            if (fastApiRepository.existsByUserAndUrl(user, body.getUrl()) || body.getId() == null) {
                return apiResponse;
            }
        } else {
            // FastAPI 호출
            String fastApiUrl = "http://localhost:8000/ai/parse-news";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            String jsonBody = String.format("{\"url\": \"%s\", \"id\": \"%s\"}", body.getUrl(), body.getId());
            HttpEntity<String> httpRequest = new HttpEntity<>(jsonBody, headers);
            ResponseEntity<FastApiResponse> response = restTemplate.postForEntity(fastApiUrl, httpRequest, FastApiResponse.class);
            apiResponse = response.getBody();

            if(apiResponse == null) {
                throw new RuntimeException("FastAPI 응답이 없습니다.");
            }
        }
        // insert 전에 다시 체크

        if (body.getId() != null && !fastApiRepository.existsByUserAndUrl(user, body.getUrl())) {
            try {
                self.saveEntity(user, apiResponse);
            } catch (UnexpectedRollbackException e) {
                System.err.println("경고: 중복된 뉴스 기사(사용자-URL)가 발견되어 저장을 건너뜁니다.");
            }
        }

        return apiResponse;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void saveEntity(SiteUser user, FastApiResponse apiResponse) {
        FastApiEntity entity = FastApiEntity.builder()
                .user(user)
                .title(apiResponse.getTitle())
                .content(apiResponse.getContent())
                .url(apiResponse.getUrl())
                .thumbnailUrl(apiResponse.getThumbnail_url())
                .newsTime(apiResponse.getTime())
                .company(apiResponse.getCompany())
                .summary(apiResponse.getSummary())
                .prediction(apiResponse.getPrediction())
                .keywords(apiResponse.getKeyword())
                .sentiment(apiResponse.getSentiment())
                .prob(apiResponse.getProb())
                .build();

        try {
            fastApiRepository.saveAndFlush(entity);
            limitUserNewsRecords(user);
        } catch (DataIntegrityViolationException e) {
            System.err.println("경고: 중복된 뉴스 기사(사용자-URL)가 발견되어 저장을 건너뜁니다.");
        }

    }

    @Transactional
    public void limitUserNewsRecords(SiteUser user) {
        long total = fastApiRepository.countByUser(user);

        int MAXRECODE = 30;
        if(total > MAXRECODE) {
            int toDelete = (int)(total - MAXRECODE);

            // 오래된 뉴스 30개 초과 개수만큼 조회
            Pageable pageable = PageRequest.of(0, toDelete);
            List<FastApiEntity> oldest = fastApiRepository.findByUserOrderByCreatedAtAsc(user, pageable);

            if(!oldest.isEmpty()) {
                List<Long> idsToDelete = oldest.stream()
                        .map(FastApiEntity::getId)
                        .collect(Collectors.toList());
                fastApiRepository.deleteByIdIn(idsToDelete);
            }
        }
    }

    public Page<FastApiEntity> getCompanyRecords(String company, Pageable pageable) {
        return fastApiRepository.findLatestUniqueUrlByCompany(company, pageable);
    }
}