package com.mysite.sbb.user;

import com.mysite.sbb.util.ConversionUtil;
import com.mysite.sbb.util.PasswordRandom;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> postUser(@RequestBody SiteUser user) {
        userService.joinUser(user);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, Object> map, HttpSession session) {
        // 1. 사용자 정보 조회
        System.out.println(map);
        String username = map.get("username").toString();
        String password = map.get("password").toString();

        System.out.println(username);
        System.out.println(password);
        SiteUser user = userService.findByUsername(username);


        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("존재하지 않는 사용자");
        }

        // 2. 비밀번호 비교
        if (passwordEncoder.matches(password, user.getPassword())) {
            // 로그인 성공
            session.setAttribute("loginUser", user);
            return ResponseEntity.ok("로그인 성공");
        } else {
            // 비밀번호 틀림
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("비밀번호가 틀렸습니다");
        }
   }

   @PostMapping("/IdFind")
   public ResponseEntity<?> IdFind(@RequestBody Map<String, Object> map) throws ParseException {
        String name = map.get("name").toString();
       String birthDateStr = map.get("birthDate").toString();


       // 문자열 -> java.sql.Date로 파싱
       ConversionUtil conUtil = new ConversionUtil();
       Date birthDate = conUtil.stringToDate(birthDateStr);

        SiteUser user = userService.findByNameAndBirthDate(name,birthDate);

       if (user == null) {
           return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("존재하지 않는 사용자");
       } else{
           String userId = user.getUsername();
           return ResponseEntity.ok(userId);
       }

   }

   @PostMapping("/pwFind")
   public ResponseEntity<?> pwFind(@RequestBody Map<String, Object> map) throws ParseException {
        String name = map.get("name").toString();
       String birthDateStr = map.get("birthDate").toString();
        String username = map.get("username").toString();


       ConversionUtil conUtil = new ConversionUtil();
       Date birthDate = conUtil.stringToDate(birthDateStr);

        SiteUser user = userService.findByNameAndBirthDateAndUsername(name,birthDate,username);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("존재하지 않는 사용자");
        } else {
            PasswordRandom passwordRandom = new PasswordRandom();
            String tempPassword = passwordRandom.generateRandomPassword(10);

            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String encodedPassword = passwordEncoder.encode(tempPassword);

            user.setPassword(encodedPassword);
            userRepository.save(user);

            return ResponseEntity.ok(tempPassword);
        }
   }

    @GetMapping("signup/IdCheck/{id}")
    public ResponseEntity<?> checkIdDuplicate(@PathVariable("id") String id){
        if(userService.checkIdDuplicate(id)){
            return ResponseEntity.status(HttpStatus.OK).body(false);
        }
        return ResponseEntity.status(HttpStatus.OK).body(true);
    }





}