package com.mysite.sbb.user;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.sql.Date;

@Getter
@Setter
@Entity
public class SiteUser implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @Column(nullable = false, unique = true)
    private String username; // 아이디

    @Column(unique = true)
    private String password;  // 비밀번호

    @Column(unique = true)
    private String email;

    @Column(nullable = false)
    private String name;  //사용자 이름

    @Column
    private Date birthDate; // 사용자 생일

}
