package com.mysite.sbb.comment;

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
    private final FastApiRepository fastApiRepository; // 뉴스 엔티티용 Repo
    private final UserRepository userRepository; // 유저 엔티티용 Repo

    public List<CommentEntity> getCommentByCompany(String company) {
        return commentRepository.findByNews_CompanyOrderByCreatedAtDesc(company);
    }
    public CommentEntity addComment(String company, String username, String content) {
        FastApiEntity news = fastApiRepository.findTopByCompanyOrderByCreatedAtDesc(company)
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




}
