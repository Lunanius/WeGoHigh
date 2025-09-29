package com.mysite.sbb.chat;

import com.mysite.sbb.fastapi.FastApiEntity;
import com.mysite.sbb.fastapi.FastApiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final FastApiRepository fastApiRepository;
    private static int msgId = 0;

    public List<String> extractTags(String message) {
        // @뒤에 오는 한글, 숫자, 영어 조합 추출
        Pattern pattern = Pattern.compile("@[가-힣a-zA-Z0-9]+");
        Matcher matcher = pattern.matcher(message);

        List<String> tags = new ArrayList<>();
        while (matcher.find()) {
            tags.add(matcher.group().substring(1)); // '@' 제거
        }
        return tags;
    }

    public ChatMessage tagPrediction(Map<String,String> chart, String username) {
        String companyName = chart.get("company");
        String prediction = fastApiRepository.findTopByCompanyOrderByCreatedAt(companyName)
                .map(FastApiEntity::getPrediction)
                .orElse("정보 없음");
        return new ChatMessage(++msgId, username, "@" + companyName + " - [" + prediction + "]", "TAG");
    }
    public List<String> searchCompany(@RequestParam String q) {
        return fastApiRepository.findByCompanyContainingIgnoreCase(q)
                .stream()
                .map(FastApiEntity::getCompany)
                .distinct()
                .limit(10)
                .toList();
    }
}
