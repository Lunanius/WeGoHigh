package com.mysite.sbb.Jdbc;

import com.mysite.sbb.user.Role.Role;
import com.mysite.sbb.user.Role.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class RoleJdbcCommandLineRunner implements CommandLineRunner {

    private final RoleRepository roleRepository;


    @Override
    public void run(String... args) throws Exception {
        try{
            roleRepository.save(new Role("ROLE_USER"));
            System.out.println("응기잇");
        } catch (DataIntegrityViolationException e){
            System.err.println("이미 Role 엔티티에 값이 존재합니다.");
        }

    }
}
