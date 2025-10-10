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

    void deleteByIdIn(List<Long> ids);

    FastApiEntity findFirstByUrl(String url);

    Optional<FastApiEntity> findTopByCompanyOrderByCreatedAt(String companyName);
    @Query("SELECT f FROM FastApiEntity f " +
            "WHERE f.company = :company " +
            // f2가 f보다 더 최신이거나 (createdAt >)
            // 시간이 같더라도 f2의 ID가 더 큰 (ID >) 레코드가 존재하지 않는 경우만 선택
            "AND NOT EXISTS (" +
            "   SELECT f2 FROM FastApiEntity f2 " +
            "   WHERE f2.company = f.company " +
            "   AND f2.url = f.url " +
            "   AND (" +
            "       f2.createdAt > f.createdAt OR " +
            "       (f2.createdAt = f.createdAt AND f2.id > f.id)" +
            "   )" +
            ") " +
            "ORDER BY f.createdAt DESC")
    Page<FastApiEntity> findLatestUniqueUrlByCompany(@Param("company") String company, Pageable pageable);

    List<FastApiEntity> findByCompanyContainingIgnoreCase(String q);


}