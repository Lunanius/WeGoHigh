package com.mysite.sbb.config;


import com.mysite.sbb.jwt.Oauth.OAuth2LoginSuccessHandler;
import com.mysite.sbb.jwt.Oauth.PrincipalOauth2UserService;
import com.mysite.sbb.jwt.JwtAuthenticationFilter;
import com.mysite.sbb.jwt.JwtAuthorizationFilter;
import com.mysite.sbb.jwt.JwtTokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity

public class SecurityConfig {
    private final PrincipalOauth2UserService principalOauth2UserService;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
//    private final UserRepository userRepository;
    private final AuthenticationConfiguration authenticationConfiguration;
    private final UserDetailsService userDetailsService;
    private final JwtTokenProvider jwtTokenProvider;

    public SecurityConfig(UserDetailsService userDetailsService, /*UserRepository  userRepository,*/ PrincipalOauth2UserService principalOauth2UserService,
                          OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler, AuthenticationConfiguration authenticationConfiguration,
                          JwtTokenProvider jwtTokenProvider) {
        this.principalOauth2UserService = principalOauth2UserService;
        this.oAuth2LoginSuccessHandler = oAuth2LoginSuccessHandler;
        this.jwtTokenProvider = jwtTokenProvider;
        /*this.userRepository = userRepository;*/
        this.userDetailsService = userDetailsService;
        this.authenticationConfiguration = authenticationConfiguration;
    }
    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }


    @Bean
    SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authenticationManager, CorsConfigurationSource corsConfigurationSource) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable) // CSRF 비활성화
                .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션 사용 안함 -> JWT+OAuth2로 하기 때문
//                .authorizeHttpRequests(auth -> auth.requestMatchers(
//                        new AntPathRequestMatcher("/api/signup"),
//                        new AntPathRequestMatcher("/api/oauth2/**"),
//                        new AntPathRequestMatcher("/api/login")
//                ).permitAll().anyRequest().authenticated())
                .cors(cors -> cors.configurationSource((CorsConfigurationSource) corsConfigurationSource()))

                .addFilterAt(new JwtAuthenticationFilter(authenticationManager, jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new JwtAuthorizationFilter(authenticationManager, userDetailsService), UsernamePasswordAuthenticationFilter.class)
                .oauth2Login(oauth2 -> oauth2
                        .failureHandler((request, response, exception) -> {
                            String errorMessage = exception.getMessage();
                            String redirectUrl = "http://localhost:3000/login?error=oauth_fail"; // 기본 실패 리다이렉트
                            if (errorMessage != null && errorMessage.contains("email_exists")) {
                                redirectUrl = "http://localhost:3000/login?error=email_exists";
                            }
                            response.sendRedirect(redirectUrl);
                        })
                        .userInfoEndpoint(userInfo -> userInfo
                                .userService(principalOauth2UserService)
                        )
                        .successHandler(oAuth2LoginSuccessHandler) // ✅ OAuth2 로그인 성공 시 커스텀 핸들러 사용
                );

                ;

        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");  // 로컬 React
//        config.addAllowedOrigin("http://localhost");        // Docker React
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        // Authorization 헤더를 클라이언트가 접근할 수 있도록 노출
        config.setExposedHeaders(List.of("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}