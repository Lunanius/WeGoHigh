package com.mysite.sbb.chat;

import com.mysite.sbb.chat.ChatSave.ChatMessageEntity;
import com.mysite.sbb.chat.ChatSave.ChatMessageRepository;
import com.mysite.sbb.fastapi.FastApiEntity;
import com.mysite.sbb.fastapi.FastApiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final FastApiRepository fastApiRepository;
    private final ChatMessageRepository chatMessageRepository;
    private static int msgId = 0;

    public ChatMessage tagPrediction(Map<String,String> chart, String username) {
        String companyName = chart.get("company");
        String prediction = fastApiRepository.findTopByCompanyOrderByCreatedAt(companyName)
                .map(FastApiEntity::getPrediction)
                .orElse("정보 없음");

        String text = "@" + companyName + " - [" + prediction + "]";

        // DB에 저장
        return saveAndReturnChatMessage(username, text, "TAG");
    }
    public List<String> searchCompany(@RequestParam String q) {
        return fastApiRepository.findByCompanyContainingIgnoreCase(q)
                .stream()
                .map(FastApiEntity::getCompany)
                .distinct()
                .limit(10)
                .toList();
    }
    public ChatMessage saveAndReturnChatMessage(String from, String text, String type) {
        ChatMessageEntity entity = new ChatMessageEntity();
        entity.setFromUser(from);
        entity.setText(text);
        entity.setType(type);
        chatMessageRepository.save(entity);

        return new ChatMessage(++msgId, from, text, type);
    }

    public List<ChatMessage> getRecentMessages() {
        List<ChatMessage> recent = new ArrayList<>(chatMessageRepository.findTop30ByOrderByIdDesc()
                .stream()
                .map(e -> new ChatMessage(e.getId().intValue(), e.getFromUser(), e.getText(), e.getType()))
                .toList());
        Collections.reverse(recent); // 오래된 메시지부터 보여주기
        return recent;
    }

}
