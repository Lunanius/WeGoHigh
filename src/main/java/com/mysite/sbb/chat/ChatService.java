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
