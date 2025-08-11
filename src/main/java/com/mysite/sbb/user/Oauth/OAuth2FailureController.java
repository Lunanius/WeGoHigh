//package com.mysite.sbb.user.Oauth;
//
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.io.IOException;
//
//@RestController
//public class OAuth2FailureController {
//    @GetMapping("/oauth2/loginFailure")
//    public void loginFailure(HttpServletResponse response) throws IOException {
//        // React 로그인 페이지로 쿼리 파라미터 error=email_exists 붙여서 리다이렉트
//        response.sendRedirect("http://localhost:3000/login?error=email_exists");
//    }
//}
