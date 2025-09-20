//package com.mysite.sbb;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.hamcrest.Matchers;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.test.web.servlet.MvcResult;
//
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//public class JwtAuthTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private ObjectMapper objectMapper;
////
//    static class LoginRequest {
//        public String username;
//        public String password;
//
//        public LoginRequest(String username, String password) {
//            this.username = username;
//            this.password = password;
//        }
//    }
//
//    @Test
//    public void login_shouldReturnJwtToken() throws Exception {
//        LoginRequest loginRequest = new LoginRequest("testuser", "testpassword");
//
//        String json = objectMapper.writeValueAsString(loginRequest);
//
//        mockMvc.perform(post("/api/login")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(json))
//                .andExpect(status().isOk())
//                .andExpect(header().exists("Authorization"))
//                .andExpect(header().string("Authorization", Matchers.startsWith("Bearer ")));
//    }
//
//    @Test
//    public void accessProtectedApi_withoutToken_shouldReturnUnauthorized() throws Exception {
//        mockMvc.perform(get("/api/protected-resource"))
//                .andExpect(status().isUnauthorized());
//    }
//
//    @Test
//    public void accessProtectedApi_withValidToken_shouldSucceed() throws Exception {
//        LoginRequest loginRequest = new LoginRequest("testuser", "testpassword");
//        String json = objectMapper.writeValueAsString(loginRequest);
//
//        MvcResult result = mockMvc.perform(post("/api/login")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(json))
//                .andExpect(status().isOk())
//                .andReturn();
//
//        String authorizationHeader = result.getResponse().getHeader("Authorization");
//
//        mockMvc.perform(get("/api/protected-resource")
//                        .header("Authorization", authorizationHeader))
//                .andExpect(status().isOk());
//    }
//}