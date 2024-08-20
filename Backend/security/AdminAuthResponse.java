package com.asia.ecommerce.security;

import com.asia.ecommerce.model.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminAuthResponse {
    private String token;
    private long id;
    private String name;
    private Role role;
    private String type = "Bearer";

    public AdminAuthResponse(String token,
                             long id, String name,
                             Role role) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.role = role;
    }
}
