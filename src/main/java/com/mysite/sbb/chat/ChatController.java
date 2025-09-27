package com.mysite.sbb.chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    private static int msgId = 0;

    @MessageMapping("/broadcast")
    @SendTo("/topic/broadcast")
    public ChatMessage send(ChatMessage msg) throws Exception {
        String text = msg.text() + "!";
        return new ChatMessage(++msgId, msg.from(), msg.text());
    }

    @MessageMapping("/join-leave")
    @SendTo("/topic/join-leave")
    public ChatMessage leave(ChatMessage msg) throws Exception {
        return new ChatMessage(++msgId, "system" , msg.from() + "가 " + msg.text());
    }
}
