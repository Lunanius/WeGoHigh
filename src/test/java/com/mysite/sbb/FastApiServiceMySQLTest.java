//package com.mysite.sbb;
//
////import com.fasterxml.jackson.databind.ObjectMapper;
////import org.hamcrest.Matchers;
////import org.junit.jupiter.api.Test;
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.boot.test.context.SpringBootTest;
////import org.springframework.http.MediaType;
////import org.springframework.test.web.servlet.MockMvc;
////import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
////import org.springframework.test.web.servlet.MvcResult;
////
////import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
////import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
////import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
////
////@SpringBootTest
////@AutoConfigureMockMvc
////public class JwtAuthTest {
////
////    @Autowired
////    private MockMvc mockMvc;
////
////    @Autowired
////    private ObjectMapper objectMapper;
//////
////    static class LoginRequest {
////        public String username;
////        public String password;
////
////        public LoginRequest(String username, String password) {
////            this.username = username;
////            this.password = password;
////        }
////    }
////
////    @Test
////    public void login_shouldReturnJwtToken() throws Exception {
////        LoginRequest loginRequest = new LoginRequest("testuser", "testpassword");
////
////        String json = objectMapper.writeValueAsString(loginRequest);
////
////        mockMvc.perform(post("/api/login")
////                        .contentType(MediaType.APPLICATION_JSON)
////                        .content(json))
////                .andExpect(status().isOk())
////                .andExpect(header().exists("Authorization"))
////                .andExpect(header().string("Authorization", Matchers.startsWith("Bearer ")));
////    }
////
////    @Test
////    public void accessProtectedApi_withoutToken_shouldReturnUnauthorized() throws Exception {
////        mockMvc.perform(get("/api/protected-resource"))
////                .andExpect(status().isUnauthorized());
////    }
////
////    @Test
////    public void accessProtectedApi_withValidToken_shouldSucceed() throws Exception {
////        LoginRequest loginRequest = new LoginRequest("testuser", "testpassword");
////        String json = objectMapper.writeValueAsString(loginRequest);
////
////        MvcResult result = mockMvc.perform(post("/api/login")
////                        .contentType(MediaType.APPLICATION_JSON)
////                        .content(json))
////                .andExpect(status().isOk())
////                .andReturn();
////
////        String authorizationHeader = result.getResponse().getHeader("Authorization");
////
////        mockMvc.perform(get("/api/protected-resource")
////                        .header("Authorization", authorizationHeader))
////                .andExpect(status().isOk());
////    }
////}
//
//
//import com.mysite.sbb.fastapi.FastApiEntity;
//import com.mysite.sbb.fastapi.FastApiRepository;
//import com.mysite.sbb.fastapi.FastApiService;
//import com.mysite.sbb.user.SiteUser;
//import com.mysite.sbb.user.UserRepository;
//import org.junit.jupiter.api.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.domain.PageRequest;
//
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//@SpringBootTest
//@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//public class FastApiServiceMySQLTest {
//
//    @Autowired
//    private FastApiService fastApiService;
//
//    @Autowired
//    private UserRepository siteUserRepository;
//
//    @Autowired
//    private FastApiRepository fastApiRepository;
//
//    private static final int MAX_RECORD = 30;
//
//    @BeforeEach
//    public void cleanUp() {
//        fastApiRepository.deleteAll(); // 테스트 전에 DB 초기화
//    }
//
//    @Test
//    @Order(1)
//    public void testSaveNewsAndLimit() {
//        // 사용자 생성
//        SiteUser user = siteUserRepository.findByUsername("qwer1234");
//        if (user == null) {
//            user = new SiteUser();
//            user.setUsername("qwer1234");
//            siteUserRepository.save(user);
//        }
//
//        // 35개의 뉴스 저장
//        for (int i = 1; i <= 35; i++) {
//            FastApiEntity entity = FastApiEntity.builder()
//                    .title("뉴스 " + i)
//                    .content("내용 " + i)
//                    .url("http://example.com/news" + i)
//                    .thumbnailUrl("http://example.com/thumb" + i + ".jpg")
//                    .newsTime("2025-09-23")
//                    .user(user)
//                    .prediction("UP")
//                    .summary("요약 " + i)
//                    .company("회사명")
//                    .build();
//
//            fastApiService.saveNews(entity); // 서비스 메서드 호출 → 30개 제한 로직 포함
//        }
//
//        // 저장 후 DB 확인
//        long count = fastApiRepository.countByUser(user);
//        assertEquals(MAX_RECORD, count, "30개 초과 뉴스는 삭제되어야 함");
//
//        // 가장 오래된 뉴스 확인
//        List<FastApiEntity> allNews = fastApiRepository.findByUserOrderByCreatedAtAsc(user, PageRequest.of(0, MAX_RECORD));
//        assertEquals("뉴스 6", allNews.get(0).getTitle(), "가장 오래된 뉴스는 6번째 뉴스여야 함");
//
//        // 가장 최신 뉴스 확인
//        FastApiEntity latest = allNews.get(allNews.size() - 1);
//        assertEquals("뉴스 35", latest.getTitle(), "가장 최신 뉴스는 35번째 뉴스여야 함");
//    }
//}
//
