package com.asia.ecommerce.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc

public class AdditionalResourceWebConfiguration implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                .addResourceLocations(System.getProperty("user.dir") + "src\\main\\images\\");
    }
}
