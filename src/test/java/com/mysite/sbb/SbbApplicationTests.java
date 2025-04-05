//package com.mysite.sbb;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Optional;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//
//@SpringBootTest
//class SbbApplicationTests {
//
//    @Autowired
//    private QuestionRepository questionRepository;
//
//    @Test
//    void testJpa() {
////        List<Question> all = this.questionRepository.findAll();
////        assertEquals(2, all.size());
////
////        Question q = all.get(0);
////        assertEquals("sbb가 무엇인가요?",q.getSubject());
////        Optional<Question> question = questionRepository.findById(1);
////        if(question.isPresent()) {
////            Question q = question.get();
////            assertEquals("sbb가 무엇인가요?",q.getSubject());
////        }
////        Question q = this.questionRepository.findBySubject("sbb가 무엇인가요?");
////        assertEquals(1, q.getId());
//
//
//    }
//}