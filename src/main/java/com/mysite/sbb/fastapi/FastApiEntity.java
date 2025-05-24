package com.mysite.sbb.fastapi;

import com.mysite.sbb.user.SiteUser;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "news_articles",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"username", "url"})})
@Getter
@Setter
public class FastApiEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;


    @Column(columnDefinition = "TEXT")
    private String content;

    private String url;

    private String thumbnailUrl;

    private String time;

    @ManyToOne
    @JoinColumn(name = "username", referencedColumnName = "username")
    private SiteUser user;

    @Column(name = "created_at", updatable = false, nullable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    private String company;

}
