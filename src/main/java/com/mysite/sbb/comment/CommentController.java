package com.mysite.sbb.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/{company}/comments")
public class CommentController {
    private final CommentService commentService;

    @GetMapping
    public List<CommentResponse> getComments(@PathVariable String company) {
        return commentService.getCommentByCompany(company).stream()
                .map(CommentResponse::fromEntity)
                .toList();
    }
    @PostMapping
    public CommentResponse addComment(
            @PathVariable String company,
            @RequestBody CommentRequest request,
            Authentication auth) {  // Spring Security Authentication 사용
        String username = auth.getName(); // JWT에서 추출
        CommentEntity comment = commentService.addComment(company, username, request.getContent());
        return CommentResponse.fromEntity(comment);
    }
    @DeleteMapping("/{commentId}")
    public void deleteComment(@PathVariable Long commentId, Authentication auth) {
        String username = auth.getName();
        commentService.deleteComment(commentId, username);
    }
}
