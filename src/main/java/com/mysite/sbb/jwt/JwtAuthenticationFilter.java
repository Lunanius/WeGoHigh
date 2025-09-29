package com.mysite.sbb.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysite.sbb.jwt.Oauth.PrincipalDetails;
import com.mysite.sbb.user.SiteUser;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        try{
            ObjectMapper objectMapper = new ObjectMapper();
            SiteUser user = objectMapper.readValue(request.getInputStream(), SiteUser.class);


            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
            Authentication authentication = authenticationManager.authenticate(token);
            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
            System.out.println(principalDetails.getSiteUser().getUsername());
            return authentication;



        }  catch (IOException e) {
            System.err.println("인증 실패: 유효하지 않은 요청 본문입니다." + e.getMessage());
            throw new AuthenticationException("유효하지 않은 요청 본문입니다.") {};
        }


    }
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        System.out.println("인증이 완료가 되었습니다.");
        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
        String jwtToken = jwtTokenProvider.createToken(principalDetails.getSiteUser().getUsername());
        response.addHeader("Authorization", "Bearer " + jwtToken);
    }

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        setAuthenticationManager(authenticationManager);
        setFilterProcessesUrl("/api/login");  // 로그인 URL 변경
    }
}
