package com.mysite.sbb.fastapi;

import com.mysite.sbb.user.SiteUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FastApiRepository extends JpaRepository<FastApiEntity, Long> {

    // 예: ID로 User 하나 조회
    List<FastApiEntity> findByUser_Username(String username);;

}