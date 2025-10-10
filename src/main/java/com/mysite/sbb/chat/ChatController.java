package com.mysite.sbb.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/broadcast")
    public void send(ChatMessage msg) {
        // 모든 사용자에게 브로드캐스트
        ChatMessage savedMsg = chatService.saveAndReturnChatMessage(msg.from(), msg.text(), "CHAT");
        simpMessagingTemplate.convertAndSend("/topic/broadcast", msg);
    }

    // 입장 이벤트 -> 최근 30개 메시지 전송
    @MessageMapping("/join")
    public void join(String username) {
        List<ChatMessage> recentMessages = chatService.getRecentMessages();

        // 모든 사용자에게 브로드캐스트
        for (ChatMessage msg : recentMessages) {
            simpMessagingTemplate.convertAndSend("/topic/broadcast", msg);
        }
    }

    @MessageMapping("/join-leave")
    public void leave(ChatMessage msg) {
        simpMessagingTemplate.convertAndSend("/topic/join-leave", msg);
    }

    @MessageMapping("/tag")
    public void handleTag(Map<String, String> chart) {
        String username = chart.get("username");
        ChatMessage msg = chatService.tagPrediction(chart, username);

        // 1. 모든 사용자에게 브로드캐스트
        simpMessagingTemplate.convertAndSend("/topic/broadcast", msg);

        // 2. 입력한 사용자에게 개인 피드백 (툴팁 등)
        if(username != null) {
            simpMessagingTemplate.convertAndSendToUser(username, "/topic/tag-response", msg);
        }
    }
}
