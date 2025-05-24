package com.mysite.sbb.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<SiteUser, Long> {

    SiteUser findByNameAndBirthDateAndEmail(String name, Date birthDate, String email);

    SiteUser findByNameAndBirthDateAndUsername(String name, Date birthDate, String username);

    boolean existsByUsername(String id);
    boolean existsByEmail(String email);



    Optional<SiteUser> findByUsername(String username);

    SiteUser findByNameAndBirthDate(String name, java.sql.Date birthDate);
}
