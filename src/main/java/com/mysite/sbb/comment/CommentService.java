package com.mysite.sbb.comment;

import com.mysite.sbb.comment.Reaction.ReactionRepository;
import com.mysite.sbb.fastapi.FastApiEntity;
import com.mysite.sbb.fastapi.FastApiRepository;
import com.mysite.sbb.user.SiteUser;
import com.mysite.sbb.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final ReactionRepository reactionRepository;
    private final FastApiRepository fastApiRepository; // 뉴스 엔티티용 Repo
    private final UserRepository userRepository; // 유저 엔티티용 Repo

    public List<CommentEntity> getCommentByCompany(String company) {
        return commentRepository.findByNews_CompanyOrderByCreatedAtDesc(company);
    }
    public CommentEntity addComment(String company, String username, String content) {
        FastApiEntity news = fastApiRepository.findTopByCompanyOrderByCreatedAt(company)
                .orElseThrow(() -> new IllegalArgumentException("관련 회사가 존재하지 않습니다."));

        SiteUser user = userRepository.findByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("사용자가 존재하지 않습니다.");
        }

        CommentEntity comment = new CommentEntity();
        comment.setNews(news);
        comment.setUser(user);
        comment.setContent(content);

        return commentRepository.save(comment);
    }
    public void deleteComment(Long commentId, String username) {
        CommentEntity comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글이 존재하지 않습니다."));

        // 작성자만 삭제 가능
        if (!comment.getUser().getUsername().equals(username)) {
            throw new RuntimeException("댓글 작성자만 삭제할 수 있습니다.");
        }

        commentRepository.delete(comment);
    }




}
