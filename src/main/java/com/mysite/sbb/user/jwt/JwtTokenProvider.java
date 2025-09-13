package com.mysite.sbb.user.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Component;

import java.util.Date;

import static com.mysite.sbb.user.jwt.JwtConstants.SECRET_KEY;

@Component
public class JwtTokenProvider {

    private static final long EXPIRATION_TIME = 3600000; // 1시간 (밀리초)

    // JWT 토큰 생성
    public String createToken(String username) {
        return JWT.create()
                .withSubject(username)
                .withClaim("username", username)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(SECRET_KEY));
    }
}