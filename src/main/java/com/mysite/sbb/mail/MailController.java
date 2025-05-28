package com.mysite.sbb.mail;

import com.mysite.sbb.Dto.MailDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class MailController {
    private final MailService mailService;
    private int number; // 이메일 인증 숫자를 저장하는 변수

    public MailController(MailService mailService) {
        this.mailService = mailService;
    }

    @PostMapping("/mailSend")
    public ResponseEntity<String> mailSend(@RequestBody MailDto dto) {
        HashMap<String, Object> map = new HashMap<>();

        try {
            number = mailService.sendMail(dto.mail);
            String num = String.valueOf(number);


        } catch (IllegalArgumentException e){
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(e.getMessage()); // "이미 등록된 이메일입니다."
        }
        catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("오류가 발생하였습니다.");
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("인증번호가 전송되었습니다.");
    }

    // 인증번호 일치여부 확인
    @GetMapping("/mailCheck")
    public ResponseEntity<?> mailCheck(@RequestParam("authNum") String userNumber) {
        boolean isMatch = userNumber.equals(String.valueOf(number));

        if (isMatch) {
            return ResponseEntity.status(HttpStatus.OK).body("인증이 완료되었습니다.");
        } else {
            return ResponseEntity.status(400).body("인증 실패: 번호가 일치하지 않습니다.");
        }
    }

}
