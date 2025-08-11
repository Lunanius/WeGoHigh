package com.mysite.sbb.user;

import com.nimbusds.oauth2.sdk.TokenIntrospectionSuccessResponse;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serial;
import java.io.Serializable; // 이 줄을 추가합니다.
import java.sql.Date;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
public class SiteUser implements Serializable { // <-- 여기에 implements Serializable 추가!

    // (선택 사항) 직렬화 버전을 명시하여 안정성을 높일 수 있습니다.
    // 클래스 내용이 크게 변경될 때마다 이 값을 변경해주면 좋습니다.
    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    @Column(nullable = false, unique = true)
    private String username; // 아이디

    @Column
    private String password;  // 비밀번호

    @Column(unique = true)
    private String email;

    @Column(nullable = true) // OAuth2 사용자는 이름이 Null 일 수 있으니 허용
    private String name;  //사용자 이름

    @Column(nullable = true)
    private Date birthDate; // 사용자 생일
    private String provider; // local, google 등등 OAuth2 용
    private String providerId; // OAuth2 공급자에서 주는 고유 ID (null일 수도 있음)
    @CreationTimestamp
    private Timestamp createDate;

    @Builder
    public SiteUser(String username,String name, String password, String email, String role, String provider, String providerId, Timestamp createDate) {

        this.username = username;
        this.email = email;
//        this.role = role;
        this.name = name;
        this.provider = provider;
        this.providerId = providerId;
        this.createDate = createDate;
    }


    public SiteUser() {

    }
}