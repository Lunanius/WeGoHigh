package com.mysite.sbb.user.Oauth;

import com.mysite.sbb.user.SiteUser;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        // 인증된 Principal 객체를 가져옵니다.
        // PrincipalOauth2UserService에서 반환한 PrincipalDetails 객체
        Object principal = authentication.getPrincipal();
        PrincipalDetails principalDetails = (PrincipalDetails) principal;
        SiteUser siteUser = principalDetails.getSiteUser();
        // HttpSession에 "loginUser"라는 이름으로 SiteUser 객체를 저장합니다.
        // 이렇게 하면 일반 로그인과 동일하게 React의 /api/session-user에서 접근 가능.
        HttpSession session = request.getSession();
        session.setAttribute("loginUser", siteUser);
        System.out.println("OAuth2 로그인 성공: " + siteUser.getUsername());

        // 로그인 성공 후 React 앱의 홈 페이지로 리다이렉션합니다.
        // 이 리다이렉션을 통해 React 앱이 세션 쿠키를 받고 로그인 상태를 확인하게 됩니다.
        response.sendRedirect("http://localhost:3000/");
    }

}
