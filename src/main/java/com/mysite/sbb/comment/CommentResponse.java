package com.mysite.sbb.comment;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Setter @Getter
public class CommentResponse {
    private Long id;
    private String content;
    private String username;
    private LocalDateTime createdAt;

    public static CommentResponse fromEntity(CommentEntity comment) {
        CommentResponse dto = new CommentResponse();
        dto.setId(comment.getId());
        dto.setContent(comment.getContent());
        dto.setUsername(comment.getUser().getUsername());
        dto.setCreatedAt(comment.getCreatedAt());
        return dto;
    }
}
