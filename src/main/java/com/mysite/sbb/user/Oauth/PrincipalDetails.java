package com.mysite.sbb.user.Oauth;

import com.mysite.sbb.user.SiteUser;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.io.Serial;
import java.util.Collection;
import java.util.List;
import java.util.Map;

public class PrincipalDetails implements UserDetails, OAuth2User {

    @Serial
    private static final long serialVersionUID = 1L;

    @Getter
    private final SiteUser siteUser;
    private Map<String, Object> attributes;

    public PrincipalDetails(SiteUser siteUser) { this.siteUser = siteUser; }

    public PrincipalDetails(SiteUser siteUser, Map<String, Object> attributes) {
        this.siteUser = siteUser;
        this.attributes = attributes;
    }

    @Override
    public String getName() {
        return siteUser.getName();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return siteUser.getPassword();
    }

    @Override
    public String getUsername() {
        return siteUser.getUsername();
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }
}
