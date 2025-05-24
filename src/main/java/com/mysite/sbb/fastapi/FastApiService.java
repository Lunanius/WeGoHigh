package com.mysite.sbb.fastapi;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FastApiService {

    private final FastApiRepository fastApiRepository;

    public Page<FastApiEntity> getUserById(String username, Pageable pageable) {
        Page<FastApiEntity> posts = fastApiRepository.findByUser_Username(username, pageable);
        if (posts.isEmpty()) {
            throw new RuntimeException("해당 유저의 게시글이 없습니다.");
        }
        return posts;
    }
}
