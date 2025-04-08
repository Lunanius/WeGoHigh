package com.mysite.sbb.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<SiteUser, Long> {

    SiteUser findByNameAndBirthDate(String name, Date birthDate);

    SiteUser findByNameAndBirthDateAndUsername(String name, Date birthDate, String username);

    boolean existsByUsername(String id);


    Optional<SiteUser> findByUsername(String username);
}
