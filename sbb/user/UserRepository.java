package com.mysite.sbb.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<SiteUser, Long> {

    SiteUser findByNameAndBirthDate(String name, Date birthDate);

    boolean existsById(String id);
}
