package com.mysite.sbb.fastapi;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FastApiRepository extends JpaRepository<FastApiEntity, Long> {
}
