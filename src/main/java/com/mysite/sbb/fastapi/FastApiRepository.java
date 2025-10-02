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

    // 추가 user랑 url을 비교해서 있으면
    boolean existsByUserAndUrl(SiteUser user, String url);

    ///  추가 로직
    /// countByUser → 해당 사용자 뉴스 개수 확인
    ///
    /// findByUserOrderByCreatedAtAsc → 오래된 뉴스 조회
    ///
    /// deleteByIdIn → ID 리스트로 삭제
    ///
    long countByUser(SiteUser user);

    List<FastApiEntity> findByUserOrderByCreatedAtAsc(SiteUser user, Pageable pageable);
    Page<FastApiEntity> findByCompanyOrderByCreatedAtDesc(String companyName, Pageable pageable);

    void deleteByIdIn(List<Long> ids);


    FastApiEntity findFirstByUrl(String url);
}