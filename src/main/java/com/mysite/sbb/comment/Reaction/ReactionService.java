package com.mysite.sbb.comment.Reaction;

import com.mysite.sbb.comment.CommentEntity;
import com.mysite.sbb.comment.CommentRepository;
import com.mysite.sbb.user.SiteUser;
import com.mysite.sbb.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReactionService {
    private final ReactionRepository reactionRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    public void reactToComment(Long commentId, String username, ReactionType type) {
        CommentEntity comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글이 존재하지 않습니다."));
        SiteUser user = userRepository.findByUsername(username);
        if(user == null) {
            throw new IllegalArgumentException("사용자가 존재하지 않습니다");
        }


        // 기존 반응이 있는지 체크
        Optional<ReactionEntity> existing = reactionRepository.findByCommentIdAndUserId(commentId, user.getId());

        if (existing.isPresent()) {
            ReactionEntity reaction = existing.get();
            if (reaction.getType() == type) {
                // 같은 반응 → 취소 (삭제)
                reactionRepository.delete(reaction);
            } else {
                // 다른 반응 → 수정
                reaction.setType(type);
                reactionRepository.save(reaction);
            }
        } else {
            // 새 반응 추가
            ReactionEntity reaction = new ReactionEntity();
            reaction.setComment(comment);
            reaction.setUser(user);
            reaction.setType(type);
            reactionRepository.save(reaction);
        }
    }

    public Map<String, Long> getReactionCount(Long commentId) {
        long likes = reactionRepository.countByCommentIdAndType(commentId, ReactionType.LIKE);
        long dislikes = reactionRepository.countByCommentIdAndType(commentId, ReactionType.DISLIKE);
        return Map.of("likes", likes, "dislikes", dislikes);
    }
}
