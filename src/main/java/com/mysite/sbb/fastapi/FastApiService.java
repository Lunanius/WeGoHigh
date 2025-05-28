package com.mysite.sbb.fastapi;

import com.mysite.sbb.Dto.CompanyRankDto;
import com.mysite.sbb.util.PostNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FastApiService {


    private final FastApiRepository fastApiRepository;

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


}
