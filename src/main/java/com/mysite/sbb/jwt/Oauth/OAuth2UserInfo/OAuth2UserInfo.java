package com.mysite.sbb.jwt.Oauth.OAuth2UserInfo;

import com.mysite.sbb.user.SiteUser;

public interface OAuth2UserInfo {
    String getProviderId();
    String getProvider();
    String getEmail();
    String getName();

}
