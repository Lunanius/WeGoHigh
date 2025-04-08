//package com.mysite.sbb.user;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import lombok.RequiredArgsConstructor;
//
//@RequiredArgsConstructor
//@Service
//public class UserSecurityService implements UserDetailsService {
//
//    private final UserRepository userRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
//        SiteUser principal = userRepository.findById(id)
//                .orElseThrow(()->{
//                    return new UsernameNotFoundException("해당 사용자를 찾을 수 없습니다. : " + id);
//                });
//        return new UserDetail(principal) {
//        };  //시큐리티의 세션이 유저 정보가 저장이 됨.
//    }
//}