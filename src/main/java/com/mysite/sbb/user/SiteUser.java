package com.mysite.sbb.user;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@Entity
public class SiteUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long user_id;

    @Column(unique = true)
    private String username;
    private String password;

    @Column(nullable = false)
    private String name;

    @Column
    private Date birthDate;

}
