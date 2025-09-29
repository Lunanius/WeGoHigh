package com.mysite.sbb.jwt.Oauth;

import com.mysite.sbb.jwt.JwtTokenProvider;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {
    private final JwtTokenProvider jwtTokenProvider;

    public OAuth2LoginSuccessHandler(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
//        SiteUser siteUser = principalDetails.getSiteUser();

        // JWT 토큰 생성 (예: 사용자 ID 기준)
        String token = jwtTokenProvider.createToken(principalDetails.getUsername());


        // 필요하면 세션에 저장도 가능 (기존 코드 유지)
//        HttpSession session = request.getSession();
//        session.setAttribute("loginUser", siteUser);

        System.out.println("OAuth2 로그인 성공: " + principalDetails.getUsername());

        String redirectUrl = "http://localhost:3000/oauth2/redirect?token=" + token;
        response.sendRedirect(redirectUrl);
    }

}
