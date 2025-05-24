package com.mysite.sbb.user;

import com.mysite.sbb.fastapi.FastApiEntity;
import com.mysite.sbb.fastapi.FastApiService;
import com.mysite.sbb.util.ConversionUtil;
import com.mysite.sbb.util.PasswordRandom;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import jakarta.servlet.http.Cookie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final FastApiService fastApiService;

    @PostMapping("/signup")
    public ResponseEntity<?> postUser(@RequestBody SiteUser user) {
        try {
            userService.joinUser(user);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage()); // "이미 등록된 이메일입니다."
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, Object> map, HttpSession session) {
        // 1. 사용자 정보 조회

        String username = map.get("username").toString();
        String password = map.get("password").toString();


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
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate(); // 세션 무효화
        return ResponseEntity.ok("로그아웃 성공");
    }
    @GetMapping("/session-user")
    public ResponseEntity<?> getSessionUser(HttpSession session) {
        SiteUser user = (SiteUser) session.getAttribute("loginUser");

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 안 되어 있음");
        }

        return ResponseEntity.ok(Map.of(
                "username", user.getUsername()
        ));
    }

   @PostMapping("/IdFind")
   public ResponseEntity<?> IdFind(@RequestBody Map<String, Object> map) throws ParseException {
        String name = map.get("name").toString();
       String birthDateStr = map.get("birthDate").toString();
       String email = map.get("email").toString();


       // 문자열 -> java.sql.Date로 파싱
       ConversionUtil conUtil = new ConversionUtil();
       Date birthDate = conUtil.stringToDate(birthDateStr);

        SiteUser user = userService.findByNameAndBirthDateAndEmail(name,birthDate,email);

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
        if(userService.checkUsernameDuplicate(id)){
            return ResponseEntity.status(HttpStatus.OK).body(false);
        }
        return ResponseEntity.status(HttpStatus.OK).body(true);
    }
    @GetMapping("userData/{username}")
    public ResponseEntity<?> getUserData(@PathVariable("username") String username){

        SiteUser user = userService.findByUsername(username);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/newPw")
    public ResponseEntity<?> setNewPassword(@RequestBody Map<String, Object> map, HttpSession session) {
        // 1. 사용자 정보 조회
        String username = map.get("username").toString();
        String password = map.get("password").toString();


        SiteUser user = userService.findByUsername(username);


        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("존재하지 않는 사용자");
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(password);

        user.setPassword(encodedPassword);
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/posts")
    public ResponseEntity<Page<FastApiEntity>> getPosts(@RequestParam("username") String username,
                                                        @RequestParam(name = "page",defaultValue = "0") int page,
                                                        @RequestParam(name = "size", defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<FastApiEntity> posts = fastApiService.getUserById(username, pageable);
        return ResponseEntity.ok(posts);
    }


}