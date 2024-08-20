package com.asia.ecommerce.model;
// object of user
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private long id;
    private String firstName;
    private String lastName;
    private String emailId;
    private String phone;
    private String city;
    private String street;
}
