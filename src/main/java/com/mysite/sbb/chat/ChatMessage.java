package com.mysite.sbb.chat;

public record ChatMessage(int id, String from, String text, String type) {
    public static ChatMessage chat(int id, String from, String text) {
        return new ChatMessage(id, from, text, "CHAT");
    }
}
