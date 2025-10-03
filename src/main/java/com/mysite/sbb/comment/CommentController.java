package com.mysite.sbb.comment;

import lombok.RequiredArgsConstructor;
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
    public CommentResponse addComment(@PathVariable String company, @RequestBody CommentRequest request) {
        CommentEntity comment = commentService.addComment(company, request.getUsername(), request.getContent());
        return CommentResponse.fromEntity(comment);
    }
}
