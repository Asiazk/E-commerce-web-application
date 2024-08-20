package com.asia.ecommerce.security;

import com.asia.ecommerce.entity.AdminEntity;
import com.asia.ecommerce.entity.UserEntity;
import com.asia.ecommerce.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    public boolean validateToken(String token, UserDetails user) {
        String userName = extractUserName(token);
        return (userName.equals(user.getUsername())) && !isTokenExpired(token);
    }

    public boolean validateAdminToken(String token, UserDetails admin) {
        String name = extractUserName(token);
        return (name.equals(admin.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSigninKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String generateToken(UserEntity user) {

        Date currentDate = new Date(System.currentTimeMillis());
        Date expireDate = new Date(currentDate.getTime() + SecurityConstants.JWT_EXPIRATION);

        String token = Jwts.builder()
                .subject(user.getEmailId())
                .issuedAt(currentDate)
                .expiration(expireDate)
                .signWith(getSigninKey())
                .compact();
        return token;
    }

    private SecretKey getSigninKey() {
        byte[] keyBytes = Decoders.BASE64URL.decode(SecurityConstants.JWT_SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateAdminToken(AdminEntity admin) {
        Date currentDate = new Date(System.currentTimeMillis());
        Date expireDate = new Date(currentDate.getTime() + SecurityConstants.JWT_EXPIRATION);

        String token = Jwts.builder()
                .subject(admin.getName())
                .issuedAt(currentDate)
                .expiration(expireDate)
                .signWith(getSigninKey())
                .compact();
        return token;
    }
}
