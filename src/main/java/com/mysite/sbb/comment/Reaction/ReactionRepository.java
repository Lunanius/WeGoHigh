package com.mysite.sbb.comment.Reaction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReactionRepository extends JpaRepository<ReactionEntity, Long> {
    Optional<ReactionEntity> findByCommentIdAndUserId(Long commentId, Long userId);
    Long countByCommentIdAndType(Long commentId, ReactionType type);
}
