package com.asia.ecommerce.security;

import com.asia.ecommerce.model.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jdk.jfr.StackTrace;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationResponse {
    private String token;
    private long id;
    private String firstName;
    private String lastName;
    private String emailId;
    private Role role;
    private String type = "Bearer";
    private String phone;
    private String city;
    private String street;

    public AuthenticationResponse(String token,
                                  long id,
                                  String firstName,
                                  String lastName,
                                  String emailId,
                                  Role role,
                                  String phone,
                                  String city,
                                  String street
                                  ) {
        this.token = token;
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailId = emailId;
        this.role = role;
        this.phone = phone;
        this.city = city;
        this.street = street;
    }
}
