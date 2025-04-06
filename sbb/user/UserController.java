package com.mysite.sbb.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> postUser(@RequestBody SiteUser user) {
        userService.joinUser(user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("signup/IdCheck/{id}")
    public ResponseEntity<?> checkIdDuplicate(@PathVariable("id") String id){
        if(userService.checkIdDuplicate(id)){
            return ResponseEntity.status(HttpStatus.OK).body(false);
        }
        return ResponseEntity.status(HttpStatus.OK).body(true);
    }


}