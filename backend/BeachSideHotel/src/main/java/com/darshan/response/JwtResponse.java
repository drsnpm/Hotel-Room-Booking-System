package com.darshan.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class JwtResponse {
    private Long id;
    private String email;
    private String token;
    private String type = "Bearer";
    private List<String> roles;
    private String phNo;

    public JwtResponse(Long id, String email, String token, List<String> roles, String phNo) {
        this.id = id;
        this.email = email;
        this.token = token;
        this.roles = roles;
        this.phNo = phNo;
    }
}
