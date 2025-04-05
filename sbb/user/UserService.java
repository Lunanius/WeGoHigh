package com.mysite.sbb.user;


import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;

@Service
@RequiredArgsConstructor
public class UserService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void joinUser(SiteUser user) {
        String rawPassword = user.getPassword();
        String encPassword = passwordEncoder.encode(rawPassword);
        System.out.println("비밀번호 인코딩:" + encPassword);
        user.setPassword(encPassword);
        userRepository.save(user);
    }

    public SiteUser getUserInfo(String name, Date birthDate) {
        return userRepository.findByNameAndBirthDate(name,birthDate);
    }

    public boolean checkIdDuplicate(String id) {
        return userRepository.existsById(id);
    }

}