package com.mysite.sbb.fastapi;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FastApiService {

    private final FastApiRepository fastApiRepository;

    public List<FastApiEntity> getUserById(String username) {
        List<FastApiEntity> posts = fastApiRepository.findByUser_Username(username);
        if (posts.isEmpty()) {
            throw new RuntimeException("해당 유저의 게시글이 없습니다.");
        }
        return posts;
    }
}
