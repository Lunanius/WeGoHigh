package com.mysite.sbb.config;

import org.apache.tomcat.util.http.Rfc6265CookieProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.web.embedded.tomcat.TomcatContextCustomizer;

public class TomcatContext {
    @Configuration
    public static class CookieConfig {

        @Bean
        public TomcatContextCustomizer sameSiteCookieConfig() {
            return context -> {
                Rfc6265CookieProcessor cookieProcessor = new Rfc6265CookieProcessor();
                cookieProcessor.setSameSiteCookies("Lax"); // ← 여기서 SameSite 설정!
                context.setCookieProcessor(cookieProcessor);
            };
        }
    }
}
