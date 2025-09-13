package com.mysite.sbb.fastapi;

import com.mysite.sbb.user.SiteUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface FastApiRepository extends JpaRepository<FastApiEntity, Long> {

    // 예: ID로 User 하나 조회
    Page<FastApiEntity> findByUser_Username(String username, Pageable pageable);;

    @Query("SELECT f.company, COUNT(f) " +
            "FROM FastApiEntity f " +
            "WHERE f.createdAt >= :startDate AND f.createdAt < :endDate " +
            "GROUP BY f.company " +
            "ORDER BY COUNT(f) DESC")
    List<Object[]> getDailyCompanyRanking(@Param("startDate") LocalDateTime startDate,
                                          @Param("endDate") LocalDateTime endDate);

    @Query("SELECT f.company, COUNT(f) " +
            "FROM FastApiEntity f " +
            "WHERE f.createdAt >= :startDate " +
            "GROUP BY f.company " +
            "ORDER BY COUNT(f) DESC")
    List<Object[]> getWeeklyCompanyRanking(@Param("startDate") LocalDateTime startDate);

    @Query("SELECT f.company, COUNT(f) " +
            "FROM FastApiEntity f " +
            "WHERE f.createdAt >= :startDate " +
            "GROUP BY f.company " +
            "ORDER BY COUNT(f) DESC")
    List<Object[]> getMonthlyCompanyRanking(@Param("startDate") LocalDateTime startDate);
}