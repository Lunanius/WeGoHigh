package com.mysite.sbb.jwt.Oauth;

import com.mysite.sbb.jwt.Oauth.OAuth2UserInfo.GoogleUserInfo;
import com.mysite.sbb.jwt.Oauth.OAuth2UserInfo.KakaoUserInfo;
import com.mysite.sbb.jwt.Oauth.OAuth2UserInfo.NaverUserInfo;
import com.mysite.sbb.jwt.Oauth.OAuth2UserInfo.OAuth2UserInfo;
import com.mysite.sbb.user.SiteUser;
import com.mysite.sbb.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Objects;


@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//        System.out.println("userRequset: " + userRequest.getClientRegistration());

        //구글로그인 버튼 클릭 -> 구글로그인창 -> 로그인을 완료 -> code를리턴 -> AcessToken 요청
        // userRequest 정보 -> 회원프로필 받아야함(loadUser 함수) 호출 -> 회원 프로필을 받아준다.
        OAuth2User oAuth2User = super.loadUser(userRequest);
//        System.out.println("attributes: " + oAuth2User.getAttributes());
        OAuth2UserInfo oAuth2UserInfo = null;
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        if ("google".equals(registrationId)) {
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        } else if ("naver".equals(registrationId)) {
            oAuth2UserInfo = new NaverUserInfo(oAuth2User.getAttributes());
        } else if ("kakao".equals(registrationId)) {
            oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
        }
        String provider = Objects.requireNonNull(oAuth2UserInfo).getProvider(); // "google"
        String providerId = oAuth2UserInfo.getProviderId(); // "sub" 값
        String email = oAuth2UserInfo.getEmail();
        String username = email;
        String name = oAuth2UserInfo.getName();
        String role = "ROLE_USER";




        SiteUser userEntity = userRepository.findByUsername(username);

        if (userEntity == null) {
            SiteUser existingEmailUser = userRepository.findByEmail(email);

            if (existingEmailUser != null) {
                // 이메일 중복 발견 시 기존 사용자 반환 처리 (또는 예외 처리 가능)
                OAuth2Error error = new OAuth2Error("email_exists", "이미 등록된 이메일입니다.", null);
                throw new OAuth2AuthenticationException(error, error.toString());
            } else {
                userEntity = SiteUser.builder()
                        .username(username)
                        .email(email)
                        .role(role)
                        .name(name)
                        .provider(provider)
                        .providerId(providerId)
                        .build();
                userRepository.save(userEntity);
            }
        } else {
            System.out.println("기존 로그인으로 연결합니다");
        }

        return new PrincipalDetails(userEntity, oAuth2User.getAttributes());
        /*
        일반적으로 로그인하면 user만 들고 있고 OAuth는 Attribute도 같이 들고 있다.
         */
    }
}
