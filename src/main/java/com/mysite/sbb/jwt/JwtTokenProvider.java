package com.mysite.sbb.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.mysite.sbb.user.Role.Role;
import com.mysite.sbb.user.SiteUser;
import com.mysite.sbb.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;
import java.util.Optional;
import java.util.Set;

import static com.mysite.sbb.jwt.JwtConstants.SECRET_KEY;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private static final long EXPIRATION_TIME = 3600000; // 1시간 (밀리초)
    private final UserRepository userRepository;


    // JWT 토큰 생성
    public String createToken(String username) {

        SiteUser siteUser = userRepository.findByUsername(username);
        Set<Role> roles = siteUser.getRoles();
        // roles를 문자열 배열로 변환
        String[] roleNames = roles.stream()
                .map(Role::getRoleName)
                .toArray(String[]::new);

        return JWT.create()
                .withSubject(username)
                .withClaim("username", username)
                .withArrayClaim("roles", roleNames)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(SECRET_KEY));
    }
}