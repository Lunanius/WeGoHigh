package com.mysite.sbb.comment.Reaction;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/{commentId}/reactions")
public class ReactionController {
    private final ReactionService reactionService;

    @PostMapping("/like")
    public void like(@PathVariable Long commentId, @RequestBody ReactionRequest reactionRequest) {
        reactionService.reactToComment(commentId, reactionRequest.getUsername(), ReactionType.LIKE);
    }

    @PostMapping("/dislike")
    public void dislike(@PathVariable Long commentId, @RequestBody ReactionRequest reactionRequest) {
        reactionService.reactToComment(commentId, reactionRequest.getUsername(), ReactionType.DISLIKE);
    }

    @GetMapping
    public Map<String, Long> getReactions(@PathVariable Long commentId) {
        return reactionService.getReactionCount(commentId);
    }
}
